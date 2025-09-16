-- COMPLETE FIX FOR INSTAGRAM URL ACCESS - RUN THIS ENTIRE SCRIPT

-- Step 1: Ensure instagram_url column exists
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS instagram_url TEXT;

-- Step 2: Drop existing conflicting policies
DROP POLICY IF EXISTS "Public can read Instagram URL via function" ON admin_users;
DROP POLICY IF EXISTS "Admin users can view their own data" ON admin_users;
DROP POLICY IF EXISTS "Admin users can insert their own data" ON admin_users;
DROP POLICY IF EXISTS "Admin users can update their own Instagram URL" ON admin_users;

-- Step 3: Create new simplified policies
CREATE POLICY "Anyone can read admin users" ON admin_users FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update admin users" ON admin_users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Authenticated users can insert admin users" ON admin_users FOR INSERT WITH CHECK (auth.uid() = id);

-- Step 4: Create the public function
CREATE OR REPLACE FUNCTION get_public_instagram_url()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    instagram_url_result TEXT;
BEGIN
    SELECT instagram_url INTO instagram_url_result
    FROM admin_users
    WHERE instagram_url IS NOT NULL
    AND instagram_url != ''
    LIMIT 1;

    RETURN instagram_url_result;
END;
$$;

-- Step 5: Grant all necessary permissions
GRANT EXECUTE ON FUNCTION get_public_instagram_url() TO anon;
GRANT EXECUTE ON FUNCTION get_public_instagram_url() TO authenticated;
GRANT EXECUTE ON FUNCTION get_public_instagram_url() TO public;
GRANT SELECT ON admin_users TO anon;
GRANT SELECT ON admin_users TO authenticated;

-- Step 6: Refresh RLS
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;