# Numerology Table Schema

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        numerology                           │
├─────────────────────────────────────────────────────────────┤
│ PK  id                  BIGSERIAL                           │
│     number              VARCHAR(20)         NOT NULL UNIQUE │
│ FK  category_id         BIGINT                              │
│     is_active           BOOLEAN             NOT NULL        │
│     is_sold             BOOLEAN             NOT NULL        │
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
- **id**: Auto-incrementing unique identifier for each numerology record

### Required Fields
- **number**: The numerology number (phone numbers or any numeric sequence)
  - Must be unique across the table
  - Examples: "9999900001", "9876543210", "1111111111"

### Optional Fields
- **category_id**: Foreign key reference to categories table for classification

### Status Flags
- **is_active**: Number information is visible and active (default: true)
- **is_sold**: For phone number numerology - indicates if number is sold (default: false)

### Timestamps
- **created_at**: When the record was created (auto-set)
- **updated_at**: When the record was last modified (auto-updated)

## Indexes

### Single Column Indexes
1. `idx_numerology_number` - On `number` (unique constraint also provides indexing)
2. `idx_numerology_category_id` - On `category_id`
3. `idx_numerology_is_active` - On `is_active`
4. `idx_numerology_is_sold` - On `is_sold`

### Composite Indexes
1. `idx_numerology_active_not_sold` - On `(is_active, is_sold)` WHERE `is_active = true AND is_sold = false`

## Constraints

### Unique Constraints
- `number` must be unique

### Foreign Key Constraints (Optional)
- `category_id` references `categories(id)` with `ON DELETE SET NULL`

## Triggers

### Auto-Update Timestamp
- **Trigger**: `trigger_update_numerology_updated_at`
- **Function**: `update_numerology_updated_at()`
- **Action**: Automatically updates `updated_at` column to current UTC time on every UPDATE

## Row Level Security (RLS)

### Enabled Policies

1. **Public Read Access**
   - Policy: `Allow public read access for active numerology entries`
   - Scope: SELECT
   - Condition: `is_active = true AND is_sold = false`
   - Description: Allows anyone to view active, unsold numerology entries

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
interface NumerologyEntry {
  id: number;                          // Auto-generated
  number: string;                      // Required, max 20 chars, unique
  category_id?: number;                // Optional, integer
  is_active: boolean;                  // Required, default true
  is_sold: boolean;                    // Required, default false
  created_at: string;                  // Auto-generated ISO timestamp
  updated_at: string;                  // Auto-updated ISO timestamp
}
```

## Usage Examples

### Common Query Patterns

```sql
-- Get all active numerology entries
SELECT * FROM numerology
WHERE is_active = true
  AND is_sold = false
ORDER BY number ASC;

-- Get specific numerology number
SELECT * FROM numerology
WHERE number = '9999900001'
  AND is_active = true;

-- Search by number pattern
SELECT * FROM numerology
WHERE number ILIKE '%9999%'
  AND is_active = true
  AND is_sold = false;

-- Get entries by category
SELECT * FROM numerology
WHERE category_id = 1
  AND is_active = true
  AND is_sold = false;

-- Get available (not sold) numbers
SELECT * FROM numerology
WHERE is_sold = false
  AND is_active = true
ORDER BY created_at DESC;
```

## Sample Data

The migration includes commented-out sample data. Uncomment if needed:

```sql
INSERT INTO public.numerology (number, category_id, is_active, is_sold)
VALUES
    ('9999900001', NULL, true, false),
    ('9876543210', NULL, true, false),
    ('1234567890', NULL, true, false);
```

## Best Practices

### 1. Number Format
- Store phone numbers as complete strings: "9999900001", "9876543210"
- Keep numbers unique across the table
- Use consistent formatting (10 digits for Indian phone numbers)

### 2. Category Management
- Link numbers to categories for better organization
- Use NULL for category_id if not categorized
- Create meaningful category classifications

### 3. Search Optimization
- Use ILIKE for case-insensitive pattern searches
- Search by number patterns (e.g., repeating digits)
- Leverage indexed columns for better performance

### 4. Status Management
- Use `is_active = false` to hide entries without deleting
- Use `is_sold = true` when number has been sold
- Keep historical data for reporting

## Performance Considerations

- **Table Size**: Optimized for hundreds of entries
- **Query Performance**: All common queries use indexes
- **Write Performance**: Minimal trigger overhead
- **RLS Impact**: Simple policies with minimal performance impact

## Integration

### Related Files
- Service: `src/services/numerologyService.ts`
- Migration: `migrations/create_numerology_table.sql`
- Rollback: `migrations/rollback_numerology_table.sql`

### Service Methods
- `getAllNumerologyEntries()` - Get all entries (admin)
- `getActiveNumerologyEntries()` - Get active entries (public)
- `getNumerologyEntry(id)` - Get single entry
- `getNumerologyByNumber(number)` - Get by number
- `createNumerologyEntry(input)` - Create new entry
- `updateNumerologyEntry(id, input)` - Update entry
- `deleteNumerologyEntry(id)` - Delete entry
- `calculateNumerologyNumber(input)` - Calculate number from text
- `getNumerologyMeaning(input)` - Get meaning from any input
- `searchNumerologyEntries(query)` - Search entries

## Migration Notes

- **Version**: 1.0.0
- **Created**: 2025-10-08
- **Compatible With**: PostgreSQL 12+, Supabase
- **Dependencies**: None (categories FK is optional)
- **Pre-populated**: No (sample data available but commented out)
