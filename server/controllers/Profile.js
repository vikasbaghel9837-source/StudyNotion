const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req,res)=>{
    try{
        // Get data
        const {dateOfBirth = "" , about = "" , gender , contactNumber} = req.body;

        // Get user Id
        const id = req.user.id;

        // Validation
        if(!gender || !contactNumber || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        // Get profile details
        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNo = contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Error in Updating profile ,Please try Again"
        });
    }
}

// Delete account
exports.deleteAccount = async(req,res)=>{
    try{
        // gET id
        const id = req.user.id;

        const userDetails = await User.findById(id);
        // Validation
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        };

        // Get profile id and delete
        const profileId = userDetails.additionalDetails;

        await Profile.findByIdAndDelete(profileId);

        // Delete user
        await  User.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"Account Deleted SuccessFully"
        });

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in deleting account , Please try again"
        });
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
        const id = req.user.id;

        // Validation and get user Details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"Details of all users fetched successfully"
        });
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in Getting All user Details , Please try again"
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};