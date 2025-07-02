import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  getUserProfile
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);

export default router;