import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const { fullName } = req.user;

  // Placeholder courses; replace with dynamic database query
  const courses = [
    { name: 'Intro to CS', department: 'Computer Science', credits: 3 },
    { name: 'Advanced Math', department: 'Mathematics', credits: 4 },
  ];

  res.render('dashboard', {
    title: 'Dashboard',
    activePage: 'dashboard',
    studentName: fullName,
    courses,
  });
});

export default router;

