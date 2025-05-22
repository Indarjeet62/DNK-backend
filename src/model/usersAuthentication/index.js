import bcrypt from "bcrypt"
import connection from "../../db/sql.js";





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

    // Login success (return user info or token)
    res.json({ message: 'Login successful', username: user.username, mobile: user.mobile });
  });
}