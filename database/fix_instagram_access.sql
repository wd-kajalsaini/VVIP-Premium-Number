-- Step 1: Create the public function to get Instagram URL
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

-- Step 2: Grant permissions to all users
GRANT EXECUTE ON FUNCTION get_public_instagram_url() TO anon;
GRANT EXECUTE ON FUNCTION get_public_instagram_url() TO authenticated;
GRANT EXECUTE ON FUNCTION get_public_instagram_url() TO public;

-- Step 3: Add a simplified RLS policy for public reads (only for Instagram URL)
CREATE POLICY "Public can read Instagram URL via function" ON admin_users
  FOR SELECT USING (true);

-- Step 4: Ensure the instagram_url column exists
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS instagram_url TEXT;