-- Migration: Remove state and rto_code fields from existing car_numbers table
-- Description: This migration removes the state and rto_code columns and updates RLS policies
-- Use this if you already have the car_numbers table created with state and rto_code fields
-- Created: 2025-10-08

-- Step 1: Drop existing RLS policies
DROP POLICY IF EXISTS "Allow public read access for active vehicle numbers" ON public.car_numbers;
DROP POLICY IF EXISTS "Allow admin full access" ON public.car_numbers;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.car_numbers;
DROP POLICY IF EXISTS "Allow service role full access" ON public.car_numbers;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.car_numbers;

-- Step 2: Drop indexes that reference state and rto_code
DROP INDEX IF EXISTS public.idx_car_numbers_state;

-- Step 3: Remove the columns
ALTER TABLE public.car_numbers DROP COLUMN IF EXISTS state;
ALTER TABLE public.car_numbers DROP COLUMN IF EXISTS rto_code;

-- Step 4: Recreate RLS policies

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

-- Step 5: Update column comments
COMMENT ON COLUMN public.car_numbers.vehicle_number IS 'Vehicle registration number (e.g., DL-01-AB-1234)';

-- Verification: View current table structure
-- Run this after the migration to verify the changes:
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'car_numbers'
-- ORDER BY ordinal_position;
