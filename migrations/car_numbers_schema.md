# Car Numbers Table Schema

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        car_numbers                          │
├─────────────────────────────────────────────────────────────┤
│ PK  id                  BIGSERIAL                           │
│     vehicle_number      VARCHAR(50)         NOT NULL        │
│     vehicle_type        VARCHAR(10)         NOT NULL        │
│     price               NUMERIC(10,2)       NOT NULL        │
│ FK  category_id         BIGINT                              │
│     is_vip              BOOLEAN             NOT NULL        │
│     is_todays_offer     BOOLEAN             NOT NULL        │
│     is_active           BOOLEAN             NOT NULL        │
│     is_sold             BOOLEAN             NOT NULL        │
│     offer_price         NUMERIC(10,2)                       │
│     created_at          TIMESTAMP           NOT NULL        │
│     updated_at          TIMESTAMP           NOT NULL        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ FK (optional)
                            ▼
                    ┌──────────────┐
                    │  categories  │
                    ├──────────────┤
                    │  id          │
                    │  name        │
                    │  ...         │
                    └──────────────┘
```

## Field Descriptions

### Primary Key
- **id**: Auto-incrementing unique identifier for each vehicle number record

### Required Fields
- **vehicle_number**: The registration number of the vehicle (e.g., "DL-01-AB-1234", "MH-02-XY-9999")
- **vehicle_type**: Type of vehicle - must be either "car" or "bike"
- **price**: Selling price of the vehicle number in INR (stored as decimal with 2 decimal places)

### Optional Fields
- **category_id**: Foreign key reference to categories table for classification
- **offer_price**: Special discounted price if different from regular price

### Status Flags
- **is_vip**: Indicates if this is a premium/VIP number (default: false)
- **is_todays_offer**: Featured in today's special offers (default: false)
- **is_active**: Number is visible and available for purchase (default: true)
- **is_sold**: Number has been sold (default: false)

### Timestamps
- **created_at**: When the record was created (auto-set)
- **updated_at**: When the record was last modified (auto-updated)

## Indexes

### Single Column Indexes
1. `idx_car_numbers_vehicle_number` - On `vehicle_number`
2. `idx_car_numbers_vehicle_type` - On `vehicle_type`
3. `idx_car_numbers_category_id` - On `category_id`
4. `idx_car_numbers_is_vip` - On `is_vip`
5. `idx_car_numbers_is_todays_offer` - On `is_todays_offer`
6. `idx_car_numbers_is_active` - On `is_active`
7. `idx_car_numbers_is_sold` - On `is_sold`
8. `idx_car_numbers_created_at` - On `created_at` (descending)

### Composite Indexes
1. `idx_car_numbers_active_not_sold` - On `(is_active, is_sold)` WHERE `is_active = true AND is_sold = false`
2. `idx_car_numbers_vip_active` - On `(is_vip, is_active)` WHERE `is_vip = true AND is_active = true`
3. `idx_car_numbers_todays_offer_active` - On `(is_todays_offer, is_active)` WHERE `is_todays_offer = true AND is_active = true`

## Constraints

### Check Constraints
- `vehicle_type` must be either 'car' or 'bike'

### Foreign Key Constraints (Optional)
- `category_id` references `categories(id)` with `ON DELETE SET NULL`

## Triggers

### Auto-Update Timestamp
- **Trigger**: `trigger_update_car_numbers_updated_at`
- **Function**: `update_car_numbers_updated_at()`
- **Action**: Automatically updates `updated_at` column to current UTC time on every UPDATE

## Row Level Security (RLS)

### Enabled Policies

1. **Public Read Access**
   - Policy: `Allow public read access for active vehicle numbers`
   - Scope: SELECT
   - Condition: `is_active = true AND is_sold = false`
   - Description: Allows anyone to view active, unsold vehicle numbers

2. **Admin Full Access**
   - Policy: `Allow admin full access`
   - Scope: ALL (SELECT, INSERT, UPDATE, DELETE)
   - Condition: Authenticated user with admin role
   - Description: Full CRUD access for admin users

## Data Validation Rules

### Application Level (TypeScript Interface)
```typescript
interface VehicleNumber {
  id: number;                          // Auto-generated
  vehicle_number: string;              // Required, max 50 chars
  vehicle_type: 'car' | 'bike';        // Required, enum
  price: number;                       // Required, numeric
  category_id?: number;                // Optional, integer
  is_vip: boolean;                     // Required, default false
  is_todays_offer: boolean;            // Required, default false
  is_active: boolean;                  // Required, default true
  is_sold: boolean;                    // Required, default false
  offer_price?: number;                // Optional, numeric
  created_at: string;                  // Auto-generated ISO timestamp
  updated_at: string;                  // Auto-updated ISO timestamp
}
```

## Usage Examples

### Common Query Patterns

```sql
-- Get all available cars
SELECT * FROM car_numbers
WHERE vehicle_type = 'car'
  AND is_active = true
  AND is_sold = false;

-- Get VIP numbers with offer prices
SELECT * FROM car_numbers
WHERE is_vip = true
  AND offer_price IS NOT NULL
  AND is_active = true
  AND is_sold = false;

-- Get today's special offers
SELECT * FROM car_numbers
WHERE is_todays_offer = true
  AND is_active = true
  AND is_sold = false
ORDER BY price ASC;

-- Search by vehicle number pattern
SELECT * FROM car_numbers
WHERE vehicle_number ILIKE '%0001%'
  AND is_active = true
  AND is_sold = false;
```

## Best Practices

### 1. Soft Deletes
- Never hard-delete records
- Use `is_active = false` to hide records
- Keep historical data for reporting

### 2. Price Management
- Always use `offer_price` for discounts
- Keep original `price` unchanged
- Calculate discount percentage in queries

### 3. Status Management
- When marking as sold: `is_sold = true, is_active = false`
- When removing from listings: `is_active = false`
- When featuring: `is_todays_offer = true` or `is_vip = true`

### 4. Search Optimization
- Use indexed columns in WHERE clauses
- Use ILIKE for case-insensitive searches
- Consider full-text search for large datasets

## Performance Considerations

- **Table Size**: Designed to handle 100K+ records efficiently
- **Query Performance**: All common queries use indexes
- **Write Performance**: Minimal trigger overhead
- **RLS Impact**: Policies are simple and don't significantly impact performance

## Migration Notes

- **Version**: 1.0.0
- **Created**: 2025-10-08
- **Compatible With**: PostgreSQL 12+, Supabase
- **Dependencies**: None (categories FK is optional)

## Related Files

- Service: `src/services/carNumberService.ts`
- Admin Page: `src/pages/AdminVehicleNumbers.tsx`
- Migration: `migrations/create_car_numbers_table.sql`
- Rollback: `migrations/rollback_car_numbers_table.sql`
- Queries: `migrations/car_numbers_queries.sql`
