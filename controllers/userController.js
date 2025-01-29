// // import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// // import { query } from '../config/database.js';

// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     console.log('Login request received:', { username }); // Debug log

//     // Fetch user from the database
//     const [user] = await query('SELECT * FROM users WHERE username = ?', [username]);

//     // Check if the user exists
//     if (!user) {
//       console.log('User not found for username:', username); // Debug log
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     console.log('User fetched from database:', user); // Debug log

//     // Compare the hashed password
//     // const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       console.log('Password comparison failed for user:', username); // Debug log
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     console.log('Login successful for user:', username); // Debug log

//     res.json({ token, role: user.role });
//   } catch (error) {
//     console.error('Error during login:', error); // Error log
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const register = async (req, res) => {
//   const { username, password, fullName, email, role } = req.body;

//   try {
//     console.log('Register request received:', { username, fullName, email, role }); // Debug log

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user into the database
//     await query('INSERT INTO users (username, password, full_name, email, role) VALUES (?, ?, ?, ?, ?)', 
//       [username, hashedPassword, fullName, email, role]);

//     console.log('User registered successfully:', username); // Debug log
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during registration:', error); // Error log
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getUserProfile = async (req, res) => {
//   try {
//     console.log('Fetching user profile for user ID:', req.user.id); // Debug log

//     // Fetch user profile from the database
//     const [user] = await query('SELECT id, username, full_name, email, role FROM users WHERE id = ?', [req.user.id]);
//     if (!user) {
//       console.log('User not found for ID:', req.user.id); // Debug log
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user profile:', error); // Error log
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const updateUserProfile = async (req, res) => {
//   const { fullName, email, password } = req.body;

//   try {
//     console.log('Update profile request for user ID:', req.user.id); // Debug log

//     // Update user profile
//     if (password) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       await query('UPDATE users SET full_name = ?, email = ?, password = ? WHERE id = ?', 
//         [fullName, email, hashedPassword, req.user.id]);
//     } else {
//       await query('UPDATE users SET full_name = ?, email = ? WHERE id = ?', 
//         [fullName, email, req.user.id]);
//     }

//     console.log('Profile updated successfully for user ID:', req.user.id); // Debug log
//     res.json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error('Error updating profile:', error); // Error log
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
