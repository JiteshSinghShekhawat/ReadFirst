import mongoose, { Schema } from "mongoose"; 


const CommentSchema = new Schema(
    {
      UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      PostId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: null 
      },
      content: {
        type: String,
        required: true
      },
      parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null 
      },
      LikeCount: {
        type: Number,
        default: 0
      }
    },
    { timestamps: true }
  );
  

export const Comment = mongoose.model('Comment',CommentSchema); 