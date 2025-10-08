-- Migration: Create currency_numbers table for currency/serial numbers
-- Description: This table stores currency serial numbers with pricing and status information
-- Created: 2025-10-08

-- Create currency_numbers table
CREATE TABLE IF NOT EXISTS public.currency_numbers (
    id BIGSERIAL PRIMARY KEY,
    serial_number VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    category_id BIGINT,
    primary_image TEXT,
    is_today_offer BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_sold BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(serial_number)
);

-- Create indexes for better query performance
CREATE INDEX idx_currency_numbers_serial_number ON public.currency_numbers(serial_number);
CREATE INDEX idx_currency_numbers_category_id ON public.currency_numbers(category_id);
CREATE INDEX idx_currency_numbers_is_today_offer ON public.currency_numbers(is_today_offer);
CREATE INDEX idx_currency_numbers_is_featured ON public.currency_numbers(is_featured);
CREATE INDEX idx_currency_numbers_is_active ON public.currency_numbers(is_active);
CREATE INDEX idx_currency_numbers_is_sold ON public.currency_numbers(is_sold);
CREATE INDEX idx_currency_numbers_created_at ON public.currency_numbers(created_at DESC);

-- Create composite indexes for common query patterns
CREATE INDEX idx_currency_numbers_active_not_sold ON public.currency_numbers(is_active, is_sold) WHERE is_active = true AND is_sold = false;
CREATE INDEX idx_currency_numbers_today_offer_active ON public.currency_numbers(is_today_offer, is_active) WHERE is_today_offer = true AND is_active = true;
CREATE INDEX idx_currency_numbers_featured_active ON public.currency_numbers(is_featured, is_active) WHERE is_featured = true AND is_active = true;

-- Add foreign key constraint for category_id (if categories table exists)
-- Uncomment the following line if you have a categories table
-- ALTER TABLE public.currency_numbers ADD CONSTRAINT fk_currency_numbers_category FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_currency_numbers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_currency_numbers_updated_at
    BEFORE UPDATE ON public.currency_numbers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_currency_numbers_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.currency_numbers IS 'Stores currency serial numbers for sale';
COMMENT ON COLUMN public.currency_numbers.id IS 'Primary key - auto-incrementing ID';
COMMENT ON COLUMN public.currency_numbers.serial_number IS 'Currency serial number (e.g., 123456, AB1234CD)';
COMMENT ON COLUMN public.currency_numbers.price IS 'Price of the currency note';
COMMENT ON COLUMN public.currency_numbers.category_id IS 'Foreign key to categories table (optional)';
COMMENT ON COLUMN public.currency_numbers.primary_image IS 'URL to the primary image of the currency note';
COMMENT ON COLUMN public.currency_numbers.is_today_offer IS 'Whether this is featured in today''s offers';
COMMENT ON COLUMN public.currency_numbers.is_featured IS 'Whether this is a featured currency note';
COMMENT ON COLUMN public.currency_numbers.is_active IS 'Whether this note is active and visible to customers';
COMMENT ON COLUMN public.currency_numbers.is_sold IS 'Whether this note has been sold';
COMMENT ON COLUMN public.currency_numbers.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN public.currency_numbers.updated_at IS 'Timestamp when the record was last updated';

-- Enable Row Level Security (RLS)
ALTER TABLE public.currency_numbers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Public read access for active, non-sold currency numbers
CREATE POLICY "Allow public read access for active currency numbers"
    ON public.currency_numbers
    FOR SELECT
    USING (is_active = true AND is_sold = false);

-- Allow authenticated users full access (for admin operations)
CREATE POLICY "Allow authenticated users full access"
    ON public.currency_numbers
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service role full access (bypass RLS)
CREATE POLICY "Allow service role full access"
    ON public.currency_numbers
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow anon users to read only
CREATE POLICY "Allow anonymous read access"
    ON public.currency_numbers
    FOR SELECT
    TO anon
    USING (is_active = true AND is_sold = false);

-- Insert sample currency data (optional - remove if not needed)
-- INSERT INTO public.currency_numbers (serial_number, price, is_active, is_sold)
-- VALUES
--     ('123456', 5000, true, false),
--     ('777777', 15000, true, false),
--     ('100001', 3000, true, false);
