const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
const Tag = require("../models/Tags");
const { uploadImageToCloudinary } = require("../utils/uploadImage");
const { categoryPageDetails } = require("./Category");

require("dotenv").config();

exports.createCourse = async(req , res)=>{ 
    try{
        // fetch data from req.body
        const {courseName , courseDescription , whatYouWillLearn ,price, tag , category , status , instructions} = req.body;
        
        // Get thumbnail
        const thumbnail = req.files.thumbnailImage;
        // Validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        if(!status || status === undefined){
            status = "Draft";
        }
        // Get instructor details
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId,{accountType : "Instructor"});
        console.log("Instructor Details :" , instructorDetails);

        // validation
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor not found"
            })
        };

        // validate tag
        const CategoryDetails = await Category.findById(category);
        console.log("Tag Details :" , tagDetails);

        if(!CategoryDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid Category"
            })
        };
        // uplaod image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);
        // Create new entry in course
        let newCourse = await Course.create({
            courseName,
            courseDecription,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag,
            instructor:instructorDetails._id,
            thumbnail:thumbnailImage.secure_url,
            category : CategoryDetails._id,
            status:status,
            instructions:instructions
        })

        // Add nwe course to user schema
        await User.findByIdAndUpdate({_id:instructorDetails._id},
                                    {$push : {
                                        courses:newCourse._id,
                                    }},
                                    {new:true}
                                )     
        // Add new course to the categories     
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{
                    course:newCourse._id,
                }
            },
            {new:true}
        )
        // return response
        return res.status(200).json({
            success:true,
            message:"Course created successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Error in creating Course, Please try again"
        })
    }
}

exports.getAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find({},
            {
                $select:"courseName price thumbnail instructor ratingandReviews studentsEnrolled"
            }
        )
        .populate("instructor")
        .exec();

        return res.status(200).json({
            success:true,
            message:"All courses fetched successfully",
            data:allCourses
        })
    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:"Error in fetching all the courses , Please try again"
        })
    }
}

exports.getCourseDetails = async(req,res)=>{
    try{
        const {courseId} = req.body;

        const courseDetails = await Course.find({_id:courseId})
                                          .populate(
                                            {
                                                path:"Instructor",
                                                populate:{
                                                    path:"additionalDetails"
                                                }
                                            }
                                          )
                                          .populate("category")
                                          .populate("ratingAndReviews")
                                          .populate(
                                            {
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSction"
                                                }
                                            }
                                          )
                                          .exec();
        
        //Validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with id ${courseId}`
            })
        }   

        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully"
        })
    }
    catch(err){
        console.log(err);

        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}