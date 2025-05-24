const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    // phone:{
    //     type:Number,
    //     unique:true,
    //     required:true,
    // },
    // otp:String,
    // otpExpires:Date,
    // isVerified:{
    //     type:Boolean,
    //     default:false,
    // },
    name:{ type:String},
    email: { type: String, required: true, unique: true },
    password:{
        type:String,
        required:true,
    },
    passwordHash: String

},{timestamps:true, strict:"throw" })


module.exports = mongoose.model('User',userSchema)