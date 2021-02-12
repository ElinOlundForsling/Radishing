import express from 'express';
const router = express.Router();
import { getText, updateText } from '../controllers/textController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getText).put(protect, admin, updateText);

export default router;
