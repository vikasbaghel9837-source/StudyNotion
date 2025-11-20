const Course = require("../models/Course");
const Section = require("../models/Section");


// Create a new section
exports.createSection = async(req , res)=>{
    try{
        // Fetch data
        const {sectionName , courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        };

        // create entry of section in db
        const newSection = await Section.create({sectionName});

        // save section entry in Course details
        const CourseDetails = await Course.findByIdAndUpdate({courseId} ,
                                                            {
                                                                $push:{
                                                                    courseContent:newSection._id
                                                                }
                                                            } , {new:true});
        
        return res.status(200).json({
            success:true,
            message:"Section created successfully"
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in creating Section , Please try again"
        })
    }
};

// Update section
exports.updateSection = async(req,res)=>{
    try{
        // fetch data
        const {sectionName , sectionID} = req.body;

        if(!sectionName || !sectionID){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const updatedDetails = await Section.findByIdAndUpdate(sectionID,
            {
                sectionName:sectionName
            },
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Section updated Successfully"
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in updating Section , Please try again"
        })
    }
};

// Deleting section
exports.deleteSection = async(req,res)=>{
    try{
        // Fetch data
        const {sectionId} = req.body;

        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }
        // SEction delete
        const deletedSection = await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in deleting Section , Please try again"
        })
    }
}
