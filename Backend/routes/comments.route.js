import express from "express"; 
import { getComment,createComment,updateComment,deleteComment } from "../controllers/comentController.js";
const router = express.Router(); 

router.get('/',getComment); 
router.post('/',createComment); 
router.patch('/',updateComment); 
router.delete('/',deleteComment); 

export default router ;