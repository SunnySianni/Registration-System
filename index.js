import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';

// Import routes
import userRoutes from './backend/routes/userRoutes.js';
import courseRoutes from './backend/routes/courseRoutes.js';
import enrollmentRoutes from './backend/routes/enrollmentRoutes.js';

// Import middleware
import { authenticateToken } from './backend/middlewares/auth.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const port = process.env.PORT || 3001;

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend'));

// Connect to the database
connectDB();

// API routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Frontend routes
app.get('/', (req, res) => {
  res.render('loginForm', {
    title: 'Login',
    errorMessage: null,
    username: '',
  });
});

app.get('/dashboard', authenticateToken, (req, res) => {
  const studentName = req.user.fullName; // From the authenticated token
  const courses = [
    { name: 'Intro to CS', department: 'Computer Science', credits: 3 },
    { name: 'Advanced Math', department: 'Mathematics', credits: 4 },
  ]; // Fetch courses dynamically from the database instead of this placeholder

  res.render('dashboard', {
    title: 'Dashboard',
    activePage: 'dashboard',
    studentName,
    courses,
  });
});

app.get('/course-registration', authenticateToken, (req, res) => {
  res.render('course-registration', { title: 'Course Registration', activePage: 'course-registration' });
});

app.get('/profile', authenticateToken, (req, res) => {
  const userProfile = {
    fullName: req.user.fullName, // From the authenticated token
    email: req.user.email, // From the authenticated token
  }; // Fetch additional profile data dynamically if needed

  res.render('profile', { title: 'Profile', activePage: 'profile', user: userProfile });
});

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Error handling
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).render('error', {
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
