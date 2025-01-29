import express from 'express';
// import { login, register, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// router.post('/login', login);
// router.post('/register', register);
// router.get('/me', authenticateToken, getUserProfile);
// router.put('/me', authenticateToken, updateUserProfile);

export default router;