import express from 'express';
import {createUserController} from '../controllers/signup.js';

const router=express.Router();

router.post("/register", createUserController);

export default router;
//module.exports = router;