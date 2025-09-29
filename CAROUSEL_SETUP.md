# Carousel Management Setup Guide

## Overview
The carousel management system allows you to upload, reorder, and manage carousel slides that appear on the homepage. Images are stored locally in the `public/adminImages/` folder and managed through Supabase database.

## Setup Steps

### 1. Database Setup
Run these SQL scripts in your Supabase dashboard:

```sql
-- 1. Run database/carousel_schema.sql
-- This creates the carousel_slides table with proper structure

-- 2. Optionally run database/storage_setup.sql
-- (Not needed since we're using local file storage)
```

### 2. File Permissions
Ensure the `public/adminImages/` folder exists and has proper write permissions:
- Folder: `C:\wamp64\www\premium-numbers\public\adminImages\`
- PHP needs write access to this folder

### 3. WAMP/PHP Setup
The system uses PHP endpoints for file uploads:
- Upload endpoint: `/api/upload-carousel-image.php`
- Delete endpoint: `/api/delete-carousel-image.php`

Make sure your WAMP server is running and PHP is enabled.

## How It Works

### Admin Panel (`/admin/carousel`)
1. **Add Slide**: Upload image → Saved to `/adminImages/` → Path stored in database
2. **Reorder**: Drag slides or use up/down arrows → Updates `display_order` in database
3. **Delete**: Removes from database → Deletes image file from server
4. **Toggle Active**: Enable/disable slides without deleting them

### Home Page Display
1. Loads active slides from database ordered by `display_order`
2. Displays in carousel with auto-scroll (5 second intervals)
3. Fallback to default images if database is empty

## Database Structure

```sql
CREATE TABLE carousel_slides (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Methods

### Frontend Service Methods
- `getCarouselSlides()` - Gets active slides for homepage (ordered by display_order)
- `getAllCarouselSlides()` - Gets all slides for admin panel
- `addCarouselSlide(slide)` - Adds new slide with image upload
- `updateCarouselSlide(id, updates)` - Updates existing slide
- `deleteCarouselSlide(id)` - Deletes slide and associated image
- `updateDisplayOrder(slides)` - Updates order of multiple slides

### PHP Endpoints
- `POST /api/upload-carousel-image.php` - Handles file uploads
- `DELETE /api/delete-carousel-image.php` - Handles file deletion

## Features

✅ **Image Upload**: Local file storage in `public/adminImages/`
✅ **Drag & Drop Reordering**: Visual reordering with immediate database save
✅ **Active/Inactive Toggle**: Control slide visibility without deletion
✅ **Auto-Carousel**: 5-second auto-scroll on homepage
✅ **Fallback Handling**: Default images if database is empty or images fail to load
✅ **File Validation**: Size limits, file type checking
✅ **Responsive Design**: Works on mobile and desktop

## Testing

1. **Add Test Slide**:
   - Go to `/admin/carousel`
   - Click "Add New Slide"
   - Upload an image
   - Save

2. **Check Homepage**:
   - Go to homepage
   - Verify slide appears in carousel
   - Check browser console for any errors

3. **Test Reordering**:
   - Add multiple slides
   - Drag them to reorder
   - Refresh homepage to verify order

4. **Test Delete**:
   - Delete a slide from admin
   - Check that image file is removed from `public/adminImages/`
   - Verify slide no longer appears on homepage

## Troubleshooting

### Images Not Displaying
- Check console for error messages
- Verify image paths in database
- Check `public/adminImages/` folder permissions
- Ensure WAMP server is running

### Upload Fails
- Check PHP upload limits in `php.ini`
- Verify folder write permissions
- Check browser console for API errors

### Ordering Not Working
- Check database `display_order` values
- Verify Supabase connection
- Look for JavaScript console errors

## File Structure
```
public/
├── adminImages/          # Uploaded carousel images
└── api/
    ├── upload-carousel-image.php
    └── delete-carousel-image.php

src/
├── services/
│   └── carouselService.ts    # API methods
└── pages/
    ├── AdminCarousel.tsx     # Admin interface
    └── HomeRedesigned.tsx    # Homepage carousel display

database/
├── carousel_schema.sql       # Table structure
└── storage_setup.sql        # Storage policies (optional)
```