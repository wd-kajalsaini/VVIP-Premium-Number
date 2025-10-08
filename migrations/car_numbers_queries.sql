-- Common Queries for car_numbers Table
-- This file contains useful SQL queries for managing and querying vehicle numbers

-- ============================================================================
-- SELECT QUERIES
-- ============================================================================

-- Get all active vehicle numbers
SELECT * FROM car_numbers
WHERE is_active = true AND is_sold = false
ORDER BY created_at DESC;

-- Get VIP vehicle numbers
SELECT * FROM car_numbers
WHERE is_vip = true AND is_active = true AND is_sold = false
ORDER BY price DESC;

-- Get today's offers
SELECT * FROM car_numbers
WHERE is_todays_offer = true AND is_active = true AND is_sold = false
ORDER BY created_at DESC;

-- Get vehicle numbers by state
SELECT * FROM car_numbers
WHERE state = 'Delhi' AND is_active = true AND is_sold = false
ORDER BY vehicle_number;

-- Get vehicle numbers by type (car or bike)
SELECT * FROM car_numbers
WHERE vehicle_type = 'car' AND is_active = true AND is_sold = false
ORDER BY price DESC;

-- Search vehicle numbers (with pattern matching)
SELECT * FROM car_numbers
WHERE vehicle_number ILIKE '%0001%'
  AND is_active = true
  AND is_sold = false;

-- Get vehicle numbers within price range
SELECT * FROM car_numbers
WHERE price BETWEEN 100000 AND 500000
  AND is_active = true
  AND is_sold = false
ORDER BY price ASC;

-- Get vehicle numbers with offer price
SELECT vehicle_number, price, offer_price,
       (price - offer_price) as discount,
       ROUND(((price - offer_price) / price * 100)::numeric, 2) as discount_percentage
FROM car_numbers
WHERE offer_price IS NOT NULL
  AND offer_price < price
  AND is_active = true
  AND is_sold = false
ORDER BY discount_percentage DESC;

-- ============================================================================
-- AGGREGATE QUERIES
-- ============================================================================

-- Count total active vehicle numbers
SELECT COUNT(*) as total_active FROM car_numbers
WHERE is_active = true AND is_sold = false;

-- Count by vehicle type
SELECT vehicle_type, COUNT(*) as count
FROM car_numbers
WHERE is_active = true AND is_sold = false
GROUP BY vehicle_type;

-- Count by state
SELECT state, COUNT(*) as count
FROM car_numbers
WHERE is_active = true AND is_sold = false
GROUP BY state
ORDER BY count DESC;

-- Average price by vehicle type
SELECT vehicle_type,
       ROUND(AVG(price)::numeric, 2) as avg_price,
       MIN(price) as min_price,
       MAX(price) as max_price
FROM car_numbers
WHERE is_active = true AND is_sold = false
GROUP BY vehicle_type;

-- Sales statistics
SELECT
    COUNT(*) FILTER (WHERE is_sold = true) as total_sold,
    COUNT(*) FILTER (WHERE is_sold = false AND is_active = true) as available,
    COUNT(*) FILTER (WHERE is_vip = true) as vip_numbers,
    COUNT(*) FILTER (WHERE is_todays_offer = true) as todays_offers,
    ROUND(AVG(price)::numeric, 2) as avg_price,
    SUM(price) FILTER (WHERE is_sold = true) as total_revenue
FROM car_numbers;

-- Top 10 most expensive vehicle numbers
SELECT vehicle_number, state, vehicle_type, price, is_vip
FROM car_numbers
WHERE is_active = true AND is_sold = false
ORDER BY price DESC
LIMIT 10;

-- ============================================================================
-- INSERT QUERIES
-- ============================================================================

-- Insert single vehicle number
INSERT INTO car_numbers (
    vehicle_number, state, rto_code, vehicle_type, price,
    is_vip, is_todays_offer, is_active, is_sold
)
VALUES (
    'DL-01-AB-1234', 'Delhi', 'DL-01', 'car', 500000,
    true, false, true, false
)
RETURNING *;

-- Bulk insert vehicle numbers
INSERT INTO car_numbers (vehicle_number, state, rto_code, vehicle_type, price, is_vip, is_active)
VALUES
    ('MH-01-CD-5678', 'Maharashtra', 'MH-01', 'car', 450000, true, true),
    ('KA-03-EF-9012', 'Karnataka', 'KA-03', 'bike', 150000, false, true),
    ('TN-01-GH-3456', 'Tamil Nadu', 'TN-01', 'car', 400000, true, true),
    ('UP-16-IJ-7890', 'Uttar Pradesh', 'UP-16', 'bike', 125000, false, true)
RETURNING *;

-- ============================================================================
-- UPDATE QUERIES
-- ============================================================================

-- Update price of a vehicle number
UPDATE car_numbers
SET price = 550000, updated_at = NOW()
WHERE vehicle_number = 'DL-01-AB-1234'
RETURNING *;

-- Mark vehicle number as sold
UPDATE car_numbers
SET is_sold = true, is_active = false, updated_at = NOW()
WHERE id = 1
RETURNING *;

-- Set as today's offer
UPDATE car_numbers
SET is_todays_offer = true, updated_at = NOW()
WHERE id IN (1, 2, 3)
RETURNING *;

-- Remove from today's offers
UPDATE car_numbers
SET is_todays_offer = false, updated_at = NOW()
WHERE is_todays_offer = true
RETURNING *;

-- Mark as VIP
UPDATE car_numbers
SET is_vip = true, updated_at = NOW()
WHERE id = 5
RETURNING *;

-- Add offer price
UPDATE car_numbers
SET offer_price = 400000, updated_at = NOW()
WHERE id = 1
RETURNING *;

-- Deactivate vehicle number
UPDATE car_numbers
SET is_active = false, updated_at = NOW()
WHERE id = 10
RETURNING *;

-- Bulk update - activate multiple vehicle numbers
UPDATE car_numbers
SET is_active = true, updated_at = NOW()
WHERE id IN (1, 2, 3, 4, 5)
RETURNING *;

-- ============================================================================
-- DELETE QUERIES
-- ============================================================================

-- Delete single vehicle number (use with caution!)
DELETE FROM car_numbers WHERE id = 999;

-- Delete all sold vehicle numbers (use with extreme caution!)
-- DELETE FROM car_numbers WHERE is_sold = true;

-- Soft delete (recommended) - just deactivate instead of deleting
UPDATE car_numbers
SET is_active = false, updated_at = NOW()
WHERE id = 999;

-- ============================================================================
-- MAINTENANCE QUERIES
-- ============================================================================

-- Reset all today's offers (useful for daily maintenance)
UPDATE car_numbers
SET is_todays_offer = false, updated_at = NOW()
WHERE is_todays_offer = true;

-- Find duplicate vehicle numbers
SELECT vehicle_number, COUNT(*) as count
FROM car_numbers
GROUP BY vehicle_number
HAVING COUNT(*) > 1;

-- Find vehicle numbers with invalid data
SELECT * FROM car_numbers
WHERE vehicle_number IS NULL
   OR state IS NULL
   OR price < 0;

-- Vacuum and analyze table (for performance optimization)
VACUUM ANALYZE car_numbers;

-- Check table size
SELECT
    pg_size_pretty(pg_total_relation_size('car_numbers')) as total_size,
    pg_size_pretty(pg_relation_size('car_numbers')) as table_size,
    pg_size_pretty(pg_indexes_size('car_numbers')) as indexes_size;

-- ============================================================================
-- REPORTING QUERIES
-- ============================================================================

-- Daily sales report
SELECT
    DATE(created_at) as date,
    COUNT(*) as numbers_added,
    COUNT(*) FILTER (WHERE is_sold = true) as sold_count,
    SUM(price) FILTER (WHERE is_sold = true) as revenue
FROM car_numbers
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- State-wise inventory report
SELECT
    state,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE is_sold = false AND is_active = true) as available,
    COUNT(*) FILTER (WHERE is_sold = true) as sold,
    COUNT(*) FILTER (WHERE is_vip = true) as vip_count,
    ROUND(AVG(price)::numeric, 2) as avg_price
FROM car_numbers
GROUP BY state
ORDER BY total DESC;

-- Vehicle type distribution
SELECT
    vehicle_type,
    COUNT(*) as total,
    ROUND((COUNT(*) * 100.0 / SUM(COUNT(*)) OVER())::numeric, 2) as percentage
FROM car_numbers
WHERE is_active = true AND is_sold = false
GROUP BY vehicle_type;

-- Weekly performance report
SELECT
    DATE_TRUNC('week', created_at) as week_start,
    COUNT(*) as new_listings,
    COUNT(*) FILTER (WHERE is_sold = true) as sold,
    SUM(price) FILTER (WHERE is_sold = true) as revenue,
    ROUND(AVG(price)::numeric, 2) as avg_price
FROM car_numbers
WHERE created_at >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE_TRUNC('week', created_at)
ORDER BY week_start DESC;
