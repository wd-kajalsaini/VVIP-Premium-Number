-- Rollback Migration: Drop car_numbers table
-- Description: This script will remove the car_numbers table and all associated objects
-- Warning: This will permanently delete all data in the car_numbers table
-- Created: 2025-10-08

-- Drop RLS policies
DROP POLICY IF EXISTS "Allow public read access for active vehicle numbers" ON public.car_numbers;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.car_numbers;
DROP POLICY IF EXISTS "Allow service role full access" ON public.car_numbers;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.car_numbers;

-- Disable Row Level Security
ALTER TABLE IF EXISTS public.car_numbers DISABLE ROW LEVEL SECURITY;

-- Drop trigger
DROP TRIGGER IF EXISTS trigger_update_car_numbers_updated_at ON public.car_numbers;

-- Drop function
DROP FUNCTION IF EXISTS public.update_car_numbers_updated_at();

-- Drop indexes (they will be dropped automatically with the table, but listing for clarity)
DROP INDEX IF EXISTS public.idx_car_numbers_vehicle_number;
DROP INDEX IF EXISTS public.idx_car_numbers_vehicle_type;
DROP INDEX IF EXISTS public.idx_car_numbers_category_id;
DROP INDEX IF EXISTS public.idx_car_numbers_is_vip;
DROP INDEX IF EXISTS public.idx_car_numbers_is_todays_offer;
DROP INDEX IF EXISTS public.idx_car_numbers_is_active;
DROP INDEX IF EXISTS public.idx_car_numbers_is_sold;
DROP INDEX IF EXISTS public.idx_car_numbers_created_at;
DROP INDEX IF EXISTS public.idx_car_numbers_active_not_sold;
DROP INDEX IF EXISTS public.idx_car_numbers_vip_active;
DROP INDEX IF EXISTS public.idx_car_numbers_todays_offer_active;

-- Drop the table
DROP TABLE IF EXISTS public.car_numbers;
