-- Fix categories RLS policies conflict
-- Drop old conflicting policies

DROP POLICY IF EXISTS "Admin users can view all categories" ON categories;
DROP POLICY IF EXISTS "Admin users can insert categories" ON categories;
DROP POLICY IF EXISTS "Admin users can update categories" ON categories;
DROP POLICY IF EXISTS "Admin users can delete categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;

-- Recreate with correct policies from complete_schema.sql
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin full access to categories" ON categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );