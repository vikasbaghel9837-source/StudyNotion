const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,

    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    }
    ,
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Admin" , "Student" , "Instructor"],
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    approved:{
        type:Boolean,
        default:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    resetPasswordExpires:{
        type:Date, 
    },
    token:{
        type:String
    },
    image:{
        type:String,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ]

},
{timestamps:true});

module.exports = mongoose.model("User" , userSchema);