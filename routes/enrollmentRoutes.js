import express from 'express';
// import { getEnrollments, createEnrollment } from '../controllers/enrollmentController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// router.get('/', authenticateToken, getEnrollments);
// router.post('/', authenticateToken, createEnrollment);

export default router;