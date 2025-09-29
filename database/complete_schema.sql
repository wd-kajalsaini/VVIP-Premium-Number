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
  display_number VARCHAR(25), -- Formatted display like "98 777777 29"
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2), -- For showing discounts

  -- Sum total calculations
  sum_total_1 INTEGER, -- First sum
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
  display_number VARCHAR(25), -- Formatted display
  state VARCHAR(100) NOT NULL,
  rto_code VARCHAR(10),
  series VARCHAR(20),
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),

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
  denomination INTEGER NOT NULL, -- 10, 20, 50, 100, 500, 2000
  currency_type VARCHAR(20) DEFAULT 'INR', -- INR, USD, etc.
  year INTEGER,
  governor_signature VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),

  -- Categories and status
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  note_condition VARCHAR(50), -- UNC, VF, F, etc.

  -- Special flags
  is_rare BOOLEAN DEFAULT false,
  is_today_offer BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_sold BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  -- Patterns
  pattern_type VARCHAR(100), -- Solid, Ladder, Radar, etc.
  fancy_number_type VARCHAR(100),

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

CREATE INDEX idx_currency_serial ON currency_numbers(serial_number);
CREATE INDEX idx_currency_denomination ON currency_numbers(denomination);
CREATE INDEX idx_currency_year ON currency_numbers(year);
CREATE INDEX idx_currency_price ON currency_numbers(price);
CREATE INDEX idx_currency_rare ON currency_numbers(is_rare);
CREATE INDEX idx_currency_today_offer ON currency_numbers(is_today_offer);
CREATE INDEX idx_currency_active ON currency_numbers(is_active);

-- =====================================================
-- NUMEROLOGY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS numerology (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,
  planet VARCHAR(50),
  zodiac_sign VARCHAR(50),
  lucky_color VARCHAR(100),
  lucky_day VARCHAR(50),
  lucky_gemstone VARCHAR(100),
  positive_traits TEXT,
  negative_traits TEXT,
  career_suitable TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_numerology_number ON numerology(number);
CREATE INDEX idx_numerology_active ON numerology(is_active);

-- =====================================================
-- INQUIRIES TABLE (Track customer inquiries)
-- =====================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('phone', 'car', 'currency')),
  item_id BIGINT NOT NULL,
  customer_name VARCHAR(100),
  customer_phone VARCHAR(20),
  customer_email VARCHAR(100),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, contacted, converted, cancelled
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_inquiries_type ON inquiries(item_type);
CREATE INDEX idx_inquiries_item ON inquiries(item_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_date ON inquiries(created_at);

-- =====================================================
-- ADMIN ACTIVITY LOG
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id),
  action VARCHAR(50) NOT NULL, -- create, update, delete, login, logout
  entity_type VARCHAR(50), -- phone_number, car_number, etc.
  entity_id BIGINT,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_admin ON admin_activity_log(admin_id);
CREATE INDEX idx_activity_action ON admin_activity_log(action);
CREATE INDEX idx_activity_entity ON admin_activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_date ON admin_activity_log(created_at);

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

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
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
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Admin full access to inquiries" ON inquiries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin can view activity log" ON admin_activity_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Insert default categories
INSERT INTO categories (name, slug, type, description, display_order, icon) VALUES
  ('VIP Numbers', 'vip-numbers', 'phone', 'Exclusive VIP phone numbers', 1, 'FaStar'),
  ('Fancy Numbers', 'fancy-numbers', 'phone', 'Fancy and attractive phone numbers', 2, 'FaGem'),
  ('Tetra Numbers', 'tetra-numbers', 'phone', 'Numbers with four repeating digits', 3, 'Fa4'),
  ('Penta Numbers', 'penta-numbers', 'phone', 'Numbers with five repeating digits', 4, 'Fa5'),
  ('Hexa Numbers', 'hexa-numbers', 'phone', 'Numbers with six repeating digits', 5, 'Fa6'),
  ('Premium Car Numbers', 'premium-car', 'car', 'Premium vehicle registration numbers', 6, 'FaCar'),
  ('VIP Car Numbers', 'vip-car', 'car', 'VIP vehicle registration numbers', 7, 'FaCar'),
  ('Fancy Currency', 'fancy-currency', 'currency', 'Collectible currency notes', 8, 'FaMoneyBill'),
  ('Rare Notes', 'rare-notes', 'currency', 'Rare and valuable currency notes', 9, 'FaCoins')
ON CONFLICT DO NOTHING;

-- Insert sample numerology data
INSERT INTO numerology (number, planet, zodiac_sign, lucky_color, lucky_day, lucky_gemstone, positive_traits, negative_traits, career_suitable, description) VALUES
  (1, 'Sun', 'Leo', 'Gold, Orange', 'Sunday', 'Ruby', 'Leadership, Innovation, Independence', 'Arrogance, Selfishness', 'CEO, Entrepreneur, Politician', 'Number 1 represents new beginnings and leadership'),
  (2, 'Moon', 'Cancer', 'White, Silver', 'Monday', 'Pearl', 'Cooperation, Sensitivity, Balance', 'Indecisiveness, Over-sensitivity', 'Counselor, Diplomat, Teacher', 'Number 2 symbolizes partnership and harmony'),
  (3, 'Jupiter', 'Sagittarius', 'Yellow, Purple', 'Thursday', 'Yellow Sapphire', 'Creativity, Communication, Optimism', 'Scattered energy, Superficiality', 'Artist, Writer, Marketing', 'Number 3 represents creativity and self-expression'),
  (4, 'Rahu', 'Aquarius', 'Blue, Grey', 'Saturday', 'Hessonite', 'Stability, Hard work, Practicality', 'Stubbornness, Rigidity', 'Engineer, Architect, Manager', 'Number 4 symbolizes stability and hard work'),
  (5, 'Mercury', 'Gemini, Virgo', 'Green', 'Wednesday', 'Emerald', 'Freedom, Adventure, Versatility', 'Restlessness, Impulsiveness', 'Sales, Travel, Media', 'Number 5 represents freedom and adventure'),
  (6, 'Venus', 'Taurus, Libra', 'Pink, Blue', 'Friday', 'Diamond', 'Nurturing, Responsibility, Harmony', 'Over-protective, Worry', 'Healthcare, Hospitality, Arts', 'Number 6 symbolizes love and responsibility'),
  (7, 'Ketu', 'Pisces', 'Violet, Purple', 'Monday', 'Cat''s Eye', 'Spirituality, Analysis, Wisdom', 'Isolation, Cynicism', 'Research, Philosophy, Science', 'Number 7 represents spirituality and introspection'),
  (8, 'Saturn', 'Capricorn', 'Black, Dark Blue', 'Saturday', 'Blue Sapphire', 'Ambition, Organization, Authority', 'Materialism, Workaholism', 'Business, Finance, Law', 'Number 8 symbolizes material success and power'),
  (9, 'Mars', 'Aries, Scorpio', 'Red, Maroon', 'Tuesday', 'Coral', 'Compassion, Humanitarianism, Wisdom', 'Impulsiveness, Moodiness', 'Social work, Teaching, Healing', 'Number 9 represents universal love and completion')
ON CONFLICT DO NOTHING;