// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',     // or your DB host
  user: 'root',          // your MySQL username
  password: 'indarjeet@1234',  // your MySQL password
  database: 'products'    // your database name
});





module.exports = connection;