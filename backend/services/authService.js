const User= require('../models/user');
const jwt= require('jsonwebtoken');
const twilio = require('twilio');
const user = require('../models/user');
const bcrypt = require('bcryptjs');


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

const sendOTP= async(phone)=>{
    const otp= generateOtp();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    let user= new User.findOne({phone});

    if(!user) {
        user = new User({ phone });
    }

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE,
        to: phone
      });
    
    return { message: 'OTP sent' };
}

const verifyOTP = async(phone,otp)=>{

    const user= new User.findOne(phone);
    if(!user){
        if (!user) throw new Error('User not found');
    }

    if(user.otp != otp){
        throw new Error("Invalid OTP");
    }

    if(user.otpExpires>Date.now()){
        throw new Error("OTP expired");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return { token };
}


const register = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error('User already exists');
      err.status = 400;
      throw err;
    }
  
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPwd });
    return { message: 'User registered successfully' };
  };

  const login = async ({ email, password }) => {

    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error('User not found');
      err.status = 400;
      throw err;
    }
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error('Incorrect password');
      err.status = 400;
      throw err;
    }
  
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return { token };
  };

module.exports = {
    sendOTP,
    verifyOTP,
    register,
    login
}