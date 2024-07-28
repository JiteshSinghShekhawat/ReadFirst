import express from 'express';
import { getTag, createTag } from '../controllers/tagController.js';

const router = express.Router();

router.get('/', getTag);
router.post('/', createTag);

export default router;
