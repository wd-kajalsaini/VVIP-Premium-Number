-- Complete Database Schema for Premium Numbers System
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('phone', 'car', 'currency', 'fancy')),
  description TEXT,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  parent_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_type ON categories(type);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_order ON categories(display_order);

-- =====================================================
-- PHONE NUMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS phone_numbers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  number VARCHAR(20) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,

  -- Sum total calculations
  sum_total_2 INTEGER, -- Second sum
  sum_total_3 INTEGER, -- Third sum

  -- Highlights (positions of special digits)
  highlights INTEGER[], -- Array of positions to highlight

  -- Categories and status
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  operator VARCHAR(50), -- Jio, Airtel, VI, BSNL
  circle VARCHAR(100), -- Delhi, Mumbai, etc.

  -- Special flags
  is_vvip BOOLEAN DEFAULT false,
  is_today_offer BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_sold BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  -- Additional info
  description TEXT,
  tags TEXT[], -- Array of tags for search
  view_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,

  -- Photos
  primary_image TEXT,
  gallery_images TEXT[], -- Array of image URLs

  -- Numerology
  numerology_number INTEGER,
  numerology_meaning TEXT,

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_phone_numbers_number ON phone_numbers(number);
CREATE INDEX idx_phone_numbers_price ON phone_numbers(price);
CREATE INDEX idx_phone_numbers_vvip ON phone_numbers(is_vvip);
CREATE INDEX idx_phone_numbers_today_offer ON phone_numbers(is_today_offer);
CREATE INDEX idx_phone_numbers_featured ON phone_numbers(is_featured);
CREATE INDEX idx_phone_numbers_active ON phone_numbers(is_active);
CREATE INDEX idx_phone_numbers_category ON phone_numbers(category_id);
CREATE INDEX idx_phone_numbers_operator ON phone_numbers(operator);
CREATE INDEX idx_phone_numbers_tags ON phone_numbers USING GIN(tags);

-- =====================================================
-- CAR NUMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS car_numbers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  number VARCHAR(20) NOT NULL UNIQUE,
  state VARCHAR(100) NOT NULL,
  rto_code VARCHAR(10),
  series VARCHAR(20),
  price DECIMAL(10, 2) NOT NULL,

  -- Categories and status
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  vehicle_type VARCHAR(50), -- Car, Bike, Commercial

  -- Special flags
  is_vip BOOLEAN DEFAULT false,
  is_today_offer BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_sold BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  -- Additional info
  description TEXT,
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,

  -- Photos
  primary_image TEXT,
  gallery_images TEXT[],

  -- Numerology
  numerology_number INTEGER,
  numerology_meaning TEXT,
  sum_total INTEGER,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_car_numbers_number ON car_numbers(number);
CREATE INDEX idx_car_numbers_state ON car_numbers(state);
CREATE INDEX idx_car_numbers_rto ON car_numbers(rto_code);
CREATE INDEX idx_car_numbers_price ON car_numbers(price);
CREATE INDEX idx_car_numbers_vip ON car_numbers(is_vip);
CREATE INDEX idx_car_numbers_today_offer ON car_numbers(is_today_offer);
CREATE INDEX idx_car_numbers_active ON car_numbers(is_active);

-- =====================================================
-- CURRENCY NUMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS currency_numbers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  serial_number VARCHAR(50) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,

  -- Categories and status
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  -- Additional info
  description TEXT,
  -- Photos
  primary_image TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_currency_serial ON currency_numbers(serial_number);
CREATE INDEX idx_currency_price ON currency_numbers(price);
      
-- =====================================================
-- NUMEROLOGY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS numerology (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_numerology_number ON numerology(number);
CREATE INDEX idx_numerology_active ON numerology(is_active);


-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamps
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_phone_numbers_updated_at BEFORE UPDATE ON phone_numbers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_car_numbers_updated_at BEFORE UPDATE ON car_numbers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_currency_numbers_updated_at BEFORE UPDATE ON currency_numbers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_numerology_updated_at BEFORE UPDATE ON numerology
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE currency_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE numerology ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active phone numbers" ON phone_numbers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active car numbers" ON car_numbers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active currency numbers" ON currency_numbers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active numerology" ON numerology
  FOR SELECT USING (is_active = true);

-- Admin full access policies
CREATE POLICY "Admin full access to categories" ON categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin full access to phone numbers" ON phone_numbers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin full access to car numbers" ON car_numbers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin full access to currency numbers" ON currency_numbers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin full access to numerology" ON numerology
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

