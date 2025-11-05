create database products;

use products;
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  category varchar(50) NOT null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO items (title, description, price, stock, category)
VALUES 
  ('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver.', 25.99, 50, 'electronic');
  
  
Select * from items



INSERT INTO items (title, description, price, stock, category)
VALUES ('HP Pavilion', 'This is a student laptop', 60000, 10, 'Electronics');


ALTER TABLE items ADD COLUMN image_url VARCHAR(255);

ALTER TABLE items RENAME COLUMN image_url TO image;










DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  mobile VARCHAR(15) UNIQUE,
  password VARCHAR(255)
);

select *FROM users;



CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100),
  email VARCHAR(100),
  mobile VARCHAR(15),
  address TEXT,
  payment_method VARCHAR(50),
  product_id INT,
  quantity INT DEFAULT 1,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE orders
ADD CONSTRAINT fk_product
FOREIGN KEY (product_id) REFERENCES items(id);

ALTER TABLE orders ADD COLUMN user_id INT;
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);
