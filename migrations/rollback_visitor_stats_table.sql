-- Rollback script for visitor_stats table
-- ⚠️ WARNING: This will permanently delete all visitor statistics data!

-- Drop all policies first
DROP POLICY IF EXISTS "Allow public read access to visitor stats" ON public.visitor_stats;
DROP POLICY IF EXISTS "Allow service role full access to visitor stats" ON public.visitor_stats;
DROP POLICY IF EXISTS "Allow public update access to visitor stats" ON public.visitor_stats;

-- Drop the table and all dependent objects
DROP TABLE IF EXISTS public.visitor_stats CASCADE;

-- Verify table is dropped
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'visitor_stats') THEN
        RAISE NOTICE 'visitor_stats table has been successfully dropped';
    ELSE
        RAISE EXCEPTION 'Failed to drop visitor_stats table';
    END IF;
END $$;
