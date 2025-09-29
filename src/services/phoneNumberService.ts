import { supabase } from '../lib/supabase';

export interface PhoneNumber {
  id: number;
  number: string;
  display_number?: string;
  price: number;
  original_price?: number;
  sum_total_1?: number;
  sum_total_2?: number;
  sum_total_3?: number;
  highlights?: number[];
  category_id?: number;
  operator?: string;
  circle?: string;
  is_vvip: boolean;
  is_today_offer: boolean;
  is_featured: boolean;
  is_attractive: boolean;
  is_sold: boolean;
  is_active: boolean;
  description?: string;
  tags?: string[];
  view_count: number;
  inquiry_count: number;
  primary_image?: string;
  gallery_images?: string[];
  numerology_number?: number;
  numerology_meaning?: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface PhoneNumberInput {
  number: string;
  display_number?: string;
  price: number;
  original_price?: number;
  category_id?: number;
  operator?: string;
  circle?: string;
  is_vvip?: boolean;
  is_today_offer?: boolean;
  is_featured?: boolean;
  is_attractive?: boolean;
  is_sold?: boolean;
  is_active?: boolean;
  description?: string;
  tags?: string[];
  primary_image?: string;
  gallery_images?: string[];
  numerology_meaning?: string;
  meta_title?: string;
  meta_description?: string;
}

// Helper function to calculate sum totals
const calculateSumTotals = (number: string) => {
  const digits = number.replace(/\D/g, '');

  // First sum: sum of all digits
  const sum1 = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Second sum: sum of first sum's digits
  const sum2 = sum1.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Third sum: sum of second sum's digits
  const sum3 = sum2.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  return { sum1, sum2, sum3 };
};

// Helper function to find highlight positions
const findHighlights = (number: string): number[] => {
  const highlights: number[] = [];
  const digits = number.replace(/\D/g, '');

  // Find repeating sequences
  for (let i = 0; i < digits.length - 2; i++) {
    if (digits[i] === digits[i + 1] && digits[i] === digits[i + 2]) {
      highlights.push(i, i + 1, i + 2);
    }
  }

  // Find patterns like 123, 789, etc.
  for (let i = 0; i < digits.length - 2; i++) {
    const d1 = parseInt(digits[i]);
    const d2 = parseInt(digits[i + 1]);
    const d3 = parseInt(digits[i + 2]);

    if (d2 === d1 + 1 && d3 === d2 + 1) {
      highlights.push(i, i + 1, i + 2);
    }
  }

  // Remove duplicates and sort
  return Array.from(new Set(highlights)).sort((a, b) => a - b);
};

export const phoneNumberService = {
  // Get all phone numbers (admin)
  async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    try {
      const { data, error } = await supabase
        .from('phone_numbers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
      return [];
    }
  },

  // Get active phone numbers (public)
  async getActivePhoneNumbers(filters?: {
    is_vvip?: boolean;
    is_today_offer?: boolean;
    is_featured?: boolean;
    is_attractive?: boolean;
    category_id?: number;
    operator?: string;
    circle?: string;
    min_price?: number;
    max_price?: number;
    search?: string;
  }): Promise<PhoneNumber[]> {
    try {
      let query = supabase
        .from('phone_numbers')
        .select('*')
        .eq('is_active', true)
        .eq('is_sold', false);

      // Apply filters
      if (filters?.is_vvip !== undefined) {
        query = query.eq('is_vvip', filters.is_vvip);
      }
      if (filters?.is_today_offer !== undefined) {
        query = query.eq('is_today_offer', filters.is_today_offer);
      }
      if (filters?.is_featured !== undefined) {
        query = query.eq('is_featured', filters.is_featured);
      }
      if (filters?.is_attractive !== undefined) {
        query = query.eq('is_attractive', filters.is_attractive);
      }
      if (filters?.category_id) {
        query = query.eq('category_id', filters.category_id);
      }
      if (filters?.operator) {
        query = query.eq('operator', filters.operator);
      }
      if (filters?.circle) {
        query = query.eq('circle', filters.circle);
      }
      if (filters?.min_price) {
        query = query.gte('price', filters.min_price);
      }
      if (filters?.max_price) {
        query = query.lte('price', filters.max_price);
      }
      if (filters?.search) {
        query = query.or(`number.ilike.%${filters.search}%,display_number.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching active phone numbers:', error);
      return [];
    }
  },

  // Get single phone number
  async getPhoneNumber(id: number): Promise<PhoneNumber | null> {
    try {
      const { data, error } = await supabase
        .from('phone_numbers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Increment view count
      await supabase
        .from('phone_numbers')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', id);

      return data;
    } catch (error) {
      console.error('Error fetching phone number:', error);
      return null;
    }
  },

  // Create phone number (admin)
  async createPhoneNumber(input: PhoneNumberInput): Promise<PhoneNumber | null> {
    try {
      // Calculate sum totals and highlights
      const { sum1, sum2, sum3 } = calculateSumTotals(input.number);
      const highlights = findHighlights(input.number);

      // Calculate numerology number (final single digit)
      let numerologyNumber = sum3;
      while (numerologyNumber > 9) {
        numerologyNumber = numerologyNumber.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
      }

      const { data, error } = await supabase
        .from('phone_numbers')
        .insert({
          ...input,
          sum_total_1: sum1,
          sum_total_2: sum2,
          sum_total_3: sum3,
          highlights,
          numerology_number: numerologyNumber,
          is_vvip: input.is_vvip || false,
          is_today_offer: input.is_today_offer || false,
          is_featured: input.is_featured || false,
          is_attractive: input.is_attractive || false,
          is_sold: input.is_sold || false,
          is_active: input.is_active !== undefined ? input.is_active : true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating phone number:', error);
      return null;
    }
  },

  // Update phone number (admin)
  async updatePhoneNumber(id: number, input: Partial<PhoneNumberInput>): Promise<PhoneNumber | null> {
    try {
      const updateData: any = { ...input };

      // Recalculate if number changed
      if (input.number) {
        const { sum1, sum2, sum3 } = calculateSumTotals(input.number);
        const highlights = findHighlights(input.number);

        let numerologyNumber = sum3;
        while (numerologyNumber > 9) {
          numerologyNumber = numerologyNumber.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        }

        updateData.sum_total_1 = sum1;
        updateData.sum_total_2 = sum2;
        updateData.sum_total_3 = sum3;
        updateData.highlights = highlights;
        updateData.numerology_number = numerologyNumber;
      }

      const { data, error } = await supabase
        .from('phone_numbers')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating phone number:', error);
      return null;
    }
  },

  // Delete phone number (admin)
  async deletePhoneNumber(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('phone_numbers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting phone number:', error);
      return false;
    }
  },

  // Bulk update today's offer status
  async updateTodayOffers(ids: number[], status: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('phone_numbers')
        .update({ is_today_offer: status })
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating today offers:', error);
      return false;
    }
  },

  // Bulk update VVIP status
  async updateVVIPStatus(ids: number[], status: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('phone_numbers')
        .update({ is_vvip: status })
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating VVIP status:', error);
      return false;
    }
  },

  // Get today's offers
  async getTodayOffers(): Promise<PhoneNumber[]> {
    return this.getActivePhoneNumbers({ is_today_offer: true });
  },

  // Get VVIP numbers
  async getVVIPNumbers(): Promise<PhoneNumber[]> {
    return this.getActivePhoneNumbers({ is_vvip: true });
  },

  // Get featured numbers
  async getFeaturedNumbers(): Promise<PhoneNumber[]> {
    return this.getActivePhoneNumbers({ is_featured: true });
  },

  // Get attractive numbers
  async getAttractiveNumbers(): Promise<PhoneNumber[]> {
    return this.getActivePhoneNumbers({ is_attractive: true });
  },

  // Search phone numbers
  async searchPhoneNumbers(query: string): Promise<PhoneNumber[]> {
    return this.getActivePhoneNumbers({ search: query });
  },

  // Upload image
  async uploadImage(file: File, type: 'primary' | 'gallery'): Promise<string | null> {
    try {
      const fileName = `phone-${type}-${Date.now()}-${file.name}`;

      // Create bucket if it doesn't exist
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'phone-images');

      if (!bucketExists) {
        await supabase.storage.createBucket('phone-images', { public: true });
      }

      // Upload file
      const { data, error } = await supabase.storage
        .from('phone-images')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('phone-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }
};