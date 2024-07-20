import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new  mongoose.Schema({

    name: {
        type: String,
        required: [true, "PLEASE PROVIDE YOUR NAME"],
        minLength: [3, "NAME MUST CONTAIN AT LEAST 3 CHARACTER "],
        maxLength: [30, "NAME CANNOT EXCEED 30 CHARACTER "],
    },

    email: {
        type: String,
        required: [true, "PLEASE PROVIDE YUOR EMAIL "],
        unique: [true, "USER ALREADY REGISTER "],
        validate: [validator.isEmail, "PLEASE PROVIDE A VALID EMAIL "]

    }
    ,
    phone: {
        type: String,
        required: [true, "PLEASE PROVIDE YUOR PHONE"],
    }


    ,

    password: {

        type: String,
        required: [true, "PLEASE PROVIDE YOUR PASSWORD"],
        minLength: [8, "NAME MUST CONTAIN AT LEAST 8 CHARACTER "],
        maxLength: [32, "NAME CANNOT EXCEED 32 CHARACTER "],
        select : false , 

    }

    ,
    avatar: {

        public_id: {
            type: String,
            required: true,

        },

        url: {
            type: String,
            required: true,


        },


    } ,
    
    createdAt: {
        type: Date,
        default: Date.now,
    },




})


userSchema.pre("save" , async function (){
if(!this.isModified("password") ){
next();
}

this.password = await bcrypt.hash(this.password , 10 );
})

userSchema.methods.comparePassword = async  (enterPassword)=>{
return await bcrypt.compare(enterPassword , this.password);
};

userSchema.methods.getJWTTOKEN = function () {

return jwt.sign({id : this._id} , process.env.JWT_SECERT_KEY , {
expiresIn : process.env.JWT_EXPIRES ,
});
};

 
export const User = mongoose.model("User" , userSchema);