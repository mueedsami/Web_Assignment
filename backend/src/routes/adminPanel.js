import express from 'express';
import User from '../models/user.js'
import {createUserController} from '../controllers/signup.js';

const router=express.Router();

router.get('/me', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      res.status(200).json({ user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

router.get('/all', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      const users = await User.find().select('-password');
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
      const requestingUser = await User.findById(req.user.userId);
      if (requestingUser.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

export default router;
