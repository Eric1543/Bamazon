DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    item_id INTEGER(10),
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price FLOAT(7, 2),
    stock_quantity INTEGER(10),
    primary key(id)
);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(1, 'The Shallows', 'Books', 9.99, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(2, 'The Alchemist', 'Books', 10.99, 21);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(3, 'The Great Gatsby', 'Books', 11.99, 22);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(101, 'The Oculus Rift VR', 'Electronics', 299.99, 10);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(102, 'Playstation VR', 'Electronics', 399.99, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(201, 'Playing Cards', 'Games', 4.99, 30);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(202, 'Pictionary', 'Games', 14.99, 31);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(203, 'Yahtzee', 'Games', 10.99, 22);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(301, 'Calvin Klein Belt', 'Accessories', 29.99, 30);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(302, 'Tommy Hilfiger Watch', 'Accessories', 59.99, 20);

SELECT * FROM products;