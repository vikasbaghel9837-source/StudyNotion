const mongoose = require("mongoose");
require("dotenv").config();


exports.connectDb = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>(console.log("DB connected Successfully")))
    .catch((err)=>{
        console.log(err);
        console.error(err); 
        process.exit(1);
    })
}