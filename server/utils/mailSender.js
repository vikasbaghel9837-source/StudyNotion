const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email , title , body)=>{
    try{
        let transporter =  nodemailer.createTransport({ 
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from:`StudyNotion || Family - by Vikas`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });
        console.log(info);

        return info;
    }
    catch(err){
        console.log(`Error in Sending MAil ` , err);
        console.error(err);
    }
};

module.exports = mailSender;