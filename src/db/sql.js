// db.js

import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.db_password,
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
