import express from 'express';
import multer from 'multer';

import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { logIn , userDetails, signUp} from './model/usersAuthentication/index.js';
import { addProduct, deleteProduct, editProduct, seeProduct, seeProducts } from './model/product/index.js';
import {authenticateToken} from './model/middleware/auth_middleware.js'

import dotenv from 'dotenv';
dotenv.config();
import connection from './db/sql.js';



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
app.post('/addProduct', authenticateToken , addProduct);
app.delete('/product/:id', deleteProduct);
// Update product by ID (PUT /product/:id)
app.put('/product/:id', editProduct );



// Auth routes with multer none to parse form data without files
app.post('/signup', upload.none(), signUp);
app.post('/login', upload.none(),  logIn);
app.get('/users', userDetails);