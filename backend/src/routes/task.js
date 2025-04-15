import express from 'express';
import cors from 'cors';
import { createTask } from '../controllers/task.js';
import { authMiddleware } from '../utils/authMiddleware.js';
import { getTasks } from '../controllers/task.js';
import { deleteTask } from '../controllers/task.js';
import { markTaskComplete } from '../controllers/task.js';
import { editTask } from '../controllers/task.js';
import { updateTask } from '../controllers/task.js';
const router = express.Router();

router.use(cors());

router.post('/create', authMiddleware, createTask);
router.get('/list', authMiddleware, getTasks);
router.delete('/delete/:id', authMiddleware, deleteTask);
router.patch('/complete/:id', authMiddleware, markTaskComplete);
router.patch('/edit/:id', authMiddleware, editTask);
router.patch('/update/:id', authMiddleware,updateTask);

export default router;



