import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';
import userRoutes from './backend/routes/userRoutes.js';

dotenv.config();

// Initialize app
const app = express();
const port = process.env.PORT || 3001;

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend'));

// Static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Connect to database
connectDB();

// API Routes
app.use('/api/users', userRoutes);

// Frontend Routes
app.get('/', (req, res) => {
  res.render('loginForm', {
    title: 'Login',
    errorMessage: null,
    username: '' // Pass a blank username initially
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Example authentication logic
  if (username !== 'admin' || password !== 'password') {
    return res.render('loginForm', {
      title: 'Login',
      errorMessage: 'Invalid username or password.',
      username // Return the entered username for user convenience
    });
  }

  // Redirect to dashboard on successful login
  res.redirect('/dashboard');
});

// Error Handling
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Error',
    message: 'Something went wrong. Please try again later.'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
