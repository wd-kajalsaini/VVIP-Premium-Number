-- Fix phone_numbers RLS policies conflict
-- Drop old conflicting policies

DROP POLICY IF EXISTS "Admin users can view all phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can insert phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can update phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Admin users can delete phone numbers" ON phone_numbers;
DROP POLICY IF EXISTS "Anyone can view phone numbers" ON phone_numbers;

-- Recreate with correct policies from complete_schema.sql
CREATE POLICY "Public can view active phone numbers" ON phone_numbers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin full access to phone numbers" ON phone_numbers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );