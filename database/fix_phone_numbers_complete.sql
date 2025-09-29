-- Complete fix for phone numbers display issue
-- This handles schema differences and RLS policy conflicts

-- =====================================================
-- STEP 1: Fix RLS Policies for phone_numbers
-- =====================================================

-- Drop all existing conflicting policies
DROP POLICY IF EXISTS "Admin users can view all phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can insert phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can update phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can delete phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Anyone can view phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Public can view active phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin full access to phone numbers" ON phone_numbers;

-- Create simple, permissive policies that work for admin interface
CREATE POLICY "Enable all access for phone_numbers" ON phone_numbers FOR ALL USING (true);

-- =====================================================
-- STEP 2: Ensure required columns exist
-- =====================================================

-- Add missing columns if they don't exist (with safe checks)
DO $$
BEGIN
  -- Add is_active column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
  END IF;

  -- Add is_sold column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'is_sold'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN is_sold BOOLEAN DEFAULT FALSE;
  END IF;

  -- Add is_vvip column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'is_vvip'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN is_vvip BOOLEAN DEFAULT FALSE;
  END IF;

  -- Add is_today_offer column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'is_today_offer'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN is_today_offer BOOLEAN DEFAULT FALSE;
  END IF;

  -- Add is_featured column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
  END IF;

  -- Add is_attractive column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'is_attractive'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN is_attractive BOOLEAN DEFAULT FALSE;
  END IF;

  -- Rename phone_number column to number if needed
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'phone_number'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'number'
  ) THEN
    ALTER TABLE phone_numbers RENAME COLUMN phone_number TO number;
  END IF;

  -- Add view_count column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'view_count'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN view_count INTEGER DEFAULT 0;
  END IF;

  -- Add inquiry_count column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'inquiry_count'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN inquiry_count INTEGER DEFAULT 0;
  END IF;

  -- Add display_number column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers' AND column_name = 'display_number'
  ) THEN
    ALTER TABLE phone_numbers ADD COLUMN display_number VARCHAR(25);
  END IF;

  RAISE NOTICE 'Phone numbers table structure updated successfully';
END
$$;

-- =====================================================
-- STEP 3: Update existing data to have proper defaults
-- =====================================================

-- Ensure all existing records have proper boolean values
UPDATE phone_numbers SET
  is_active = COALESCE(is_active, TRUE),
  is_sold = COALESCE(is_sold, FALSE),
  is_vvip = COALESCE(is_vvip, FALSE),
  is_today_offer = COALESCE(is_today_offer, FALSE),
  is_featured = COALESCE(is_featured, FALSE),
  is_attractive = COALESCE(is_attractive, FALSE),
  view_count = COALESCE(view_count, 0),
  inquiry_count = COALESCE(inquiry_count, 0)
WHERE id IS NOT NULL;