-- Supabase Database Schema for Graha Fitness Dashboard Lite
-- Exactly matching original SQLite schema columns & tables

-- 1. Members Table
CREATE TABLE IF NOT EXISTS public.members (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  plan VARCHAR(255),
  start_date VARCHAR(255),
  end_date VARCHAR(255),
  status VARCHAR(255),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- 2. Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
  id VARCHAR(255) PRIMARY KEY,
  member_id VARCHAR(255) REFERENCES public.members(id) ON DELETE CASCADE,
  date VARCHAR(255),
  time VARCHAR(255),
  type VARCHAR(255)
);

-- 3. Stock Items Table
CREATE TABLE IF NOT EXISTS public.stock_items (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  unit VARCHAR(255),
  quantity INTEGER DEFAULT 0,
  min_threshold INTEGER DEFAULT 0
);

-- 4. Stock Movements Table
CREATE TABLE IF NOT EXISTS public.stock_movements (
  id VARCHAR(255) PRIMARY KEY,
  item_id VARCHAR(255) REFERENCES public.stock_items(id) ON DELETE CASCADE,
  type VARCHAR(255),
  quantity INTEGER DEFAULT 0,
  date VARCHAR(255),
  note TEXT
);

-- 5. Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions (
  id VARCHAR(255) PRIMARY KEY,
  type VARCHAR(255),
  date VARCHAR(255),
  category VARCHAR(255),
  amount BIGINT DEFAULT 0,
  member_id VARCHAR(255),
  note TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  item_id TEXT
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow write members" ON public.members FOR ALL USING (true);

CREATE POLICY "Allow read attendance" ON public.attendance FOR SELECT USING (true);
CREATE POLICY "Allow write attendance" ON public.attendance FOR ALL USING (true);

CREATE POLICY "Allow read stock_items" ON public.stock_items FOR SELECT USING (true);
CREATE POLICY "Allow write stock_items" ON public.stock_items FOR ALL USING (true);

CREATE POLICY "Allow read stock_movements" ON public.stock_movements FOR SELECT USING (true);
CREATE POLICY "Allow write stock_movements" ON public.stock_movements FOR ALL USING (true);

CREATE POLICY "Allow read transactions" ON public.transactions FOR SELECT USING (true);
CREATE POLICY "Allow write transactions" ON public.transactions FOR ALL USING (true);
