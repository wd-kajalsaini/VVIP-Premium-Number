# Database Migrations

This directory contains SQL migration scripts for the Premium Numbers database.

## Car Numbers Table Migration

The `car_numbers` table is used to store vehicle registration numbers (both cars and bikes) with pricing and status information.

### Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGSERIAL | Primary key - auto-incrementing ID |
| `vehicle_number` | VARCHAR(50) | Vehicle registration number (e.g., DL-01-AB-1234) |
| `vehicle_type` | VARCHAR(10) | Type of vehicle - either 'car' or 'bike' |
| `price` | NUMERIC(10, 2) | Price of the vehicle number |
| `category_id` | BIGINT | Foreign key to categories table (optional) |
| `is_vip` | BOOLEAN | Whether this is a VIP number |
| `is_todays_offer` | BOOLEAN | Whether this is featured in today's offers |
| `is_active` | BOOLEAN | Whether this number is active and visible to customers |
| `is_sold` | BOOLEAN | Whether this number has been sold |
| `offer_price` | NUMERIC(10, 2) | Special offer price (if different from regular price) |
| `created_at` | TIMESTAMP | Timestamp when the record was created |
| `updated_at` | TIMESTAMP | Timestamp when the record was last updated |

### Features

- **Indexes**: Optimized indexes for common query patterns
- **Automatic Timestamps**: `updated_at` is automatically updated on every modification
- **Row Level Security (RLS)**: Configured for public read access and admin full access
- **Data Validation**: Constraint checks on `vehicle_type` field
- **Foreign Key Support**: Ready for categories table integration

## How to Run Migrations

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Create a new query
4. Copy and paste the contents of `create_car_numbers_table.sql`
5. Click **Run** to execute the migration

### Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref <your-project-ref>

# Run the migration
supabase db push
```

### Manual SQL Execution

```bash
# Using psql (PostgreSQL CLI)
psql -h <your-db-host> -U <your-db-user> -d <your-db-name> -f migrations/create_car_numbers_table.sql
```

## Rollback

If you need to rollback the migration and remove the table:

1. Go to Supabase SQL Editor
2. Copy and paste the contents of `rollback_car_numbers_table.sql`
3. Click **Run**

**⚠️ WARNING**: This will permanently delete all data in the `car_numbers` table!

## Post-Migration Steps

After running the migration:

1. **Verify RLS Policies**: Check that the Row Level Security policies match your authentication setup
2. **Update Foreign Keys**: If you have a `categories` table, uncomment the foreign key constraint in the migration
3. **Test Queries**: Test some basic queries to ensure everything works:

```sql
-- Test query: Get all active vehicle numbers
SELECT * FROM car_numbers WHERE is_active = true AND is_sold = false;

-- Test query: Get VIP numbers
SELECT * FROM car_numbers WHERE is_vip = true AND is_active = true;

-- Test query: Get today's offers
SELECT * FROM car_numbers WHERE is_todays_offer = true AND is_active = true;
```

## Adjusting RLS Policies

The default RLS policies assume you have an authentication system. You may need to adjust them based on your setup:

```sql
-- Example: Allow service_role full access
CREATE POLICY "Allow service role full access"
    ON public.car_numbers
    FOR ALL
    USING (auth.role() = 'service_role');

-- Example: Allow specific user roles
CREATE POLICY "Allow admin users full access"
    ON public.car_numbers
    FOR ALL
    USING (
        auth.jwt() ->> 'role' = 'admin'
    );
```

## Sample Data

The migration includes commented-out sample data. To insert sample data, uncomment the `INSERT` statement at the end of `create_car_numbers_table.sql` before running the migration.

## Integration with Application

The table is already integrated with the application through:
- **Service**: `src/services/carNumberService.ts`
- **Admin Page**: `src/pages/AdminVehicleNumbers.tsx`

No additional code changes are needed after running the migration.

## Troubleshooting

### Issue: RLS blocking queries

**Solution**: Temporarily disable RLS for testing:
```sql
ALTER TABLE car_numbers DISABLE ROW LEVEL SECURITY;
```

### Issue: Foreign key constraint fails

**Solution**: Ensure the `categories` table exists before adding the foreign key constraint, or remove the foreign key constraint if not using categories.

### Issue: Permission denied

**Solution**: Make sure you're running the migration with a user that has sufficient privileges (usually the `postgres` superuser or service_role).

## Support

For issues or questions, refer to the Supabase documentation:
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/overview)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Migrations](https://supabase.com/docs/guides/cli/migrations)
