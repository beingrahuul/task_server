import { User } from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import ErrorHandler from "./error.js"
import { catchAsyncErrors } from "./catchAsyncError.js"

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    //get token from req header

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY);
  
    req.user = await User.findById(decoded.id);
  
    next();
  });

