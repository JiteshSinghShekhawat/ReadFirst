import mongoose, { Schema } from "mongoose"; 



const CommentSchema = new Schema(
    {
        UserId : {
            type : Schema.Types.ObjectId, 
            ref : 'User'
        },
        PostId : {
            type : Schema.Types.ObjectId, 
            ref : 'Post'
        }, 
        content : String, 
    },{timestamps : true}
); 


export const Comment = mongoose.model('Comment',CommentSchema); 