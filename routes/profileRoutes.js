import express from 'express';
// import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// // Get user profile
// router.get('/', authenticateToken, getUserProfile);

// // Update user profile
// router.put('/', authenticateToken, updateUserProfile);

export default router;
