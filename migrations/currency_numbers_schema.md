# Currency Numbers Table Schema

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    currency_numbers                         │
├─────────────────────────────────────────────────────────────┤
│ PK  id                  BIGSERIAL                           │
│     serial_number       VARCHAR(100)    NOT NULL UNIQUE     │
│     price               NUMERIC(10,2)   NOT NULL            │
│ FK  category_id         BIGINT                              │
│     description         TEXT                                │
│     pattern_type        VARCHAR(100)                        │
│     primary_image       TEXT                                │
│     is_rare             BOOLEAN         NOT NULL            │
│     is_today_offer      BOOLEAN         NOT NULL            │
│     is_featured         BOOLEAN         NOT NULL            │
│     is_active           BOOLEAN         NOT NULL            │
│     is_sold             BOOLEAN         NOT NULL            │
│     created_at          TIMESTAMP       NOT NULL            │
│     updated_at          TIMESTAMP       NOT NULL            │
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
- **id**: Auto-incrementing unique identifier for each currency record

### Required Fields
- **serial_number**: The serial number on the currency note (e.g., "123456", "AB1234CD")
  - Must be unique across the table
- **price**: Selling price of the currency note in INR (stored as decimal with 2 decimal places)

### Content Fields
- **description**: Description or special features of the currency note
- **pattern_type**: Type of pattern (e.g., "Repeating", "Sequential", "Radar", "Solid")
- **primary_image**: URL to the primary image of the currency note

### Optional Fields
- **category_id**: Foreign key reference to categories table for classification

### Status Flags
- **is_rare**: Indicates if this is a rare currency note (default: false)
- **is_today_offer**: Featured in today's special offers (default: false)
- **is_featured**: Featured currency note (default: false)
- **is_active**: Note is visible and available for purchase (default: true)
- **is_sold**: Note has been sold (default: false)

### Timestamps
- **created_at**: When the record was created (auto-set)
- **updated_at**: When the record was last modified (auto-updated)

## Indexes

### Single Column Indexes
1. `idx_currency_numbers_serial_number` - On `serial_number` (unique constraint also provides indexing)
2. `idx_currency_numbers_category_id` - On `category_id`
3. `idx_currency_numbers_is_rare` - On `is_rare`
4. `idx_currency_numbers_is_today_offer` - On `is_today_offer`
5. `idx_currency_numbers_is_featured` - On `is_featured`
6. `idx_currency_numbers_is_active` - On `is_active`
7. `idx_currency_numbers_is_sold` - On `is_sold`
8. `idx_currency_numbers_created_at` - On `created_at` (descending)

### Composite Indexes
1. `idx_currency_numbers_active_not_sold` - On `(is_active, is_sold)` WHERE `is_active = true AND is_sold = false`
2. `idx_currency_numbers_rare_active` - On `(is_rare, is_active)` WHERE `is_rare = true AND is_active = true`
3. `idx_currency_numbers_today_offer_active` - On `(is_today_offer, is_active)` WHERE `is_today_offer = true AND is_active = true`
4. `idx_currency_numbers_featured_active` - On `(is_featured, is_active)` WHERE `is_featured = true AND is_active = true`

## Constraints

### Unique Constraints
- `serial_number` must be unique

### Foreign Key Constraints (Optional)
- `category_id` references `categories(id)` with `ON DELETE SET NULL`

## Triggers

### Auto-Update Timestamp
- **Trigger**: `trigger_update_currency_numbers_updated_at`
- **Function**: `update_currency_numbers_updated_at()`
- **Action**: Automatically updates `updated_at` column to current UTC time on every UPDATE

## Row Level Security (RLS)

### Enabled Policies

1. **Public Read Access**
   - Policy: `Allow public read access for active currency numbers`
   - Scope: SELECT
   - Condition: `is_active = true AND is_sold = false`
   - Description: Allows anyone to view active, unsold currency numbers

2. **Authenticated Users Full Access**
   - Policy: `Allow authenticated users full access`
   - Scope: ALL (SELECT, INSERT, UPDATE, DELETE)
   - Condition: User is authenticated
   - Description: Full CRUD access for authenticated users

3. **Service Role Full Access**
   - Policy: `Allow service role full access`
   - Scope: ALL
   - Condition: Service role
   - Description: Bypass RLS for service role

4. **Anonymous Read Access**
   - Policy: `Allow anonymous read access`
   - Scope: SELECT
   - Condition: `is_active = true AND is_sold = false`
   - Description: Read-only access for anonymous users

## Data Validation Rules

### Application Level (TypeScript Interface)
```typescript
interface CurrencyNumber {
  id: number;                          // Auto-generated
  serial_number: string;               // Required, max 100 chars, unique
  price: number;                       // Required, numeric
  category_id?: number;                // Optional, integer
  description?: string;                // Optional, text
  pattern_type?: string;               // Optional, max 100 chars
  primary_image?: string;              // Optional, URL
  is_rare: boolean;                    // Required, default false
  is_today_offer: boolean;             // Required, default false
  is_featured: boolean;                // Required, default false
  is_active: boolean;                  // Required, default true
  is_sold: boolean;                    // Required, default false
  created_at: string;                  // Auto-generated ISO timestamp
  updated_at: string;                  // Auto-updated ISO timestamp
}
```

## Usage Examples

### Common Query Patterns

```sql
-- Get all active currency numbers
SELECT * FROM currency_numbers
WHERE is_active = true
  AND is_sold = false
ORDER BY created_at DESC;

-- Get rare currency numbers
SELECT * FROM currency_numbers
WHERE is_rare = true
  AND is_active = true
  AND is_sold = false;

-- Get today's offers
SELECT * FROM currency_numbers
WHERE is_today_offer = true
  AND is_active = true
  AND is_sold = false
ORDER BY price ASC;

-- Search by serial number pattern
SELECT * FROM currency_numbers
WHERE serial_number ILIKE '%777%'
  AND is_active = true
  AND is_sold = false;

-- Get by pattern type
SELECT * FROM currency_numbers
WHERE pattern_type = 'Radar'
  AND is_active = true
  AND is_sold = false;
```

## Sample Data

The migration includes commented-out sample data:

```sql
INSERT INTO public.currency_numbers (serial_number, price, description, pattern_type, is_rare, is_active, is_sold)
VALUES
    ('123456', 5000, 'Repeating sequence', 'Sequential', true, true, false),
    ('777777', 15000, 'All sevens - Lucky number', 'Repeating', true, true, false),
    ('100001', 3000, 'Radar number', 'Radar', false, true, false);
```

## Best Practices

### 1. Serial Number Format
- Store serial numbers as complete strings
- Keep serial numbers unique across the table
- Use consistent formatting

### 2. Pattern Types
- Common patterns: Sequential, Repeating, Radar, Solid, Fancy
- Use consistent naming conventions
- Consider creating a pattern_types enum table

### 3. Image Management
- Store image URLs in primary_image field
- Use Supabase Storage for image hosting
- Implement image validation and size limits

### 4. Status Management
- When marking as sold: `is_sold = true, is_active = false`
- When removing from listings: `is_active = false`
- When featuring: `is_rare = true`, `is_featured = true`, or `is_today_offer = true`

### 5. Search Optimization
- Use indexed columns in WHERE clauses
- Use ILIKE for case-insensitive searches
- Leverage full-text search for descriptions

## Performance Considerations

- **Table Size**: Designed to handle 100K+ records efficiently
- **Query Performance**: All common queries use indexes
- **Write Performance**: Minimal trigger overhead
- **RLS Impact**: Policies are simple and don't significantly impact performance

## Integration

### Related Files
- Service: `src/services/currencyNumberService.ts`
- Admin Page: `src/pages/AdminCurrencyNumbers.tsx`
- Migration: `migrations/create_currency_numbers_table.sql`
- Rollback: `migrations/rollback_currency_numbers_table.sql`

### Service Methods
- `getAllCurrencyNumbers()` - Get all entries (admin)
- `getActiveCurrencyNumbers(filters)` - Get active entries with filters (public)
- `getCurrencyNumber(id)` - Get single entry
- `createCurrencyNumber(input)` - Create new entry
- `updateCurrencyNumber(id, input)` - Update entry
- `deleteCurrencyNumber(id)` - Delete entry
- `getTodayOffers()` - Get today's offers
- `getRareNumbers()` - Get rare currency notes
- `getFeaturedNumbers()` - Get featured notes
- `searchCurrencyNumbers(query)` - Search entries
- `uploadImage(file, type)` - Upload currency images

## Migration Notes

- **Version**: 1.0.0
- **Created**: 2025-10-08
- **Compatible With**: PostgreSQL 12+, Supabase
- **Dependencies**: None (categories FK is optional)
- **Pre-populated**: No (sample data available but commented out)
