-- Migration: Create numerology table for numerology numbers
-- Description: This table stores numerology numbers with their meanings, traits, and astrological associations
-- Created: 2025-10-08

-- Create numerology table
CREATE TABLE IF NOT EXISTS public.numerology (
    id BIGSERIAL PRIMARY KEY,
    number VARCHAR(20) NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    category_id BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_sold BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(number)
);

-- Create indexes for better query performance
CREATE INDEX idx_numerology_number ON public.numerology(number);
CREATE INDEX idx_numerology_category_id ON public.numerology(category_id);
CREATE INDEX idx_numerology_is_active ON public.numerology(is_active);
CREATE INDEX idx_numerology_is_sold ON public.numerology(is_sold);

-- Create composite indexes for common query patterns
CREATE INDEX idx_numerology_active_not_sold ON public.numerology(is_active, is_sold) WHERE is_active = true AND is_sold = false;

-- Add foreign key constraint for category_id (if categories table exists)
-- Uncomment the following line if you have a categories table
-- ALTER TABLE public.numerology ADD CONSTRAINT fk_numerology_category FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_numerology_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_numerology_updated_at
    BEFORE UPDATE ON public.numerology
    FOR EACH ROW
    EXECUTE FUNCTION public.update_numerology_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.numerology IS 'Stores numerology numbers';
COMMENT ON COLUMN public.numerology.id IS 'Primary key - auto-incrementing ID';
COMMENT ON COLUMN public.numerology.number IS 'Numerology number (phone numbers or any numeric sequence)';
COMMENT ON COLUMN public.numerology.price IS 'Price of the numerology number';
COMMENT ON COLUMN public.numerology.category_id IS 'Foreign key to categories table (optional)';
COMMENT ON COLUMN public.numerology.is_active IS 'Whether this entry is active and visible';
COMMENT ON COLUMN public.numerology.is_sold IS 'Whether this number has been sold';
COMMENT ON COLUMN public.numerology.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN public.numerology.updated_at IS 'Timestamp when the record was last updated';

-- Enable Row Level Security (RLS)
ALTER TABLE public.numerology ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Public read access for active entries
CREATE POLICY "Allow public read access for active numerology entries"
    ON public.numerology
    FOR SELECT
    USING (is_active = true AND is_sold = false);

-- Allow authenticated users full access (for admin operations)
CREATE POLICY "Allow authenticated users full access"
    ON public.numerology
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service role full access (bypass RLS)
CREATE POLICY "Allow service role full access"
    ON public.numerology
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow anon users to read only
CREATE POLICY "Allow anonymous read access"
    ON public.numerology
    FOR SELECT
    TO anon
    USING (is_active = true AND is_sold = false);

-- Insert sample numerology data (optional - remove if not needed)
-- INSERT INTO public.numerology (number, category_id, is_active, is_sold)
-- VALUES
--     ('9999900001', NULL, true, false),
--     ('9876543210', NULL, true, false),
--     ('1234567890', NULL, true, false);
