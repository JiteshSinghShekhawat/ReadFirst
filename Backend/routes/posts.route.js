import express from "express" ; 
import commentRoute from "./comments.route.js"; 
import likeRotue from "./like.route.js"; 

const router = express.Router();

router.use('/comments',commentRoute); 
router.use('/like',likeRotue); 


export default router ; 