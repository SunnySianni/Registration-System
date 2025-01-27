import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example route to fetch dashboard data
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Example: Fetch user's enrolled courses
    const userId = req.user.id;
    const courses = await query(
      `SELECT c.id, c.name, c.department, c.credits 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       WHERE e.user_id = ?`,
      [userId]
    );

    res.json({ courses });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
