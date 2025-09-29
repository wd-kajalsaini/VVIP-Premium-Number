import { supabase } from '../lib/supabase';

export interface CarouselSlide {
  id: number;
  image: string;
  image_url?: string;
  isActive: boolean;
  display_order: number;
  createdAt: string;
  description?: string;
}

export interface CarouselSlideInput {
  image?: string;
  image_url?: string;
  isActive: boolean;
  display_order?: number;
  description?: string;
  imageFile?: File;
}

export const carouselService = {
  // Fetch all carousel slides from Supabase (for admin panel)
  async getAllCarouselSlides(): Promise<CarouselSlide[]> {
    try {
      const { data, error } = await supabase
        .from('carousel_slides')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching carousel slides:', error);
        return [];
      }

      // Transform database fields to match frontend interface
      return (data || []).map(slide => ({
        id: slide.id,
        image: slide.image_url,
        image_url: slide.image_url,
        isActive: slide.is_active,
        display_order: slide.display_order,
        createdAt: slide.created_at,
        description: slide.description
      }));
    } catch (error) {
      console.error('Error fetching carousel slides:', error);
      return [];
    }
  },

  // Preload image to ensure fast loading
  async preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  },

  // Preload multiple images concurrently
  async preloadImages(imageSources: string[]): Promise<void> {
    const preloadPromises = imageSources.map(src =>
      this.preloadImage(src).catch(error => {
        console.warn(`Failed to preload image ${src}:`, error);
        return Promise.resolve(); // Don't fail the entire batch for one image
      })
    );

    await Promise.all(preloadPromises);
  },

  // Fetch active carousel slides from Supabase (for public frontend)
  async getCarouselSlides(): Promise<CarouselSlide[]> {
    try {
      const { data, error } = await supabase
        .from('carousel_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching active carousel slides:', error);
        return [];
      }

      // Transform database fields to match frontend interface
      const slides = (data || []).map(slide => ({
        id: slide.id,
        image: slide.image_url,
        image_url: slide.image_url,
        isActive: slide.is_active,
        display_order: slide.display_order,
        createdAt: slide.created_at,
        description: slide.description
      }));

      // Preload images for faster display - prioritize first image
      const imageSources = slides
        .map(slide => slide.image_url || slide.image)
        .filter(Boolean);

      if (imageSources.length > 0) {
        // Preload first image immediately for faster initial display
        if (imageSources[0]) {
          await this.preloadImage(imageSources[0]).catch(() => {
            // Ignore errors for faster loading
          });
        }

        // Preload remaining images in background
        if (imageSources.length > 1) {
          this.preloadImages(imageSources.slice(1)).catch(() => {
            // Ignore errors for faster loading
          });
        }
      }

      return slides;
    } catch (error) {
      console.error('Error fetching active carousel slides:', error);
      return [];
    }
  },

  // Add new carousel slide (admin function)
  async addCarouselSlide(slide: CarouselSlideInput): Promise<CarouselSlide> {
    try {
      let imageUrl = slide.image || slide.image_url;

      // Upload image to Supabase storage if file is provided
      if (slide.imageFile) {
        const fileName = `carousel-${Date.now()}-${slide.imageFile.name}`;

        // First, check if bucket exists and create if needed
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(bucket => bucket.name === 'carousel-images');

        if (!bucketExists) {
          const { error: createError } = await supabase.storage.createBucket('carousel-images', {
            public: true
          });

          if (createError && !createError.message?.includes('already exists')) {
            console.error('Error creating storage bucket:', createError);
            // Fallback to using data URL if storage is not available
            const reader = new FileReader();
            imageUrl = await new Promise((resolve) => {
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(slide.imageFile!);
            });
          }
        }

        if (!imageUrl) {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('carousel-images')
            .upload(fileName, slide.imageFile);

          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            // Fallback to using data URL
            const reader = new FileReader();
            imageUrl = await new Promise((resolve) => {
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(slide.imageFile!);
            });
          } else {
            // Get public URL for the uploaded image
            const { data: { publicUrl } } = supabase.storage
              .from('carousel-images')
              .getPublicUrl(fileName);

            imageUrl = publicUrl;
          }
        }
      }

      // First, get the max display_order to add the new slide at the end
      const { data: maxOrderData } = await supabase
        .from('carousel_slides')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);

      const nextOrder = maxOrderData && maxOrderData.length > 0
        ? maxOrderData[0].display_order + 1
        : 0;

      const { data, error } = await supabase
        .from('carousel_slides')
        .insert({
          image_url: imageUrl,
          is_active: slide.isActive,
          display_order: slide.display_order !== undefined ? slide.display_order : nextOrder,
          description: slide.description || ''
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding carousel slide:', error);
        throw error;
      }

      return {
        id: data.id,
        image: data.image_url,
        image_url: data.image_url,
        isActive: data.is_active,
        display_order: data.display_order,
        createdAt: data.created_at,
        description: data.description
      };
    } catch (error) {
      console.error('Error adding carousel slide:', error);
      throw error;
    }
  },

  // Update carousel slide (admin function)
  async updateCarouselSlide(id: number, updates: Partial<CarouselSlideInput>): Promise<CarouselSlide> {
    try {
      const updateData: any = {};

      // Handle image upload if new file is provided
      if (updates.imageFile) {
        const fileName = `carousel-${Date.now()}-${updates.imageFile.name}`;

        // First, check if bucket exists and create if needed
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(bucket => bucket.name === 'carousel-images');

        if (!bucketExists) {
          const { error: createError } = await supabase.storage.createBucket('carousel-images', {
            public: true
          });

          if (createError && !createError.message?.includes('already exists')) {
            console.error('Error creating storage bucket:', createError);
            // Fallback to using data URL if storage is not available
            const reader = new FileReader();
            updateData.image_url = await new Promise((resolve) => {
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(updates.imageFile!);
            });
          }
        }

        if (!updateData.image_url) {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('carousel-images')
            .upload(fileName, updates.imageFile);

          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            // Fallback to using data URL
            const reader = new FileReader();
            updateData.image_url = await new Promise((resolve) => {
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(updates.imageFile!);
            });
          } else {
            // Get public URL for the uploaded image
            const { data: { publicUrl } } = supabase.storage
              .from('carousel-images')
              .getPublicUrl(fileName);

            updateData.image_url = publicUrl;
          }
        }
      } else if (updates.image !== undefined || updates.image_url !== undefined) {
        updateData.image_url = updates.image || updates.image_url;
      }

      if (updates.isActive !== undefined) {
        updateData.is_active = updates.isActive;
      }
      if (updates.display_order !== undefined) {
        updateData.display_order = updates.display_order;
      }
      if (updates.description !== undefined) {
        updateData.description = updates.description;
      }

      const { data, error } = await supabase
        .from('carousel_slides')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating carousel slide:', error);
        throw error;
      }

      return {
        id: data.id,
        image: data.image_url,
        image_url: data.image_url,
        isActive: data.is_active,
        display_order: data.display_order,
        createdAt: data.created_at,
        description: data.description
      };
    } catch (error) {
      console.error('Error updating carousel slide:', error);
      throw error;
    }
  },

  // Delete carousel slide (admin function)
  async deleteCarouselSlide(id: number): Promise<boolean> {
    try {
      // First, get the slide to find the image URL
      const { data: slideData, error: fetchError } = await supabase
        .from('carousel_slides')
        .select('image_url')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching slide:', fetchError);
        return false;
      }

      // Delete from database
      const { error } = await supabase
        .from('carousel_slides')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting carousel slide:', error);
        return false;
      }

      // Try to delete local image file (if not a data URL)
      if (slideData && slideData.image_url && !slideData.image_url.startsWith('data:')) {
        try {
          await this.deleteLocalImage(slideData.image_url);
        } catch (storageError) {
          console.warn('Could not delete image from local storage:', storageError);
          // Don't fail the operation if file deletion fails
        }
      }

      return true;
    } catch (error) {
      console.error('Error deleting carousel slide:', error);
      return false;
    }
  },

  // Update display order for multiple slides
  async updateDisplayOrder(slides: { id: number; display_order: number }[]): Promise<boolean> {
    try {
      // Update each slide's display order
      const updates = slides.map(slide =>
        supabase
          .from('carousel_slides')
          .update({ display_order: slide.display_order })
          .eq('id', slide.id)
      );

      await Promise.all(updates);
      return true;
    } catch (error) {
      console.error('Error updating display order:', error);
      return false;
    }
  },

  // Upload image to local public/adminImages folder
  async uploadImageToLocal(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload-carousel-image.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      return result.imagePath;
    } catch (error) {
      console.error('Error uploading image:', error);
      // Fallback to data URL if PHP upload fails
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          resolve(dataUrl);
        };
        reader.readAsDataURL(file);
      });
    }
  },

  // Delete local image file
  async deleteLocalImage(imagePath: string): Promise<void> {
    try {
      const response = await fetch('/api/delete-carousel-image.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imagePath })
      });

      if (!response.ok) {
        console.warn(`Failed to delete image: ${response.status}`);
      }
    } catch (error) {
      console.warn('Could not delete local image:', error);
    }
  }

};