const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = async(req , res , next)=>{
    try{
        // extract token
        let token = null;

        const authHeader = req.header("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        } else if (req.body.token) {
            token = req.body.token;
        }
        console.log("AUTH MIDDLEWARE: req.headers.authorization =", req.headers.authorization);
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
            console.log("AUTH OK - user:", req.user);
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
            message:"Something went wrong while verifying the token",
            error:err
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
        next();
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
        next();
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
        next();
    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"User Role cannot be verified , Please try again "
        })
    }
};