-- Create storage bucket for carousel images
INSERT INTO storage.buckets (id, name, public)
VALUES ('carousel-images', 'carousel-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for carousel images bucket

-- Allow public to view images
CREATE POLICY "Public can view carousel images" ON storage.objects
  FOR SELECT USING (bucket_id = 'carousel-images');

-- Allow authenticated admin users to upload images
CREATE POLICY "Admin users can upload carousel images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'carousel-images' AND
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Allow authenticated admin users to update images
CREATE POLICY "Admin users can update carousel images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'carousel-images' AND
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Allow authenticated admin users to delete images
CREATE POLICY "Admin users can delete carousel images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'carousel-images' AND
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );