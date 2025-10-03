-- Add display_number column to phone_numbers table
-- This script adds the display_number field for formatted phone number display

-- Add the column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_numbers'
    AND column_name = 'display_number'
  ) THEN
    -- Add the column
    ALTER TABLE phone_numbers ADD COLUMN display_number VARCHAR(25);

    RAISE NOTICE 'Added display_number column to phone_numbers table';
  ELSE
    RAISE NOTICE 'display_number column already exists in phone_numbers table';
  END IF;
END
$$;
