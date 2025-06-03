import mysql from 'mysql2';
import multer from 'multer';
import connection from "../../db/sql.js";
import upload from '../../multer/index.js' ;



export const seeProducts = (req, res) => {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  
  });
}

export const seeProduct = (req, res) => {
  const itemId = req.params.id;

  const query = 'SELECT * FROM items WHERE id = ?';

  connection.query(query, [itemId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(result[0]); // send the first (and only) item as object
  });
}

export const addProduct = [upload.single('image'), (req, res) => {
  const { title, description, price, stock, category } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO items (title, description, price, stock, category, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [title, description, price, stock, category, image];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.json({ message: 'Product uploaded and saved successfully!' });
  });
}]

export const deleteProduct = (req, res) => {
  const itemId = req.params.id;

  const query = 'DELETE FROM items WHERE id = ?';
  connection.query(query, [itemId], (err, result) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  });
}


export const editProduct = (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const { title, category, description, price } = req.body;

  // Basic validation
  if (!title || !category || !description || isNaN(price)) {
    return res.status(400).send('Invalid data');
  }

  const query = `
    UPDATE items
    SET title = ?, category = ?, description = ?, price = ?
    WHERE id = ?
  `;

  const values = [title, category, description, price, itemId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Database update error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  });
};


