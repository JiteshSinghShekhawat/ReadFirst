import mongoose, { Schema } from "mongoose" ; 



const UserSchema = new Schema(
    {
        userName : {
            type : String, 
            required : true, 
            trime : true 
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
        }
    },{timestamps : true}
); 


export const User = mongoose.model('User',UserSchema); 