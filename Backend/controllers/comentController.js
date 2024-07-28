import { Comment } from "../models/comment.model.js";


export const getComment = async(req,res)=>{
    try{
        const {postId,parentCommentId} = req.body; 

        let query = {}; 
        if(postId){
            query.PostId = postId; 
        }
        if(parentCommentId){
            query.parentComment = parentCommentId; 
        }

        const comments = await Comment.find(query)
            .populate('UserId','userName'); 
        
        res.status(200).json(comments); 
    }catch(e){
        console.log(`Error while getting Comment ${e}`)
    }
}
export const getCommentById = async(req,res)=>{
    try{
        const {CommentId} = req.params; 
        const comment = await Comment.findById(CommentId); 
        if(!comment){
            return res.status(400).json({
                message : "Please Enter valid commentId "
            })
        }
        res.status(200).json(comment); 
    }catch(e){
        console.log(`Error while getting Comment by Id ${e}`); 
    }
}
export const createComment = async(req,res) =>{
    try{
        const {postId, parentCommentId,content} = req.body; 
        const userId = req.user.id; 
        if(!postId && !parentCommentId){
            return res.status(400).json({message : "Please select valid field"}); 
        }
        if(!content){
            return res.status(400).json({message : "Please Enter Comment. "}); 
        }
        const newComment = new Comment(
            {
                UserId : userId, 
                PostId : postId, 
                parentComment : parentCommentId, 
                content : content
            }
        ); 
        await newComment.save(); 

        res.status(200).json({message : "Comment Posted Successfully !"}); 
    }catch(e){
        console.log(`Error while adding Comment ${e}`)
    }
}

export const updateComment = async(req,res) =>{
    try{
        const {commentId, content} = req.body; 
        if(!commentId){
            return res.status(400).json({
                message : "Please Select Comment. "
            }); 
        }
        const comment = await Comment.findById(commentId); 

        if(!comment){
            return res.status(400).json({
                message : "Please Select Valid Comment. "
            }); 
        }

        comment.content = content; 
        await comment.save(); 

        res.status(200).json(
            {
                message : "Comment Updated Successfully"
            }
        ); 
    }catch(e){
        console.log(`Error while updating Comment ${e}`)
    }
}
export const deleteComment = async(req,res) =>{
    try{
        const {commentId} = req.body; 
        if(!commentId){
            return res.status(400).json({
                message : "Please Select Comment. "
            }); 
        }

        const comment = await Comment.findByIdAndDelete(commentId); 
        if(!comment){
            return res.status(400).json(
                {
                    message : "Please Select Valid Comment. "
                }
            ); 
        }

        return res.status(200).json(
            {
                message : "Comment Deleted Successfully"
            }
        ); 
    }catch(e){
        console.log(`Error while deleting Comment ${e}`)
    }
}