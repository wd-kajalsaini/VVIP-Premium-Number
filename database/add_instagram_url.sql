-- Add Instagram URL column to admin_users table
ALTER TABLE admin_users
ADD COLUMN IF NOT EXISTS instagram_url TEXT;

-- Add comment to describe the column
COMMENT ON COLUMN admin_users.instagram_url IS 'Instagram profile URL for gallery integration';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_instagram_url ON admin_users(instagram_url);

-- Add constraint to ensure only one non-null Instagram URL exists
CREATE OR REPLACE FUNCTION check_single_instagram_url()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting a new Instagram URL, clear all other Instagram URLs
  IF NEW.instagram_url IS NOT NULL AND NEW.instagram_url != '' THEN
    UPDATE admin_users
    SET instagram_url = NULL
    WHERE id != NEW.id AND instagram_url IS NOT NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce single Instagram URL
DROP TRIGGER IF EXISTS enforce_single_instagram_url ON admin_users;
CREATE TRIGGER enforce_single_instagram_url
  BEFORE INSERT OR UPDATE ON admin_users
  FOR EACH ROW
  WHEN (NEW.instagram_url IS NOT NULL AND NEW.instagram_url != '')
  EXECUTE FUNCTION check_single_instagram_url();

-- Add RLS policy for Instagram URL updates
CREATE POLICY "Admin users can update their own Instagram URL" ON admin_users
  FOR UPDATE USING (auth.uid() = id);