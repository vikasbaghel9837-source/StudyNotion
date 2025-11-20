const SubSection = require("../models/SubSection");
const Section = require("../models/section");
const { uploadImageToCloudinary } = require("../utils/uploadImage");
require("dotenv").config();

// Create subSection
exports.createSubSection = async(req,res)=>{
    try{
        // Fetch data 
        const {title , timeDuration , desciption , sectionId} = req.body;

        // file/video
        const video = req.files.videoFile;
        
        if(!title || !sectionId || !timeDuration || !desciption || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        };
        
        // Upload file to cloudinary
        const uploadedDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

        // Create subSection
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadedDetails.secure_url
        });

        // Update section with entry of created subSection
        const updatedSection = await Section.findByIdAndUpdate(sectionId ,
            {
                $push:{
                    subSection:subSectionDetails
                }
            },
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Sub section created successfully"
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in creating Sub-Section , Please try again"
        })
    }
}

// Update SubSection
exports.updateSubSection = async(req,res)=>{
    try{
        // Fetch data
        const {subSectionId , title , description , timeDuration } = req.body;

        // file
        const video = req.files.videoFile;

        if(!subSectionId || !timeDuration || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        };
        const url = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
        // update details
        const updatedSubsection = await SubSection.findByIdAndUpdate(subSectionId,{
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:url
        },{new:true})

        
        return res.status(200).json({
            success:true,
            message:"subSection updated successfully",
            updatedSubsection
        })
        
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in updating subSection , Please try again"
        })
    }
};

// Delet subSection
exports.deleteSubSection = async(req,res)=>{
    try{

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in deleting subSection , Please try again"
        })
    }
}
