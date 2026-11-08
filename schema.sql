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


-- احراز هویت و سطح دسترسی سه‌نقشی
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('seller','accountant','manager')),
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expiry ON user_sessions(expires_at);
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ماژول سود، کمیسیون، خرید، هزینه و حساب‌های دریافتنی/پرداختنی
CREATE TABLE IF NOT EXISTS commission_settings (
  id INTEGER PRIMARY KEY CHECK(id=1),
  percent REAL NOT NULL DEFAULT 0 CHECK(percent>=0 AND percent<=100),
  basis TEXT NOT NULL DEFAULT 'sale_amount' CHECK(basis IN ('sale_amount','gross_profit')),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT OR IGNORE INTO commission_settings(id,percent,basis) VALUES(1,0,'sale_amount');

CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  purchase_no TEXT NOT NULL UNIQUE,
  supplier_id INTEGER REFERENCES suppliers(id),
  total_amount INTEGER NOT NULL CHECK(total_amount>=0),
  paid_amount INTEGER NOT NULL DEFAULT 0 CHECK(paid_amount>=0),
  note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS purchase_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  purchase_id INTEGER NOT NULL REFERENCES purchases(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK(quantity>0),
  unit_cost INTEGER NOT NULL CHECK(unit_cost>=0),
  line_total INTEGER NOT NULL CHECK(line_total>=0)
);
CREATE TABLE IF NOT EXISTS financial_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK(account_type IN ('receivable','payable')),
  phone TEXT,
  notes TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS financial_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL REFERENCES financial_accounts(id),
  entry_type TEXT NOT NULL CHECK(entry_type IN ('charge','payment','adjustment')),
  amount INTEGER NOT NULL CHECK(amount>0),
  reference TEXT,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_fin_entries_account ON financial_entries(account_id,created_at);
CREATE INDEX IF NOT EXISTS idx_purchases_created ON purchases(created_at);

-- ستون‌های تاریخی فروش برای محاسبه دقیق سود هر قلم در زمان فروش
ALTER TABLE sale_items ADD COLUMN unit_cost INTEGER NOT NULL DEFAULT 0;
ALTER TABLE sale_items ADD COLUMN commission_percent REAL NOT NULL DEFAULT 0;
ALTER TABLE sale_items ADD COLUMN commission_amount INTEGER NOT NULL DEFAULT 0;
ALTER TABLE sale_items ADD COLUMN gross_profit INTEGER NOT NULL DEFAULT 0;
ALTER TABLE sale_items ADD COLUMN net_profit INTEGER NOT NULL DEFAULT 0;


-- شماره کارت مدیر به‌صورت رمزنگاری‌شده و جداگانه برای هر ماه
CREATE TABLE IF NOT EXISTS manager_cards (
  month TEXT PRIMARY KEY,
  card_cipher TEXT NOT NULL,
  cardholder_name TEXT,
  bank_name TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- وضعیت پرداخت کمیسیون ماهانه
CREATE TABLE IF NOT EXISTS commission_payouts (
  month TEXT PRIMARY KEY,
  amount INTEGER NOT NULL CHECK(amount>=0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid')),
  paid_at TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_sales_created_student ON sales(created_at,student_id);
CREATE INDEX IF NOT EXISTS idx_sale_items_sale ON sale_items(sale_id);
