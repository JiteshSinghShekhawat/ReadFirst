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
            trim : true,
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
        },
        profilePicture: {
          data: {
            type: Buffer,
            default: null
          },
          contentType: {
            type: String,
            default: null
          }
        }
    },{timestamps : true}
); 


export const User = mongoose.model('User',UserSchema); 