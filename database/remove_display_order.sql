-- Remove display_order column from categories table
-- This script safely removes the display_order column that is no longer needed

-- First check if the column exists before trying to drop it
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories'
    AND column_name = 'display_order'
  ) THEN
    -- Drop the index first if it exists
    DROP INDEX IF EXISTS idx_categories_order;

    -- Drop the column
    ALTER TABLE categories DROP COLUMN display_order;

    RAISE NOTICE 'display_order column removed from categories table';
  ELSE
    RAISE NOTICE 'display_order column does not exist in categories table';
  END IF;
END
$$;