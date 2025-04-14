import express from 'express';
import cors from 'cors';
import { createTask } from '../controllers/task.js';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = express.Router();

router.use(cors());

router.post('/create', authMiddleware, createTask);

export default router;
