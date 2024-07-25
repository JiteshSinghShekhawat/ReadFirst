import express from "express" ; 
import commentRoute from "./comments.route.js";
import likeRoute from "./like.route.js"; 
import { getPostById,updatePost,getPost, uploadPost, deletePost } from "../controllers/postController.js";
import { Tag } from "../models/tag.models.js";

const router = express.Router();

router.use('/comments',commentRoute); 
router.use('/like',likeRoute); 

router.get('/',getPost);
router.get('/:postId',getPostById); 
router.post('/',uploadPost); 
router.patch('/',updatePost); 
router.delete('/',deletePost); 

export default router ; 