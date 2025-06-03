import bcrypt from "bcrypt"
import connection from "../../db/sql.js";

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();





export const signUp = async (req, res) => {
  const { username, mobile, password } = req.body;

  if (!username || !mobile || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if mobile or username already registered
  connection.query(
    'SELECT * FROM users WHERE mobile = ? OR username = ?',
    [mobile, username],
    async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      const mobileExists = results.some(user => user.mobile === mobile);
      const usernameExists = results.some(user => user.username === username);

      if (mobileExists) return res.status(400).json({ error: 'Mobile already registered' });
      if (usernameExists) return res.status(400).json({ error: 'Username already taken' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      connection.query(
        'INSERT INTO users (username, mobile, password) VALUES (?, ?, ?)',
        [username, mobile, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          res.json({ message: 'User registered successfully' });
        }
      );
    }
  );
};





const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const logIn = (req, res) => {
  const { mobile, password } = req.body;
  if (!mobile || !password) {
    return res.status(400).json({ error: 'Mobile and password are required' });
  }

  connection.query('SELECT * FROM users WHERE mobile = ?', [mobile], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(400).json({ error: 'Mobile not registered' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    // ✅ Create JWT token
    const payload = {
      username: user.username,
      mobile: user.mobile,
      role: user.username == "admin" && user.mobile == "6299987191" ? "admin" : "user"
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    // ✅ Send token to frontend
    res.json({
      message: 'Login successful',
      token,
      username: user.username,
      mobile: user.mobile
    });
  });
};



export const userDetails = (req, res) => {
  const query = "SELECT * FROM users";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json({ users: results });
  });
};
