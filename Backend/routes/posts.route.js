import express from 'express';
import commentRoute from './comments.route.js';
import jwtValid from '../middlewares/verifyJwt.middleware.js';
import likeRoute from './like.route.js';
import {
    getPostById,
    updatePost,
    getPost,
    uploadPost,
    deletePost,
} from '../controllers/postController.js';
import { Tag } from '../models/tag.models.js';

const router = express.Router();

router.use('/comments', commentRoute);
router.use('/like', likeRoute);

router.get('/', getPost);
router.get('/:postId', getPostById);
router.post('/',jwtValid, uploadPost);
router.patch('/',jwtValid, updatePost);
router.delete('/',jwtValid, deletePost);

export default router;
