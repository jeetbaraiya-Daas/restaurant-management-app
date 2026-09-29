-- Week 4 Deliverable: MySQL Database Schema
CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Foods Table
CREATE TABLE IF NOT EXISTS foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  category_id INT NOT NULL,
  description TEXT NOT NULL,
  is_veg BOOLEAN DEFAULT TRUE,
  spice_level INT DEFAULT 1,
  prep_time INT DEFAULT 15,
  image_url VARCHAR(500),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 3. Bills Table (Week 9 Optional DB storage)
CREATE TABLE IF NOT EXISTS bills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_no VARCHAR(40) NOT NULL UNIQUE,
  customer_name VARCHAR(100) DEFAULT 'Walk-in Guest',
  table_no VARCHAR(20) DEFAULT 'T-04',
  order_type VARCHAR(30) DEFAULT 'Dine-In',
  subtotal DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0.00,
  tax_amount DECIMAL(10, 2) NOT NULL,
  grand_total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bill Items Table
CREATE TABLE IF NOT EXISTS bill_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT NOT NULL,
  food_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE,
  FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- Seed Initial Categories
INSERT IGNORE INTO categories (id, name, description) VALUES
(1, 'Starters', 'Artisanal small plates and appetizers'),
(2, 'Wood-Fired Mains', 'Signature hearth-roasted entrees'),
(3, 'Artisanal Pasta', 'Hand-rolled fresh pasta and risotto'),
(4, 'Signature Desserts', 'House-crafted sweet finales'),
(5, 'Craft Beverages', 'Botanical infusions and specialty coffee');

-- Seed Initial Foods
INSERT INTO foods (name, price, category_id, description, is_veg, spice_level, prep_time, image_url, available) VALUES
('Truffle & Wild Mushroom Arancini', 420.00, 1, 'Crispy Arborio risotto spheres stuffed with black truffle pate, porcini mushrooms, and aged Parmigiano-Reggiano.', TRUE, 1, 14, 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', TRUE),
('Charred Burrata & Heirloom Tomato', 480.00, 1, 'Creamy pugliese burrata over blistered cherry tomatoes, cold-pressed basil oil, and grilled sourdough.', TRUE, 1, 10, 'https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?auto=format&fit=crop&w=800&q=80', TRUE),
('Herb-Crusted Lamb Cutlets', 790.00, 2, 'Char-grilled tender lamb chops finished with rosemary garlic jus and Pommes Anna.', FALSE, 2, 22, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', TRUE),
('Smoked Paprika Paneer Steak', 560.00, 2, 'Wood-fired cottage cheese steak glazed in smoked Spanish paprika reduction with charred asparagus.', TRUE, 2, 18, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80', TRUE),
('Saffron & Prawn Tagliolini', 680.00, 3, 'Hand-cut egg pasta tossed with tiger prawns, Kashmiri saffron bisque, confit garlic, and lemon zest.', FALSE, 2, 16, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80', TRUE),
('Basque Burnt Cheesecake', 390.00, 4, 'Caramelized San Sebastian style cheesecake with a molten Madagascar vanilla bean center.', TRUE, 0, 8, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80', TRUE);
