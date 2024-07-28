import express from 'express';
import {
    getComment,
    createComment,
    updateComment,
    deleteComment,
    getCommentById,
} from '../controllers/commentController.js';
const router = express.Router();

router.get('/', getComment);
router.get('/:CommentId', getCommentById);
router.post('/', createComment);
router.patch('/', updateComment);
router.delete('/', deleteComment);

export default router;
