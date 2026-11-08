PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_code TEXT UNIQUE,
  full_name TEXT NOT NULL,
  grade TEXT,
  class_name TEXT,
  phone TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  purchase_price INTEGER NOT NULL DEFAULT 0 CHECK(purchase_price >= 0),
  sale_price INTEGER NOT NULL CHECK(sale_price >= 0),
  stock_qty INTEGER NOT NULL DEFAULT 0 CHECK(stock_qty >= 0),
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  receipt_no TEXT NOT NULL UNIQUE,
  student_id INTEGER REFERENCES students(id),
  payment_method TEXT NOT NULL CHECK(payment_method IN ('cash','card','credit')),
  total_amount INTEGER NOT NULL CHECK(total_amount >= 0),
  note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sale_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sale_id INTEGER NOT NULL REFERENCES sales(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK(quantity > 0),
  unit_price INTEGER NOT NULL CHECK(unit_price >= 0),
  line_total INTEGER NOT NULL CHECK(line_total >= 0)
);

CREATE TABLE IF NOT EXISTS student_ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES students(id),
  sale_id INTEGER REFERENCES sales(id),
  entry_type TEXT NOT NULL CHECK(entry_type IN ('debt','payment','adjustment')),
  amount INTEGER NOT NULL CHECK(amount > 0),
  description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cash_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sale_id INTEGER REFERENCES sales(id),
  transaction_type TEXT NOT NULL CHECK(transaction_type IN ('cash_sale','card_sale','student_payment','expense')),
  amount INTEGER NOT NULL CHECK(amount > 0),
  description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  amount INTEGER NOT NULL CHECK(amount > 0),
  category TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at);
CREATE INDEX IF NOT EXISTS idx_sales_student ON sales(student_id);
CREATE INDEX IF NOT EXISTS idx_ledger_student ON student_ledger(student_id);
CREATE INDEX IF NOT EXISTS idx_cash_created_at ON cash_transactions(created_at);
