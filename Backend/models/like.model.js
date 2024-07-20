import mongoose, { Schema } from "mongoose"; 



const LikeSchema = new Schema(
    {
        UserId : {
            type : Schema.Types.ObjectId, 
            ref : 'User'
        }, 
        PostId : {
            type : Schema.Types.ObjectId, 
            ref : 'Post'
        }
    },{timestamps : true} 
); 



export const Like = mongoose.model('Like',LikeSchema); 