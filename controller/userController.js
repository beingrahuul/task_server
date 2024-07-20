import {catchAsyncErrors} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/userSchema.js";
import cloudinary from 'cloudinary'
import  {sendToken} from "../utils/jwttoken.js"
import {isAuthenticated} from "../middlewares/auth.js"
import bcrypt from "bcrypt"

// REGISTRATION FORM // 

// export const register =   catchAsyncErrors(  async (req , res , next)=>{

// if(!req.files || Object.keys(req.files).length === 0 ){
//     return next (new ErrorHandler(" USER AVATAR REQUIRED" , 400));
// }

// const {avatar} = req.files ; 
// const allowedFormats = ["image/png" , "image/jpeg" , "image/webp" , "image/avif"] ;

// if(!allowedFormats.includes(avatar.mimetype)){
//   return next (
//     new ErrorHandler("Please provide avatar in png , jpeg , webp , avif format !! " , 400))
// }

// const {name , email, phone , password} = req.body ;
// if(!name || !email || !phone || !password){
//     return next(new ErrorHandler("Please fill full form" , 400))
// }

// let user = await User.findOne({email});

// if(user){
//     return next( new ErrorHandler("User Already exits " , 400));
// }

// const cloudinary_respone = await cloudinary.uploader.upload(avatar.tempFilePath);

// if(!cloudinary_respone || cloudinary.error){
//  console.error(
// "Cloudinary Error" , 
// cloudinary_respone.error || "UNKNOWN CLOUDINARY ERROR !!"
// )
// }

// user  = await User.create({
// name , email , password , phone ,
// avatar : {
// public_id : cloudinary_respone.public_id ,
// url : cloudinary_respone.secure_url ,
// }
// })

// res.status(200).json({
//     success : true ,
//     message : "User Registered !" ,
// })
// })


// // LOGIN //

// export const login = catchAsyncErrors(async (req , res, next) =>{

// const {email , password} = req.body ;
// if(!email || !password){
//     return next( new ErrorHandler(" XPLEASE ENTER EMAIL AND PASSWORD afjnelfenl fkenlkew" ,  400 ));
// }

// const user = await User.findOne({email});

// // const user = await User.findOne({email}).select('+password');

// if(!user){
//     return next( new ErrorHandler("INVALID EMAIL OR PASSWORD" , 400));
// }

// const IsPasswordMatched = await user.comparePassword( user.password);
// if(!IsPasswordMatched){
//     return next(new ErrorHandler("INVALID EMAIL OR PASSWORD" , 400))
// ;}

// res.status(200).json({
//     success : true ,
// message : "USER LOGGEDIN ",
// user , 

// })
// })




export const register = catchAsyncErrors(async (req, res, next) => {
    
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return next(new ErrorHandler("Please fill full form!", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists!", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload("https://i.imgur.com/G0xBA5r.jpeg");
    if (!cloudinaryResponse || cloudinary.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown cloudinary error!"
      );
    }
    user = await User.create({
      name,
      email,
      phone,
      password,
      avatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    sendToken("User Registered!", user, res, 200);

  });
  
  export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email  or password!", 400));
    }
    // const isPasswordMatched = await user.comparePassword(password);
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email  or password!", 400));
    }
    sendToken("User Logged In!", user, res, 200);
 
});

  

  export const logout = catchAsyncErrors((req, res, next) => {
     res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User Logged Out!",
      });
  });




  export const myProfile = catchAsyncErrors((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });
































