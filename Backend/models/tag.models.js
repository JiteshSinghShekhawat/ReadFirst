import mongoose, { Schema } from "mongoose"; 


const TagSchema = new Schema(
    {
        Name : {
            type : String, 
            required : true,
            unique: true
        }
    },{timeStamps : true}
); 


export const Tag = mongoose.model('Tag',TagSchema); 