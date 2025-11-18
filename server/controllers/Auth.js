const OTP = require('../models/Otp');
const User = require('../models/User');
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

// OTP
exports.SendOTP = async (req , res)=>{
    try{
        // Fetch email from req body
        const {email} = req.body;

        // Check if User already Present
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            res.status(401).json({
                success:false,
                message:"User Already Registered"
            })
        }

        // OTP generate
        const otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        // Check otp is unique or not
        const result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await OTP.findOne({otp:otp});
        }

        // create entry of otp
        const otpBody = await OTP.create({email,otp});
        console.log(otpBody);

        return res.status(200).json({
            success:true,
            message:"otp sent successfully",
            otp
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in sending OTP"
        })
    }
};

// SignUp
exports.SignUp = async(req , res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            contactNumber,
            additionalDetails
        } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(401).json({
                success:false,
                message:"All Entries are necessary"
            })
        }
        // Check password matches or not
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                messgae:"Password and confirmPassword do not match , Please Try Again"
            })
        }

        // Check user Already exist or not
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }

        // Find most recent otp and validate it
        const mostRecentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(!mostRecentOTP){
            return res.status(400).json({
                success:false,
                message:"Error in finding most recent otp"
            })
        }

        // Hash Password
        let hashedPass = await bcrypt.hash(password , 10);

        let approved = "";
        approved === "Instructor"?(approved = false):(approved = true);

        let profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            additionalDetails:null
        });
        let userDetails = await User.create({
            firstName,
            lastName,
            contactNumber,
            password:hashedPass,
            additionalDetails:profileDetails._id,
            accountType,
            approved:approved,
            email,
            Image:`https://api.dicebar.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

        });

        // Response return
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            userDetails
        });


    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"Error in user Registration"
        })
    }
};

// Login 
exports.Login = async(req,res)=>{
    try{
        // Fetch data from req body
        const {email , password} = req.body;

        // Validation
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details"
            })
        }

        // check user is registered or not
        const user = await User.findOne({email}).populate();

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered"
            })
        }

        // Check password is correct or not
        if(await bcrypt.compare(password, user.password)){
            // Generate jwt token 
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn:"2h"
            });

            user.token = token;
            user.password = undefined;

            // Create cookie and send response
            const options = {
                httpOnly:true,
                expires:new Date(Date.now() + 3*24*60*60*1000),
            }

            res.cookie("token" , token , options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged In successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is Incorrect"
            })
        }

    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"Error in LogIn , Please Try Again",
        })
    }
};

// Change Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};