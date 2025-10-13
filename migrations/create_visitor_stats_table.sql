-- Create visitor_stats table for tracking website visitors
-- This table stores a single row with the total visitor count

-- Drop table if it exists (for clean re-runs)
DROP TABLE IF EXISTS public.visitor_stats CASCADE;

-- Create the visitor_stats table
CREATE TABLE public.visitor_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    total_visits BIGINT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Ensure only one row exists (id = 1)
    CONSTRAINT visitor_stats_single_row CHECK (id = 1)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_visitor_stats_last_updated ON public.visitor_stats(last_updated);

-- Insert initial record with starting count
INSERT INTO public.visitor_stats (id, total_visits, last_updated, created_at)
VALUES (1, 0, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow everyone to read visitor stats
CREATE POLICY "Allow public read access to visitor stats"
    ON public.visitor_stats
    FOR SELECT
    USING (true);

-- Allow service role to insert/update/delete (for admin operations)
CREATE POLICY "Allow service role full access to visitor stats"
    ON public.visitor_stats
    FOR ALL
    USING (true);

-- Allow authenticated users to update (for visitor counting)
CREATE POLICY "Allow public update access to visitor stats"
    ON public.visitor_stats
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON public.visitor_stats TO anon, authenticated;
GRANT UPDATE ON public.visitor_stats TO anon, authenticated;
GRANT ALL ON public.visitor_stats TO service_role;

-- Add comment to table
COMMENT ON TABLE public.visitor_stats IS 'Stores website visitor count statistics';
COMMENT ON COLUMN public.visitor_stats.id IS 'Fixed ID (always 1) to ensure single row';
COMMENT ON COLUMN public.visitor_stats.total_visits IS 'Total number of unique visits to the website';
COMMENT ON COLUMN public.visitor_stats.last_updated IS 'Timestamp of last visitor count update';
COMMENT ON COLUMN public.visitor_stats.created_at IS 'Timestamp when the record was created';
