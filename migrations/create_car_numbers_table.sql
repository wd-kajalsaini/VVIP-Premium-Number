-- Migration: Create car_numbers table for vehicle numbers
-- Description: This table stores vehicle registration numbers (cars and bikes) with pricing and status information
-- Created: 2025-10-08

-- Create car_numbers table
CREATE TABLE IF NOT EXISTS public.car_numbers (
    id BIGSERIAL PRIMARY KEY,
    vehicle_number VARCHAR(50) NOT NULL,
    vehicle_type VARCHAR(10) NOT NULL CHECK (vehicle_type IN ('car', 'bike')),
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    category_id BIGINT,
    is_vip BOOLEAN NOT NULL DEFAULT false,
    is_todays_offer BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_sold BOOLEAN NOT NULL DEFAULT false,
    offer_price NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_car_numbers_vehicle_number ON public.car_numbers(vehicle_number);
CREATE INDEX idx_car_numbers_vehicle_type ON public.car_numbers(vehicle_type);
CREATE INDEX idx_car_numbers_category_id ON public.car_numbers(category_id);
CREATE INDEX idx_car_numbers_is_vip ON public.car_numbers(is_vip);
CREATE INDEX idx_car_numbers_is_todays_offer ON public.car_numbers(is_todays_offer);
CREATE INDEX idx_car_numbers_is_active ON public.car_numbers(is_active);
CREATE INDEX idx_car_numbers_is_sold ON public.car_numbers(is_sold);
CREATE INDEX idx_car_numbers_created_at ON public.car_numbers(created_at DESC);

-- Create composite indexes for common query patterns
CREATE INDEX idx_car_numbers_active_not_sold ON public.car_numbers(is_active, is_sold) WHERE is_active = true AND is_sold = false;
CREATE INDEX idx_car_numbers_vip_active ON public.car_numbers(is_vip, is_active) WHERE is_vip = true AND is_active = true;
CREATE INDEX idx_car_numbers_todays_offer_active ON public.car_numbers(is_todays_offer, is_active) WHERE is_todays_offer = true AND is_active = true;

-- Add foreign key constraint for category_id (if categories table exists)
-- Uncomment the following line if you have a categories table
-- ALTER TABLE public.car_numbers ADD CONSTRAINT fk_car_numbers_category FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_car_numbers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_car_numbers_updated_at
    BEFORE UPDATE ON public.car_numbers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_car_numbers_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.car_numbers IS 'Stores vehicle registration numbers (cars and bikes) for sale';
COMMENT ON COLUMN public.car_numbers.id IS 'Primary key - auto-incrementing ID';
COMMENT ON COLUMN public.car_numbers.vehicle_number IS 'Vehicle registration number (e.g., DL-01-AB-1234)';
COMMENT ON COLUMN public.car_numbers.vehicle_type IS 'Type of vehicle - either car or bike';
COMMENT ON COLUMN public.car_numbers.price IS 'Price of the vehicle number';
COMMENT ON COLUMN public.car_numbers.category_id IS 'Foreign key to categories table (optional)';
COMMENT ON COLUMN public.car_numbers.is_vip IS 'Whether this is a VIP number';
COMMENT ON COLUMN public.car_numbers.is_todays_offer IS 'Whether this is featured in today''s offers';
COMMENT ON COLUMN public.car_numbers.is_active IS 'Whether this number is active and visible to customers';
COMMENT ON COLUMN public.car_numbers.is_sold IS 'Whether this number has been sold';
COMMENT ON COLUMN public.car_numbers.offer_price IS 'Special offer price (if different from regular price)';
COMMENT ON COLUMN public.car_numbers.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN public.car_numbers.updated_at IS 'Timestamp when the record was last updated';

-- Enable Row Level Security (RLS)
ALTER TABLE public.car_numbers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Public read access for active, non-sold vehicle numbers
CREATE POLICY "Allow public read access for active vehicle numbers"
    ON public.car_numbers
    FOR SELECT
    USING (is_active = true AND is_sold = false);

-- Allow authenticated users full access (for admin operations)
CREATE POLICY "Allow authenticated users full access"
    ON public.car_numbers
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service role full access (bypass RLS)
CREATE POLICY "Allow service role full access"
    ON public.car_numbers
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow anon users to read only
CREATE POLICY "Allow anonymous read access"
    ON public.car_numbers
    FOR SELECT
    TO anon
    USING (is_active = true AND is_sold = false);

-- Insert some sample data (optional - remove if not needed)
-- INSERT INTO public.car_numbers (vehicle_number, vehicle_type, price, is_vip, is_todays_offer, is_active, is_sold)
-- VALUES
--     ('DL-01-AB-0001', 'car', 500000, true, false, true, false),
--     ('MH-02-CD-0007', 'car', 350000, true, true, true, false),
--     ('KA-03-EF-0009', 'bike', 150000, false, true, true, false),
--     ('TN-01-GH-0008', 'car', 400000, true, false, true, false),
--     ('UP-16-IJ-0786', 'bike', 125000, false, false, true, false);
