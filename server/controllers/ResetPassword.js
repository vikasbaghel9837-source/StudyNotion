const User = require("../models/User");
const nodemailer = require("nodemailer");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


exports.resetPasswordToken = async(req, res)=>{
    try{
        // Fetch data from req body
        const {email} = req.body;

        // Validate email
        if(!email){
            return res.status(400).json({
            success:false,
            message:"Your Email is not  registered with us"
            })
        };

        // Generate token
        const token = crypto.randomUUID();

        // update user by updating token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email} ,
                                                                     {
                                                                        token:token,
                                                                        resetPasswordExpires:Date.now() + 5*60*1000
                                                                     },
                                                                    {new:true});
        // create url
        const url = `http://localhost:3000/update-password/${token}`;

        // send mail
        await mailSender(email,"Reset Password link" , `Reset Password link ${url}`);

        // return response
        return res.status(200).json({
            success:true,
            message:"Email sent Successfully to reset Password"
        })

    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"Error in resetting password , Please try again"
        })
    }
}

exports.resetPassword = async(req , res)=>{
    try{
        // fetch data from req body
        const {password , confirmPassword , token} = req.body;

        // validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password does not match"
            })
        };

        // Get user details using token
        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Token is invalid"
            })
        };

        // check token time
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token time expires"
            })
        };

        // Hash pwd
        const hashedPass = await bcrypt.hash(password , 10);

        // Find and update password
        await User.findOneAndDelete({token:token},{password:hashedPass},{new:true});
        // return response
        return res.status(200).json({
            success:true,
            message:"Password reset successFully"
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in Password reset ,please Try Again"
        })
    }
}