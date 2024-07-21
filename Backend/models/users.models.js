import mongoose, { Schema } from "mongoose" ; 


const UserSchema = new Schema(
    {
        userName : {
            type : String, 
            required : true, 
            trim : true,
            unique : true
        },
        email : {
            type : String, 
            required : true, 
            unique : true , 
            match : [/.+\@.+\..+/, "Please fill a valid email address"]
        },
        password : {
            type : String, 
            required : true
        },
        fullName : {
            type : String, 
            required : true,
            trim : true
        }, 
        bio : {
            type : String, 
            default : ""
        },
        otp : {
            type : Number, 
            default : Math.random()
        },
        otpExpires : {
            type : Number, 
            default : Date.now()
        }
    },{timestamps : true}
); 


export const User = mongoose.model('User',UserSchema); 