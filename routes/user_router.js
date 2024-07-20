import express from "express";
import {isAuthenticated} from "../middlewares/auth.js"
import {
register ,
login,
logout ,
myProfile
} from "../controller/userController.js"

const  router = express.Router() ; 

router.post("/login" , login);
router.get("/logout" ,  isAuthenticated  , logout);
router.get("/me" , isAuthenticated  , myProfile);
router.post("/register" , register);
router.get("/" , (req , res)=>{
    res.send("Welcome to user router")
})


export default router ; 