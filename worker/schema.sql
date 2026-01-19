DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS elements;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS pages;

CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE elements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id INTEGER NOT NULL,
  element_key TEXT NOT NULL, -- e.g., 'header_title', 'price_product_1'
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text', -- 'text', 'image', 'html'
  FOREIGN KEY (page_id) REFERENCES pages(id),
  UNIQUE(page_id, element_key)
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  product_summary TEXT NOT NULL, -- e.g., "Cargo Pants x 2"
  total_price REAL NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'shipped'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Data
INSERT INTO pages (slug, title) VALUES ('default', 'Glace Cotton Cargo Pants');
