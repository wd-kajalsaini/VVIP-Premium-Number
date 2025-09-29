-- Carousel slides table
CREATE TABLE IF NOT EXISTS carousel_slides (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add trigger for updated_at
CREATE TRIGGER update_carousel_slides_updated_at
  BEFORE UPDATE ON carousel_slides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE carousel_slides ENABLE ROW LEVEL SECURITY;

-- Admin policies for carousel slides
CREATE POLICY "Admin users can view all carousel slides" ON carousel_slides
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can insert carousel slides" ON carousel_slides
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can update carousel slides" ON carousel_slides
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admin users can delete carousel slides" ON carousel_slides
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Public policy for frontend to read active slides
CREATE POLICY "Anyone can view active carousel slides" ON carousel_slides
  FOR SELECT USING (is_active = true);

-- Insert sample carousel slides
INSERT INTO carousel_slides (image_url, display_order, is_active, description) VALUES
  ('/hero2.jpeg', 0, true, 'Premium number showcase'),
  ('/hero3.jpeg', 1, true, 'Lucky numbers based on numerology'),
  ('/hero2.jpeg', 2, true, 'Instant activation available')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX idx_carousel_slides_active ON carousel_slides(is_active);
CREATE INDEX idx_carousel_slides_order ON carousel_slides(display_order);