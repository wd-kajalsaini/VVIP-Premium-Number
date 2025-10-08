-- Rollback Migration: Drop currency_numbers table
-- Description: This script will remove the currency_numbers table and all associated objects
-- Warning: This will permanently delete all data in the currency_numbers table
-- Created: 2025-10-08

-- Drop RLS policies
DROP POLICY IF EXISTS "Allow public read access for active currency numbers" ON public.currency_numbers;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.currency_numbers;
DROP POLICY IF EXISTS "Allow service role full access" ON public.currency_numbers;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.currency_numbers;

-- Disable Row Level Security
ALTER TABLE IF EXISTS public.currency_numbers DISABLE ROW LEVEL SECURITY;

-- Drop trigger
DROP TRIGGER IF EXISTS trigger_update_currency_numbers_updated_at ON public.currency_numbers;

-- Drop function
DROP FUNCTION IF EXISTS public.update_currency_numbers_updated_at();

-- Drop indexes (they will be dropped automatically with the table, but listing for clarity)
DROP INDEX IF EXISTS public.idx_currency_numbers_serial_number;
DROP INDEX IF EXISTS public.idx_currency_numbers_category_id;
DROP INDEX IF EXISTS public.idx_currency_numbers_is_today_offer;
DROP INDEX IF EXISTS public.idx_currency_numbers_is_featured;
DROP INDEX IF EXISTS public.idx_currency_numbers_is_active;
DROP INDEX IF EXISTS public.idx_currency_numbers_is_sold;
DROP INDEX IF EXISTS public.idx_currency_numbers_created_at;
DROP INDEX IF EXISTS public.idx_currency_numbers_active_not_sold;
DROP INDEX IF EXISTS public.idx_currency_numbers_today_offer_active;
DROP INDEX IF EXISTS public.idx_currency_numbers_featured_active;

-- Drop the table
DROP TABLE IF EXISTS public.currency_numbers;
