-- Comprehensive fix for all RLS policy conflicts
-- This script resolves conflicts between old schema.sql and complete_schema.sql

-- =====================================================
-- FIX CATEGORIES TABLE POLICIES
-- =====================================================

-- Drop old conflicting policies for categories
DROP POLICY IF EXISTS "Admin users can view all categories" ON categories;
DROP POLICY IF EXISTS "Admin users can insert categories" ON categories;
DROP POLICY IF EXISTS "Admin users can update categories" ON categories;
DROP POLICY IF EXISTS "Admin users can delete categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;

-- Recreate correct categories policies
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin full access to categories" ON categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- =====================================================
-- FIX PHONE NUMBERS TABLE POLICIES
-- =====================================================

-- Drop old conflicting policies for phone_numbers
DROP POLICY IF EXISTS "Admin users can view all phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can insert phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can update phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can delete phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Anyone can view phone numbers" ON phone_numbers;

-- Recreate correct phone_numbers policies
CREATE POLICY "Public can view active phone numbers" ON phone_numbers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin full access to phone numbers" ON phone_numbers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- =====================================================
-- ENSURE ADMIN POLICIES FOR OTHER TABLES
-- =====================================================

-- Car numbers policies (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'car_numbers') THEN
    DROP POLICY IF EXISTS "Admin full access to car numbers" ON car_numbers;
    CREATE POLICY "Admin full access to car numbers" ON car_numbers
      FOR ALL USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
      );

    DROP POLICY IF EXISTS "Public can view active car numbers" ON car_numbers;
    CREATE POLICY "Public can view active car numbers" ON car_numbers
      FOR SELECT USING (is_active = true);
  END IF;
END
$$;

-- Currency numbers policies (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'currency_numbers') THEN
    DROP POLICY IF EXISTS "Admin full access to currency numbers" ON currency_numbers;
    CREATE POLICY "Admin full access to currency numbers" ON currency_numbers
      FOR ALL USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
      );

    DROP POLICY IF EXISTS "Public can view active currency numbers" ON currency_numbers;
    CREATE POLICY "Public can view active currency numbers" ON currency_numbers
      FOR SELECT USING (is_active = true);
  END IF;
END
$$;

-- Numerology policies (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'numerology') THEN
    DROP POLICY IF EXISTS "Admin full access to numerology" ON numerology;
    CREATE POLICY "Admin full access to numerology" ON numerology
      FOR ALL USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
      );

    DROP POLICY IF EXISTS "Public can view active numerology" ON numerology;
    CREATE POLICY "Public can view active numerology" ON numerology
      FOR SELECT USING (is_active = true);
  END IF;
END
$$;