import { supabase } from '../lib/supabase';

export interface PhoneNumber {
  id: number;
  number: string;
  price: number;
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
  view_count: number;
  inquiry_count: number;
  created_at: string;
  updated_at: string;
}

export interface PhoneNumberInput {
  number: string;
  price: number;
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
      const insertData: any = {
        number: input.number,
        price: input.price,
        is_vvip: input.is_vvip || false,
        is_today_offer: input.is_today_offer || false,
        is_featured: input.is_featured || false,
        is_attractive: input.is_attractive || false,
        is_sold: input.is_sold || false,
        is_active: input.is_active !== undefined ? input.is_active : true
      };

      // Only include optional fields if defined
      if (input.category_id) insertData.category_id = input.category_id;
      if (input.operator) insertData.operator = input.operator;
      if (input.circle) insertData.circle = input.circle;
      if (input.description) insertData.description = input.description;

      const { data, error } = await supabase
        .from('phone_numbers')
        .insert(insertData)
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
      const updateData: any = {};

      // Only include defined fields
      if (input.number !== undefined) updateData.number = input.number;
      if (input.price !== undefined) updateData.price = input.price;
      if (input.category_id !== undefined) updateData.category_id = input.category_id;
      if (input.operator !== undefined) updateData.operator = input.operator;
      if (input.circle !== undefined) updateData.circle = input.circle;
      if (input.is_vvip !== undefined) updateData.is_vvip = input.is_vvip;
      if (input.is_today_offer !== undefined) updateData.is_today_offer = input.is_today_offer;
      if (input.is_featured !== undefined) updateData.is_featured = input.is_featured;
      if (input.is_attractive !== undefined) updateData.is_attractive = input.is_attractive;
      if (input.is_sold !== undefined) updateData.is_sold = input.is_sold;
      if (input.is_active !== undefined) updateData.is_active = input.is_active;
      if (input.description !== undefined) updateData.description = input.description;

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
  async getFeaturedNumbers(limit?: number): Promise<PhoneNumber[]> {
    try {
      let query = supabase
        .from('phone_numbers')
        .select('*')
        .eq('is_active', true)
        .eq('is_sold', false)
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured numbers:', error);
      return [];
    }
  },

  // Get featured numbers with pagination
  async getFeaturedNumbersPaginated(offset: number = 0, limit: number = 20): Promise<PhoneNumber[]> {
    try {
      const { data, error } = await supabase
        .from('phone_numbers')
        .select('*')
        .eq('is_active', true)
        .eq('is_sold', false)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured numbers:', error);
      return [];
    }
  },

  // Get attractive numbers
  async getAttractiveNumbers(): Promise<PhoneNumber[]> {
    return this.getActivePhoneNumbers({ is_attractive: true });
  },

  // Search phone numbers
  async searchPhoneNumbers(query: string): Promise<PhoneNumber[]> {
    return this.getActivePhoneNumbers({ search: query });
  }
};