const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email , "Verification Email from StudyNotion" , emailTemplate(otp));
        console.log("Email sent SuccessFully",mailResponse);

    }
    catch(err){
        console.log("Error Occured while Sending Email ",err);
        console.error(err);
        throw(err);
    }
}

// MiddleWare
OTPSchema.pre("save" , async function(next){
    // Only send an email when a new document is created
	if (this.isNew) {
		setTimeout(() => {
            sendVerificationEmail(this.email, this.otp);
        }, 0);

	}
    next();
})


module.exports = mongoose.model("OTP" , OTPSchema);