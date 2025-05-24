const authService = require('../services/authService');

const sendOtp = async(req,res)=>{
    try {
        const {phone} = req.body;

        const result = await authService.sendOTP(phone);
        res.json(result);
        
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

const verifyOTP= async(req,res)=>{
    try {
        const{phone, otp} = req.body;
    
        const result = await authService.verifyOTP(phone, otp);
        res.json(result);
        
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

const register = async(req,res)=>{

    try {
        const{name, email, password} = req.body;
        const result= await authService.register({name, email, password});
        res.json(result);
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
}

const login = async(req,res)=>{
    try {
        const{email, password} = req.body;
        const result= await authService.login({email, password});
        res.json(result);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const logout = async (req, res) => {
    // In a real app, you'd blacklist the JWT token or let it expire
    res.json({ message: 'Logged out' });
  };

module.exports={
    sendOtp,
    verifyOTP,
    register,
    login,
    logout
}