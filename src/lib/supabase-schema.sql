-- ==========================================
-- SQL Schema for Tao Manullang & Partners
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL DEFAULT 'LITIGATION',
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Admin Team',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for news
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Public can read all news
CREATE POLICY "Anyone can read news"
  ON news FOR SELECT
  USING (true);

-- Only authenticated users can manage news (insert, update, delete)
CREATE POLICY "Authenticated users can insert news"
  ON news FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update news"
  ON news FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete news"
  ON news FOR DELETE
  USING (auth.role() = 'authenticated');


-- 2. Create lawyers table
CREATE TABLE IF NOT EXISTS lawyers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  short_desc TEXT NOT NULL,
  italic_desc TEXT NOT NULL,
  biography TEXT,
  email TEXT,
  instagram TEXT,
  education TEXT[],
  experience TEXT[],
  skills TEXT[],
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for lawyers
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;

-- Public can read all lawyers
CREATE POLICY "Anyone can read lawyers"
  ON lawyers FOR SELECT
  USING (true);

-- Only authenticated users can manage lawyers
CREATE POLICY "Authenticated users can manage lawyers"
  ON lawyers FOR ALL
  USING (auth.role() = 'authenticated');
