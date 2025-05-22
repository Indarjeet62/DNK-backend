import express from 'express';
import multer from 'multer';

import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { signUp } from './model/usersAuthentication/index.js';
import { logIn } from './model/usersAuthentication/index.js';
import { addProduct, deleteProduct, seeProduct, seeProducts } from './model/product/index.js';

const app = express();
const upload = multer();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

// Use built-in body parsers only once
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const port = 3002;

app.listen(port, () => {
  console.log(`Your server is open on ${port}`);
});

app.get('/', (req, res) => {
  res.send("home page");
});

// Product routes
app.get('/product', seeProducts);
app.get('/product/:id', seeProduct);
app.post('/addProduct', addProduct);
app.delete('/item/:id', deleteProduct);

// Auth routes with multer none to parse form data without files
app.post('/signup', upload.none(), signUp);
app.post('/login', upload.none(), logIn);
