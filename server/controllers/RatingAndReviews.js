const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const ratingAndReviews = require("../models/RatingAndReview");
const User = require("../models/User");

exports.ratingAndReview = async(req,res)=>{
    try{
        // Get user Id
        const userId = req.user.id;

        // Get data from req.body
        const {courseId , rating , review} = req.body;

        // check if user is enrolled or not
        const courseDetails = await Course.findById(courseId);

        if(!courseDetails.studentsEnrolled.includes(userId)){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course'
            })
        }

        // Check user already reviewed the course or not
        const alreadyReviewed = await ratingAndReviews.findOne(
                                                {
                                                    user:userId,
                                                    course:courseId
                                                }
                                            );
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"Course is already Reviewed by student"
            })
        }

        // Create rating and review
        const ratingReview = await ratingAndReviews.create({
            rating:rating,
            review:review,
            course:courseId,
            user:userId
        });
        console.log(ratingReview);

        // Update course with rating and review
        const updatedDetails = await Course.findByIdAndUpdate(courseId,
                                        {
                                            $push:{
                                                ratingAndReviews:ratingReview._id
                                            }
                                        }, 
                                        {new:true});
        console.log(updatedDetails);

        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully"
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in creating rating and review ,Please try again"
        })
    }
}

exports.averageRatingAndReview = async(req, res)=>{
    try{
        const {courseId} = req.body.courseId;

        // avg rating and review
        const result = await ratingAndReviews.aggregate(
            {
                $match:{
                    course:new mongoose.Schema.Types.ObjectId(courseId),
                }
            }
            ,{
                $group:{
                    _id:null,
                    averageRating : {$avg:rating}
                }
            }
        );

        console.log(result);

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        return res.status(400).json({
            success:false,
            message:"Average rating is 0"
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in find average rating and review , Please try again"
        })
    }
}
exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}