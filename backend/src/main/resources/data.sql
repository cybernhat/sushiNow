DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS tables CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	server_name VARCHAR(255) UNIQUE NOT NULL,
	server_passcode INTEGER UNIQUE NOT NULL,
	role VARCHAR NOT NULL CHECK (role IN ('FOH', 'BOH'))
);

CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	price NUMERIC(10, 2) NOT NULL,
	description VARCHAR(255) NOT NULL,
	category VARCHAR NOT NULL CHECK (
		category IN ('Ramen', 'Rice Bowl', 'Small Bite', 'Sake')
	)
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
	status VARCHAR NOT NULL CHECK (status IN ('pending', 'in progress', 'done')),
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

-- RAMEN
INSERT INTO items (name, price, description, category)
VALUES
	('Hakata Tonkotsu', 17.50, 'Hakata style ramen with rich pork broth, chashu pork, seasoned soft boiled egg, green onions, kikurage mushrooms, and bean sprouts', 'Ramen'),
	('Hakata Tonkotsu DX', 21.50, 'Rich pork broth with regular toppings plus braised thick pork belly, corn, and nori seaweed', 'Ramen'),
	('Chicken Paitan', 17.50, 'Chicken ramen with rich white paitan broth, chashu chicken breast, seasoned soft boiled egg, green onions, kikurage mushrooms, and bean sprouts', 'Ramen'),
	('Chicken Paitan DX', 23.00, 'Chicken paitan ramen with regular toppings plus grilled chicken leg, corn, and nori seaweed', 'Ramen'),
	('Spicy Tan Tan', 18.50, 'Spicy sesame flavored ramen with rich broth and savory toppings', 'Ramen'),
	('Vegetable Ramen', 18.00, 'Creamy vegetable broth with spinach noodles, tofu, spring mix, cherry tomatoes, bell peppers, red onion, kaiware sprouts, and egg', 'Ramen');

-- RICE BOWL
INSERT INTO items (name, price, description, category)
VALUES
	('Chashu Rice Bowl', 8.50, 'Rice bowl topped with tender chashu pork', 'Rice Bowl'),
	('Chicken Karaage Rice Bowl', 9.50, 'Rice bowl topped with Japanese style fried chicken', 'Rice Bowl'),
	('Takana Rice Bowl', 6.50, 'Rice bowl topped with seasoned mustard greens', 'Rice Bowl');

-- SMALL BITES
INSERT INTO items (name, price, description, category)
VALUES
	('Gyoza 7pc', 8.50, 'Pan-fried pot stickers', 'Small Bite'),
	('Edamame', 6.00, 'Steamed green soybeans', 'Small Bite'),
	('Chicken Karaage', 10.00, 'Japanese style fried chicken', 'Small Bite'),
	('Takoyaki 5pc', 8.50, 'Octopus balls', 'Small Bite'),
	('Ika Karaage', 12.50, 'Fried squid', 'Small Bite'),
	('Fried Shishito', 8.50, 'Fried shishito peppers', 'Small Bite'),
	('Marufuku Bites 2pc', 10.50, 'Japanese steamed buns filled with homemade pork chashu', 'Small Bite'),
	('Pirikara Chicken Bites 2pc', 10.50, 'Spicy chicken bites with Japanese tingly sauce', 'Small Bite');

-- SAKE
INSERT INTO items (name, price, description, category)
VALUES
	('House Sake', 8.00, 'Traditional Japanese sake served warm or cold', 'Sake'),
	('Nigori Sake', 10.00, 'Unfiltered sake with a smooth and cloudy texture', 'Sake'),
	('Sparkling Sake', 12.00, 'Light sparkling Japanese sake', 'Sake');