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
import loginRoutes from './backend/routes/loginRoutes.js';
import profileRoutes from './backend/routes/profileRoutes.js';
import dashboardRoutes from './backend/routes/dashboardRoutes.js';

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
app.use('/login', loginRoutes);
app.use('/profile', authenticateToken, profileRoutes);
app.use('/dashboard', authenticateToken, dashboardRoutes);

// Default homepage (redirect to login)
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).render('error', {
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
