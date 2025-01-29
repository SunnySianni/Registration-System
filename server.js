import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Import routes
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Import middleware
import { authenticateToken } from './middlewares/auth.js';

// Load environment variables

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
app.use(express.static(path.join(__dirname, 'views')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Default homepage (redirect to login)
// app.get('/', (req, res) => {
//   res.redirect('/login');
// });

// API routes
// app.use('/api/users', userRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/enrollments', enrollmentRoutes);

// Frontend routes
// removed the login on linve 44 since you have it here 
app.use('/', loginRoutes);
// app.use('/profile', authenticateToken, profileRoutes);
// app.use('/dashboard', authenticateToken, dashboardRoutes);


// Log all incoming requests for debugging
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });

// Error handling for unknown routes
// app.use((req, res) => {
//   res.status(404).render('error', {
//     title: 'Page Not Found',
//     message: 'The page you are looking for does not exist.',
//   });
// });

// General error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
//   res.status(500).render('error', {
//     title: 'Error',
//     message: 'Something went wrong. Please try again later.',
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.0:${port}`);
});
