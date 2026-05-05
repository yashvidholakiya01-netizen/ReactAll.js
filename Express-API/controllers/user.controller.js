//user.controller
const userService = require("../services/user.service");
const { validationResult} = require("express-validator");
const userModel = require("../models/user.model");


module.exports.registerUser = async(req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    const {username,email,password, role} = req.body;

    //check user is already registed or not 
    let isExist = await userModel.findOne({email: email})
    
    if(isExist){
        return res.status(400).json({msg: "user is already register"})
    }
    const hashpassword = await userModel.hashPassword(password);

    const user = await userService.createUser({username,email,password: hashpassword, role});

    let token = await user.generateAuthToken();

    res.status(200).json({token,user});
};

module.exports.LoginUser = async(req,res) => {
  let error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(400).json({error: error.array()})
  }

    const {email,password} = req.body;

    let checkUser = await userModel.findOne({email:email}).select("+password");

    if(!checkUser){
        return res.status(401).json({msg:"email is invaild"})
    }

    const isMatch = await checkUser.comparepassword(password);

    if(!isMatch){
        return res.status(400).json({msg: "wrong password"})
    }
    
    const token = checkUser.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({token, checkUser});
};

module.exports.profile = (req, res) => {
    res.status(200).json({ user: req.user});
}

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({msg: "logout successfully"})
}

module.exports.updateUser = async (req,res) => {
    const userId = req.user.id;
    console.log(userId);

    const {username, email} = req.body;
  console.log(username,email)
    const updateUser = await userService.updateUser({ userId, username, email})

    res.status(200).json({ message: "user data updated successfully", updateUser})
}