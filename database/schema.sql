-- Enable Row Level Security
ALTER DATABASE postgres SET timezone TO 'UTC';

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phone numbers table
CREATE TABLE IF NOT EXISTS phone_numbers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table (using Supabase Auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_phone_numbers_updated_at
  BEFORE UPDATE ON phone_numbers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users policies
CREATE POLICY "Admin users can view their own data" ON admin_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin users can insert their own data" ON admin_users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories policies (only admin users can access)
CREATE POLICY "Admin users can view all categories" ON categories
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can insert categories" ON categories
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can update categories" ON categories
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can delete categories" ON categories
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Phone numbers policies (only admin users can access)
CREATE POLICY "Admin users can view all phone numbers" ON phone_numbers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can insert phone numbers" ON phone_numbers
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can update phone numbers" ON phone_numbers
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can delete phone numbers" ON phone_numbers
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Public policies for frontend to read data
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view phone numbers" ON phone_numbers
  FOR SELECT USING (true);

-- Insert some sample categories
INSERT INTO categories (name) VALUES
  ('VIP Numbers'),
  ('Lucky Numbers'),
  ('Business Numbers'),
  ('Premium Collection'),
  ('Special Series')
ON CONFLICT (name) DO NOTHING;

-- Insert some sample phone numbers
INSERT INTO phone_numbers (phone_number, price, category_id, is_premium)
SELECT
  phone_number,
  price::DECIMAL(10,2),
  category_id,
  is_premium
FROM (
  VALUES
    ('9999999999', 50000.00, 1, true),
    ('8888888888', 45000.00, 1, true),
    ('7777777777', 40000.00, 1, true),
    ('9876543210', 15000.00, 2, false),
    ('1234567890', 10000.00, 3, false),
    ('9988776655', 25000.00, 4, true),
    ('1111111111', 60000.00, 5, true)
) AS data(phone_number, price, category_id, is_premium)
WHERE EXISTS (SELECT 1 FROM categories WHERE id = data.category_id)
ON CONFLICT (phone_number) DO NOTHING;