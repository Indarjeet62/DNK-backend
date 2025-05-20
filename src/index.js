const express = require('express');
const mysql = require('mysql2');
const connection = require('./db/sql.js')
const app = express();

// app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded());


// app.post('/ping', (req, res)=>{
//     console.log(req.body);
//     return res.json({message:"pong"})
// })

const port = 3002

app.listen( port, async ()=>{
    console.log(`Your server is open on ${port}`)
})

app.get('', (req, res) => {
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


