import express from 'express';
import { getAllCourses, getCourseById } from '../controllers/courseController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllCourses);
router.get('/:id', authenticateToken, getCourseById);

export default router;