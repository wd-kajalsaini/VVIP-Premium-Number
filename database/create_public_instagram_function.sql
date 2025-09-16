-- Create a public function to get Instagram URL
-- This bypasses RLS and allows public access to just the Instagram URL

CREATE OR REPLACE FUNCTION get_public_instagram_url()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER -- This runs with the privileges of the function owner
AS $$
DECLARE
    instagram_url_result TEXT;
BEGIN
    -- Get the first non-null, non-empty Instagram URL
    SELECT instagram_url INTO instagram_url_result
    FROM admin_users
    WHERE instagram_url IS NOT NULL
    AND instagram_url != ''
    LIMIT 1;

    RETURN instagram_url_result;
END;
$$;

-- Grant execute permission to anonymous users (public access)
GRANT EXECUTE ON FUNCTION get_public_instagram_url() TO anon;
GRANT EXECUTE ON FUNCTION get_public_instagram_url() TO authenticated;