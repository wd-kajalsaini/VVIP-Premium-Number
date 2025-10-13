# Visitor Stats Table Schema

## Overview

The `visitor_stats` table is used to track the total number of unique visitors to the website. It stores a single row containing the aggregated visitor count.

## Table Structure

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | INTEGER | 1 | Primary key - Always set to 1 (ensures single row) |
| `total_visits` | BIGINT | 0 | Total number of unique visits |
| `last_updated` | TIMESTAMP WITH TIME ZONE | NOW() | Last time the count was updated |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOW() | When the record was created |

## Features

- **Single Row Table**: Uses a CHECK constraint to ensure only one row exists (id = 1)
- **High Capacity**: BIGINT allows counting up to 9,223,372,036,854,775,807 visits
- **Automatic Timestamps**: Tracks when the count was last updated
- **Row Level Security (RLS)**: Configured for public read/update access
- **Indexed**: Fast queries on `last_updated` field
- **Session-based Tracking**: Frontend uses sessionStorage to prevent duplicate counting

## RLS Policies

1. **Public Read Access**: Anyone can view the visitor count
2. **Public Update Access**: Anyone can increment the visitor count
3. **Service Role Full Access**: Admin operations (reset, manual adjustments)

## Integration

### Service Layer
- **Service**: `src/services/visitorService.ts`
  - `getVisitorCount()`: Fetches current visitor count
  - `incrementVisitorCount()`: Increments and returns new count
  - `formatVisitorCount(count)`: Formats count with leading zeros (6 digits)

### Frontend Implementation
- **Component**: `src/pages/HomeRedesigned.tsx`
  - Uses `useEffect` hook to track visitors on page load
  - Uses `sessionStorage` to prevent counting same visitor multiple times
  - Displays count in a styled counter component

### Tracking Logic

```javascript
// Check if visitor has been counted in this session
const hasVisited = sessionStorage.getItem('visitor_counted');

if (!hasVisited) {
  // New visitor - increment count
  const newCount = await visitorService.incrementVisitorCount();
  setVisitorCount(formatVisitorCount(newCount));
  sessionStorage.setItem('visitor_counted', 'true');
} else {
  // Returning visitor (same session) - just fetch count
  const currentCount = await visitorService.getVisitorCount();
  setVisitorCount(formatVisitorCount(currentCount));
}
```

## Usage Examples

### Get Current Visitor Count

```sql
SELECT total_visits FROM visitor_stats WHERE id = 1;
```

### Manually Increment Count

```sql
UPDATE visitor_stats
SET total_visits = total_visits + 1,
    last_updated = NOW()
WHERE id = 1
RETURNING total_visits;
```

### Reset Counter (Admin only)

```sql
UPDATE visitor_stats
SET total_visits = 0,
    last_updated = NOW()
WHERE id = 1;
```

### Check Last Update Time

```sql
SELECT total_visits, last_updated
FROM visitor_stats
WHERE id = 1;
```

## Installation

Run the migration script in your Supabase SQL Editor:

```bash
# Using Supabase Dashboard
1. Go to SQL Editor
2. Create new query
3. Paste contents of create_visitor_stats_table.sql
4. Click Run

# Using Supabase CLI
supabase db push
```

## Rollback

To remove the table and all data:

```bash
# Run the rollback script
# Execute rollback_visitor_stats_table.sql in SQL Editor
```

⚠️ **WARNING**: Rollback will permanently delete all visitor statistics!

## Troubleshooting

### Issue: Cannot increment count
**Symptom**: Updates fail with permission denied

**Solution**: Check RLS policies are enabled:
```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'visitor_stats';

-- Should return: rowsecurity = true
```

### Issue: Multiple rows created
**Symptom**: More than one row in the table

**Solution**: The CHECK constraint should prevent this. If it happens:
```sql
-- Keep only the first row, sum the counts
WITH summed AS (
  SELECT SUM(total_visits) as total FROM visitor_stats
)
DELETE FROM visitor_stats WHERE id != 1;

UPDATE visitor_stats
SET total_visits = (SELECT total FROM summed)
WHERE id = 1;
```

### Issue: Count not updating in UI
**Symptom**: Frontend shows old count

**Solution**: Clear browser sessionStorage:
```javascript
sessionStorage.removeItem('visitor_counted');
```

## Performance Considerations

- Single row design ensures O(1) read/write operations
- Index on `last_updated` for analytics queries
- No foreign keys - independent table for maximum speed
- BIGINT type prevents overflow for high-traffic sites

## Security

- RLS enabled by default
- Public can only read and increment (no delete/reset)
- Service role required for administrative operations
- Session-based tracking prevents abuse

## Future Enhancements

Potential improvements:
- Add daily/weekly/monthly visitor breakdowns
- Track unique vs returning visitors
- Add geographic visitor data
- Implement rate limiting for increment operations
