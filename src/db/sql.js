// db.js

import mysql from 'mysql2';

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'indarjeet@1234',
  database: 'products'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID', connection.threadId);
});

export default connection;
