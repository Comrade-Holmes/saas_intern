
const router=require("express").Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

router.post("/register",async(req,res)=>{

try{

const {name,email,password}=req.body;

const existingUser=await User.findOne({email});

if(existingUser){
return res.status(400).json({
message:"User Already Exists"
});
}

const hashedPassword=await bcrypt.hash(password,10);

const user=new User({
name,
email,
password:hashedPassword
});

await user.save();

res.json({
message:"Registration Successful"
});

}catch(err){

res.status(500).json({
message:err.message
});

}

});

router.post("/login",async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){
return res.status(400).json({
message:"Invalid Credentials"
});
}

const validPassword=await bcrypt.compare(
password,
user.password
);

if(!validPassword){
return res.status(400).json({
message:"Invalid Credentials"
});
}

const token=jwt.sign(
{id:user._id},
process.env.JWT_SECRET
);

res.json({
token
});

}catch(err){

res.status(500).json({
message:err.message
});

}

});

module.exports=router;
