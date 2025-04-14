import express from 'express';
import cors from 'cors';
import { createTask } from '../controllers/task.js';
import { authMiddleware } from '../utils/authMiddleware.js';
import { getTasks } from '../controllers/task.js';
const router = express.Router();

router.use(cors());

router.post('/create', authMiddleware, createTask);
router.get('/list', authMiddleware, getTasks);

export default router;



