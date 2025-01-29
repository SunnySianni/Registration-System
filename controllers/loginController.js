// export const login = async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const [user] = await query('SELECT * FROM users WHERE username = ?', [username]);
  
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }
  
//       const isValidPassword = await bcrypt.compare(password, user.password);
  
//       if (!isValidPassword) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }
  
//       const token = jwt.sign(
//         { id: user.id, fullName: user.full_name, email: user.email, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
  
//       res.status(200).json({
//         message: 'Login successful',
//         token,
//         user: {
//           fullName: user.full_name,
//           email: user.email,
//           role: user.role,
//         },
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  