DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS tables CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	server_name VARCHAR(255) UNIQUE NOT NULL,
	server_passcode INTEGER UNIQUE NOT NULL,
	role varchar NOT NULL CHECK (role IN('FOH', 'BOH'))
);

CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	price NUMERIC(10, 2) NOT NULL,
	description VARCHAR(255) NOT NULL,
	category VARCHAR NOT NULL CHECK (category IN('Sushi', 'Sashimi', 'Nigiri', 'Appetizer'))
);

CREATE TABLE tables (
	id SERIAL PRIMARY KEY,
	seats INTEGER NOT NULL,
	is_occupied BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(id),
	table_id INTEGER NOT NULL REFERENCES tables(id),
	status VARCHAR NOT NULL CHECK (status IN('pending', 'in progress', 'done')),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
	id SERIAL PRIMARY KEY,
	order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
	item_id INTEGER NOT NULL REFERENCES items(id),
	notes VARCHAR(255)
);

INSERT INTO users (server_name, server_passcode, role)
VALUES 
	('Nhat', 9172, 'FOH'),
	('Peanut', 6767, 'BOH');

INSERT INTO tables (seats, is_occupied) 
VALUES
	(4, FALSE),
	(4, FALSE),
	(4, FALSE),
	(4, FALSE),
	(8, FALSE),
	(8, FALSE);

INSERT INTO items (name, price, description, category)
VALUES
	('California Roll', 9.99, 'Crab, avocado, cucumber', 'Sushi'),
    ('Spicy Tuna Roll', 9.99, 'Tuna, spicy mayo', 'Sushi'),
    ('Salmon Maki', 12.99, 'Salmon', 'Sushi'),
    ('Tuna Maki', 12.99, 'Tuna', 'Sushi'),
    ('Philadelphia Roll', 13.99, 'Salmon, cream cheese, cucumber', 'Sushi'),
    ('Dragon Roll', 16.99, 'Eel, cucumber, avocado topping', 'Sushi'),
    ('Rainbow Roll', 19.99, 'Crab, avocado, cucumber, salmon, tuna, yellowtail, eel', 'Sushi'),
    ('Lion King', 19.99, 'Crab, avocado, cucumber, salmon, spicy mayo, unagi sauce', 'Sushi'),
    ('Spider Roll', 18.99, 'Soft-shell crab, cucumber, spicy mayo', 'Sushi'),
    ('Vegetable Roll', 7.50, 'Cucumber, avocado, assorted vegetables', 'Sushi');

INSERT INTO items (name, price, description, category)
VALUES 
	('Sake', 14.99, '6 piece salmon sashimi', 'Sashimi'),
	('Maguro', 14.99, '6 piece tuna sashimi', 'Sashimi'),
	('Hamachi', 14.99, '6 piece yellowtail sashimi', 'Sashimi'),
	('Toro', 24.99, '6 piece premium bluefin tuna belly', 'Sashimi');

INSERT INTO items (name, price, description, category)
VALUES 
	('Sake', 9.99, '2 piece salmon nigiri', 'Nigiri'),
	('Maguro', 9.99, '2 piece tuna nigiri', 'Nigiri'),
	('Hamachi', 9.99, '2 piece yellowtail nigiri', 'Nigiri'),
	('Toro', 15.99, '2 piece premium bluefin tuna belly', 'Nigiri');

INSERT INTO items (name, price, description, category)
VALUES
	('Gyoza', 9.99, '6 piece chicken potstickers', 'Appetizer'),
	('Takoyaki', 12.99, '8 piece octoupus dumpling', 'Appetizer'),
	('Chicken Karaage', 12.99, 'crispy fried chicken pieces', 'Appetizer'),
	('Seaweed Salad', 8.99, 'seaweed salad', 'Appetizer');
