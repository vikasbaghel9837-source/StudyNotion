const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = async(req , res , next)=>{
    try{
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("bearer ", "");

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is not present",
            })
        }

        // verify token
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);

            console.log(decode);
            req.user = decode;
        }
        catch(err){
            console.log(err);
            return res.status(400).json({
                success:false,
                message:"Token is Invalid"
            })
        }
        next();
    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"Something went wrong while verifying the token"
        })
    }
};

exports.isStudent = async(req , res , next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected route for Student Only"
            })
        }
    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"User Role cannot be verified , Please try again "
        })
    }
};

exports.isInstructor = async(req , res , next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected route for Instructor Only"
            })
        }
    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"User Role cannot be verified , Please try again "
        })
    }
};

exports.isAdmin = async(req , res , next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected route for Admin Only"
            })
        }
    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"User Role cannot be verified , Please try again "
        })
    }
};