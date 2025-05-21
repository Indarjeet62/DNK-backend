import express from 'express';
import mysql from 'mysql2';
import multer from 'multer';
import connection from './db/sql.js';
import upload from './multer/index.js' ;


const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());


// app.post('/ping', (req, res)=>{
//     console.log(req.body);
//     return res.json({message:"pong"})
// })

const port = 3002

app.listen( port, async ()=>{
    console.log(`Your server is open on ${port}`)
})

app.get('/', (req, res) => {
  res.send("home page");
});



// Route to fetch all users
app.get('/product', (req, res) => {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});


//upload data in db
app.post('/inputProduct', upload.single('file'), (req, res) => {
  const { title, description, price, stock, category } = req.body;
  const image_url = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO items (title, description, price, stock, category, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [title, description, price, stock, category, image_url];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.send('Product uploaded and saved successfully!');
  });
});
