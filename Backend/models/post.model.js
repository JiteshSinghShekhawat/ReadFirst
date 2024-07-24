import mongoose, { Schema } from "mongoose" ;
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';


const PostSchema = new Schema(
    {
        Author : {
            type : Schema.Types.ObjectId, 
            ref : 'User'
        }, 
        Title : {
            type : String, 
            required : true
        }, 
        Content : {
            type : String, 
            required : true
        },
        Tags : [
            {
                type : Schema.Types.ObjectId, 
                ref : 'Tag'
            }
        ],
        LikeCount : {
            type : Number, 
            default : 0 
        }
    },{timestamps : true}
); 

PostSchema.plugin(aggregatePaginate);


export const Post = mongoose.model('Post',PostSchema); 