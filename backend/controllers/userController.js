import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await query('SELECT * FROM users WHERE username = ?', [username]);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req, res) => {
  const { username, password, fullName, email, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await query('INSERT INTO users (username, password, full_name, email, role) VALUES (?, ?, ?, ?, ?)', 
      [username, hashedPassword, fullName, email, role]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const [user] = await query('SELECT id, username, full_name, email, role FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUserProfile = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await query('UPDATE users SET full_name = ?, email = ?, password = ? WHERE id = ?', 
        [fullName, email, hashedPassword, req.user.id]);
    } else {
      await query('UPDATE users SET full_name = ?, email = ? WHERE id = ?', 
        [fullName, email, req.user.id]);
    }
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};