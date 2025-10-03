import { supabase } from '../lib/supabase';

export interface CurrencyNumber {
  id: number;
  serial_number: string;
  category_id?: number;
  price: number;
  is_sold: boolean;
  is_active: boolean;
  primary_image?: string;
  created_at: string;
  updated_at: string;
}

export interface CurrencyNumberInput {
  serial_number: string;
  category_id?: number;
  price: number;
  is_sold?: boolean;
  is_active?: boolean;
  primary_image?: string;
}


export const currencyNumberService = {
  // Get all currency numbers (admin)
  async getAllCurrencyNumbers(): Promise<CurrencyNumber[]> {
    try {
      const { data, error } = await supabase
        .from('currency_numbers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching currency numbers:', error);
      return [];
    }
  },

  // Get active currency numbers (public)
  async getActiveCurrencyNumbers(filters?: {
    is_rare?: boolean;
    is_today_offer?: boolean;
    is_featured?: boolean;
    category_id?: number;
    min_price?: number;
    max_price?: number;
    search?: string;
  }): Promise<CurrencyNumber[]> {
    try {
      let query = supabase
        .from('currency_numbers')
        .select('*')
        .eq('is_active', true)
        .eq('is_sold', false);

      // Apply filters
      if (filters?.is_rare !== undefined) {
        query = query.eq('is_rare', filters.is_rare);
      }
      if (filters?.is_today_offer !== undefined) {
        query = query.eq('is_today_offer', filters.is_today_offer);
      }
      if (filters?.is_featured !== undefined) {
        query = query.eq('is_featured', filters.is_featured);
      }
      if (filters?.category_id) {
        query = query.eq('category_id', filters.category_id);
      }
      if (filters?.min_price) {
        query = query.gte('price', filters.min_price);
      }
      if (filters?.max_price) {
        query = query.lte('price', filters.max_price);
      }
      if (filters?.search) {
        query = query.or(`serial_number.ilike.%${filters.search}%,description.ilike.%${filters.search}%,pattern_type.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching active currency numbers:', error);
      return [];
    }
  },

  // Get single currency number
  async getCurrencyNumber(id: number): Promise<CurrencyNumber | null> {
    try {
      const { data, error } = await supabase
        .from('currency_numbers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching currency number:', error);
      return null;
    }
  },

  // Create currency number (admin)
  async createCurrencyNumber(input: CurrencyNumberInput): Promise<CurrencyNumber | null> {
    try {
      const { data, error } = await supabase
        .from('currency_numbers')
        .insert({
          ...input,
          is_sold: input.is_sold || false,
          is_active: input.is_active !== undefined ? input.is_active : true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating currency number:', error);
      return null;
    }
  },

  // Update currency number (admin)
  async updateCurrencyNumber(id: number, input: Partial<CurrencyNumberInput>): Promise<CurrencyNumber | null> {
    try {
      const { data, error } = await supabase
        .from('currency_numbers')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating currency number:', error);
      return null;
    }
  },

  // Delete currency number (admin)
  async deleteCurrencyNumber(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('currency_numbers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting currency number:', error);
      return false;
    }
  },

  // Bulk update today's offer status
  async updateTodayOffers(ids: number[], status: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('currency_numbers')
        .update({ is_today_offer: status })
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating today offers:', error);
      return false;
    }
  },

  // Bulk update rare status
  async updateRareStatus(ids: number[], status: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('currency_numbers')
        .update({ is_rare: status })
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating rare status:', error);
      return false;
    }
  },

  // Get today's offers
  async getTodayOffers(): Promise<CurrencyNumber[]> {
    return this.getActiveCurrencyNumbers({ is_today_offer: true });
  },

  // Get rare numbers
  async getRareNumbers(): Promise<CurrencyNumber[]> {
    return this.getActiveCurrencyNumbers({ is_rare: true });
  },

  // Get featured numbers
  async getFeaturedNumbers(): Promise<CurrencyNumber[]> {
    return this.getActiveCurrencyNumbers({ is_featured: true });
  },

  // Search currency numbers
  async searchCurrencyNumbers(query: string): Promise<CurrencyNumber[]> {
    return this.getActiveCurrencyNumbers({ search: query });
  },

  // Upload image
  async uploadImage(file: File, type: 'primary' | 'gallery'): Promise<string | null> {
    try {
      const fileName = `currency-${type}-${Date.now()}-${file.name}`;

      // Create bucket if it doesn't exist
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'currency-images');

      if (!bucketExists) {
        await supabase.storage.createBucket('currency-images', { public: true });
      }

      // Upload file
      const { data, error } = await supabase.storage
        .from('currency-images')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('currency-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }
};