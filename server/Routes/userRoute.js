const express =require("express");
const {registerUser,loginuser,finduser,getUser} =require("../Controllers/userController");
const router=express.Router();

router.get("/register",registerUser);
router.post("/login",loginuser);
router.get("/find/:userId",finduser);
router.get("/getuser",getUser);
module.exports= router;
