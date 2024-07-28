import express from 'express';
import { addLike, removeLike } from '../controllers/likeController.js';
const router = express.Router();

router.post('/', addLike);
router.delete('/', removeLike);

export default router;
