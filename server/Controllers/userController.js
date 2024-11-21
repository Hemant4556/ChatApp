const userModel= require("../Models/userMODEL");
const bcrypt= require("bcrypt");
const validator= require("validator");
const jwt= require("jsonwebtoken");
const createToken = (_id)=>{
    const jwtkey = process.env.SECRET_KEY  ;
    return jwt.sign({_id},jwtkey,{expiresIn:"3d"});
};

const registerUser=async(req,res)=>{
        try{
            const {name,email,password}=req.body;
        let user = await userModel.findOne({email});

        if (user) return res.status(400).json("user Already Exist... ");

        if (!name || !email || !password) return res.status(400).json("All fields Are required") ;

        if(!validator.isEmail(email))
            return res.status(400).json("must be a Valid Email..");

        if(!validator.isStrongPassword(password))
            return res.status(400).json("password must be Strong..");

        user = new userModel({name,email,password});

        const salt=await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        const token = createToken(user._id);
        res.status(200).json({_id:user.id,name,email,token});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const loginuser =async(req,res)=>{
    const { email, password }= req.body;
    try{
        let user=await userModel.findOne({email});
        
        if(!user) return res.status(400).json("Invalid email...");
        const isValidPassword =await bcrypt.compare(password,user.password);
        if(!isValidPassword) return res.status(400).json("Invalid Password...");

        const token = createToken(user._id);
        res.status(200).json({_id:user.id,name:user.name,email,token});

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};
const finduser=async(req,res)=>{
    const userId= req.params.userId;
    try{
        user= await userModel.findById(userId);
        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
const getUser=async(req,res)=>{
    try{
        user= await userModel.find();
        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports= {registerUser, loginuser,finduser,getUser};
