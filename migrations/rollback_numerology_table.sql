-- Rollback Migration: Drop numerology table
-- Description: This script will remove the numerology table and all associated objects
-- Warning: This will permanently delete all data in the numerology table
-- Created: 2025-10-08

-- Drop RLS policies
DROP POLICY IF EXISTS "Allow public read access for active numerology entries" ON public.numerology;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.numerology;
DROP POLICY IF EXISTS "Allow service role full access" ON public.numerology;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.numerology;

-- Disable Row Level Security
ALTER TABLE IF EXISTS public.numerology DISABLE ROW LEVEL SECURITY;

-- Drop trigger
DROP TRIGGER IF EXISTS trigger_update_numerology_updated_at ON public.numerology;

-- Drop function
DROP FUNCTION IF EXISTS public.update_numerology_updated_at();

-- Drop indexes (they will be dropped automatically with the table, but listing for clarity)
DROP INDEX IF EXISTS public.idx_numerology_number;
DROP INDEX IF EXISTS public.idx_numerology_category_id;
DROP INDEX IF EXISTS public.idx_numerology_is_active;
DROP INDEX IF EXISTS public.idx_numerology_is_sold;
DROP INDEX IF EXISTS public.idx_numerology_active_not_sold;

-- Drop the table
DROP TABLE IF EXISTS public.numerology;
