-- Supabase SQL Schema for Graha Fitness Dashboard Lite
-- Copy & Run this script in Supabase SQL Editor

-- 1. Members Table
CREATE TABLE IF NOT EXISTS public.members (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT '-',
  plan VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expires DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'expiring', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id VARCHAR(50) REFERENCES public.members(id) ON DELETE CASCADE,
  member_name VARCHAR(255) NOT NULL,
  plan VARCHAR(50) NOT NULL,
  check_in_time VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Finances Table
CREATE TABLE IF NOT EXISTS public.finances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category VARCHAR(100) NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  note TEXT DEFAULT '-',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Inventory / Stock Table
CREATE TABLE IF NOT EXISTS public.stock (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  unit VARCHAR(20) NOT NULL DEFAULT 'pcs',
  price NUMERIC(15, 2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL CHECK (status IN ('safe', 'low', 'out')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) & Policies
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;

-- Allow Public/Anon Access (For Development & Demonstration)
CREATE POLICY "Public Read Members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Public Write Members" ON public.members FOR ALL USING (true);

CREATE POLICY "Public Read Attendance" ON public.attendance FOR SELECT USING (true);
CREATE POLICY "Public Write Attendance" ON public.attendance FOR ALL USING (true);

CREATE POLICY "Public Read Finances" ON public.finances FOR SELECT USING (true);
CREATE POLICY "Public Write Finances" ON public.finances FOR ALL USING (true);

CREATE POLICY "Public Read Stock" ON public.stock FOR SELECT USING (true);
CREATE POLICY "Public Write Stock" ON public.stock FOR ALL USING (true);

-- Seed Initial Data
INSERT INTO public.members (id, name, phone, plan, start_date, expires, status) VALUES
  ('GF-101', 'Budi Santoso', '081234567890', '3 Bulan', '2026-05-01', '2026-08-01', 'active'),
  ('GF-102', 'Siti Rahma', '081987654321', '1 Bulan', '2026-07-01', '2026-08-01', 'expiring'),
  ('GF-103', 'Andi Wijaya', '081122334455', '6 Bulan', '2026-03-15', '2026-09-15', 'active'),
  ('GF-104', 'Dewi Lestari', '085566778899', '1 Bulan', '2026-06-10', '2026-07-10', 'expired'),
  ('GF-105', 'Rian Pratama', '087788990011', '12 Bulan', '2026-01-01', '2027-01-01', 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.stock (id, name, category, quantity, unit, price, status) VALUES
  ('STK-01', 'Whey Protein Isolates 1kg', 'Suplemen', 8, 'pck', 450000, 'safe'),
  ('STK-02', 'Air Mineral 600ml', 'Minuman', 3, 'botol', 5000, 'low'),
  ('STK-03', 'Pre-Workout Shot', 'Suplemen', 0, 'botol', 25000, 'out'),
  ('STK-04', 'Creatine Monohydrate 300g', 'Suplemen', 12, 'pck', 280000, 'safe')
ON CONFLICT (id) DO NOTHING;
