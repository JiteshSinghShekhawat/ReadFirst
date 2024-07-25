import express from "express" ; 
import commentRoute from "./comments.route.js";
import likeRoute from "./like.route.js"; 
import { getPostById } from "../controllers/postController.js";
import { Tag } from "../models/tag.models.js";
import { getPost, uploadPost } from "../controllers/postController.js";

const router = express.Router();

router.use('/comments',commentRoute); 
router.use('/like',likeRoute); 

router.get('/:id',getPostById); 
router.get('/',getPost);
router.post('/',uploadPost); 

export default router ; 