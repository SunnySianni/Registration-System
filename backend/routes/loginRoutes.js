import express from 'express';
import { login, register } from '../controllers/userController.js';

const router = express.Router();

// Login route
router.post('/login', login);

// Register route (optional if you want to allow registration from the frontend)
router.post('/register', register);

export default router;
