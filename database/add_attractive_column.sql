-- Add is_attractive column to phone_numbers table
-- This script adds the new "Attractive" status option to phone numbers

-- Add the column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers'
    AND column_name = 'is_attractive'
  ) THEN
    -- Add the column with default value false
    ALTER TABLE phone_numbers ADD COLUMN is_attractive BOOLEAN DEFAULT FALSE;

    -- Create index for better performance
    CREATE INDEX idx_phone_numbers_attractive ON phone_numbers(is_attractive);

    RAISE NOTICE 'Added is_attractive column to phone_numbers table';
  ELSE
    RAISE NOTICE 'is_attractive column already exists in phone_numbers table';
  END IF;
END
$$;