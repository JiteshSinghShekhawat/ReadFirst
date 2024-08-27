import express from 'express';
import { addLike } from '../controllers/likeController.js';
const router = express.Router();

router.post('/', addLike);

export default router;
