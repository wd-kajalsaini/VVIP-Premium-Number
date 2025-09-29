import { supabase } from '../lib/supabase';

export interface VehicleNumber {
  id: number;
  vehicle_number: string;
  state: string;
  rto_code?: string;
  vehicle_type: 'car' | 'bike';
  price: number;
  category_id?: number;
  is_vip: boolean;
  is_todays_offer: boolean;
  is_active: boolean;
  is_sold: boolean;
  offer_price?: number;
  created_at: string;
  updated_at: string;
}

export interface VehicleNumberInput {
  vehicle_number: string;
  state: string;
  rto_code?: string;
  vehicle_type: 'car' | 'bike';
  price: number;
  category_id?: number;
  is_vip?: boolean;
  is_todays_offer?: boolean;
  is_active?: boolean;
  is_sold?: boolean;
  offer_price?: number;
}


export const vehicleNumberService = {
  // Get all vehicle numbers (admin)
  async getAllVehicleNumbers(): Promise<VehicleNumber[]> {
    try {
      const { data, error } = await supabase
        .from('car_numbers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching vehicle numbers:', error);
      return [];
    }
  },

  // Get active vehicle numbers (public)
  async getActiveVehicleNumbers(filters?: {
    is_vip?: boolean;
    is_todays_offer?: boolean;
    category_id?: number;
    state?: string;
    vehicle_type?: 'car' | 'bike';
    min_price?: number;
    max_price?: number;
    search?: string;
  }): Promise<VehicleNumber[]> {
    try {
      let query = supabase
        .from('car_numbers')
        .select('*')
        .eq('is_active', true)
        .eq('is_sold', false);

      // Apply filters
      if (filters?.is_vip !== undefined) {
        query = query.eq('is_vip', filters.is_vip);
      }
      if (filters?.is_todays_offer !== undefined) {
        query = query.eq('is_todays_offer', filters.is_todays_offer);
      }
      if (filters?.category_id) {
        query = query.eq('category_id', filters.category_id);
      }
      if (filters?.state) {
        query = query.eq('state', filters.state);
      }
      if (filters?.vehicle_type) {
        query = query.eq('vehicle_type', filters.vehicle_type);
      }
      if (filters?.min_price) {
        query = query.gte('price', filters.min_price);
      }
      if (filters?.max_price) {
        query = query.lte('price', filters.max_price);
      }
      if (filters?.search) {
        query = query.or(`vehicle_number.ilike.%${filters.search}%,state.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching active vehicle numbers:', error);
      return [];
    }
  },

  // Get single vehicle number
  async getVehicleNumber(id: number): Promise<VehicleNumber | null> {
    try {
      const { data, error } = await supabase
        .from('car_numbers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching vehicle number:', error);
      return null;
    }
  },

  // Create vehicle number (admin)
  async createVehicleNumber(input: VehicleNumberInput): Promise<VehicleNumber | null> {
    try {
      const { data, error } = await supabase
        .from('car_numbers')
        .insert({
          ...input,
          is_vip: input.is_vip || false,
          is_todays_offer: input.is_todays_offer || false,
          is_sold: input.is_sold || false,
          is_active: input.is_active !== undefined ? input.is_active : true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating vehicle number:', error);
      return null;
    }
  },

  // Update vehicle number (admin)
  async updateVehicleNumber(id: number, input: Partial<VehicleNumberInput>): Promise<VehicleNumber | null> {
    try {
      const { data, error } = await supabase
        .from('car_numbers')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating vehicle number:', error);
      return null;
    }
  },

  // Delete vehicle number (admin)
  async deleteVehicleNumber(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('car_numbers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting vehicle number:', error);
      return false;
    }
  },

  // Bulk update today's offer status
  async updateTodayOffers(ids: number[], status: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('car_numbers')
        .update({ is_todays_offer: status })
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating today offers:', error);
      return false;
    }
  },

  // Bulk update VIP status
  async updateVIPStatus(ids: number[], status: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('car_numbers')
        .update({ is_vip: status })
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating VIP status:', error);
      return false;
    }
  },

  // Get today's offers
  async getTodayOffers(): Promise<VehicleNumber[]> {
    return this.getActiveVehicleNumbers({ is_todays_offer: true });
  },

  // Get VIP numbers
  async getVIPNumbers(): Promise<VehicleNumber[]> {
    return this.getActiveVehicleNumbers({ is_vip: true });
  },

  // Search vehicle numbers
  async searchVehicleNumbers(query: string): Promise<VehicleNumber[]> {
    return this.getActiveVehicleNumbers({ search: query });
  }
};