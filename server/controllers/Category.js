const Category = require("../models/Category");

// Create Tag Handler
exports.createCategory = async(req , res)=>{
    try{
        // Fetch data from req.body
        const{name , description} = req.body;
        // Validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        // Create entry in db
        const CategoryDetails = await Tag.create({
            name:name,
            description:description
        });

        console.log(CategoryDetails);

        // REturn response
        return res.status(200).json({
            success:true,
            message:"Category created Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Error in creation category, please try again "
        })
    }
};

// Get All tags 
exports.showAllCategories = async(req,res)=>{
    try{
        const allCategories = await Category.find({},{name:true,description:true});

        return res.status(200).json({
            success:true,
            data:allCategories
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

exports.categoryPageDetails = async(req,res)=>{
    try{
        const {categoryId} = req.body;

        // get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                                .populate("courses")
                                                .exec();
        // Validation
        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"data not found"
            })
        }
        // get Course for different categories
        const differentCategories = await Category.find(
            {_id:{$ne:categoryId}})
            .populate("courses")
            .exec();
        // Get top 10 selling courses
        
        // Return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories
            }
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}