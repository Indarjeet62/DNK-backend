import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Add a secret key in your environment or config
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

    // Create a JWT payload
    const payload = {
      id: user.id,
      username: user.username,
      mobile: user.mobile
    };

    // Sign JWT token, expires in 1 hour
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Send token along with user info
    res.json({
      message: 'Login successful',
      username: user.username,
      mobile: user.mobile,
      token // send token to client
    });
  });
};
