import { supabase } from '../lib/supabase';

export interface NumerologyEntry {
  id: number;
  number: string;
  price: number;
  category_id?: number;
  is_active: boolean;
  is_sold: boolean;
  created_at: string;
  updated_at: string;
}

export interface NumerologyInput {
  number: string;
  price: number;
  category_id?: number;
  is_active?: boolean;
  is_sold?: boolean;
}

export const numerologyService = {
  // Get all numerology entries (admin)
  async getAllNumerologyEntries(): Promise<NumerologyEntry[]> {
    try {
      const { data, error } = await supabase
        .from('numerology')
        .select('*')
        .order('number', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching numerology entries:', error);
      return [];
    }
  },

  // Get active numerology entries (public)
  async getActiveNumerologyEntries(): Promise<NumerologyEntry[]> {
    try {
      const { data, error } = await supabase
        .from('numerology')
        .select('*')
        .eq('is_active', true)
        .eq('is_sold', false)
        .order('number', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching active numerology entries:', error);
      return [];
    }
  },

  // Get single numerology entry
  async getNumerologyEntry(id: number): Promise<NumerologyEntry | null> {
    try {
      const { data, error } = await supabase
        .from('numerology')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching numerology entry:', error);
      return null;
    }
  },

  // Get numerology by number
  async getNumerologyByNumber(number: number): Promise<NumerologyEntry | null> {
    try {
      const { data, error } = await supabase
        .from('numerology')
        .select('*')
        .eq('number', number)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching numerology by number:', error);
      return null;
    }
  },

  // Create numerology entry (admin)
  async createNumerologyEntry(input: NumerologyInput): Promise<NumerologyEntry | null> {
    try {
      const { data, error } = await supabase
        .from('numerology')
        .insert({
          ...input,
          is_active: input.is_active !== undefined ? input.is_active : true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating numerology entry:', error);
      return null;
    }
  },

  // Update numerology entry (admin)
  async updateNumerologyEntry(id: number, input: Partial<NumerologyInput>): Promise<NumerologyEntry | null> {
    try {
      const { data, error } = await supabase
        .from('numerology')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating numerology entry:', error);
      return null;
    }
  },

  // Delete numerology entry (admin)
  async deleteNumerologyEntry(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('numerology')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting numerology entry:', error);
      return false;
    }
  },

  // Calculate numerology number from any input
  calculateNumerologyNumber(input: string): number {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');

    // Calculate sum of all digits
    let sum = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    // Reduce to single digit (1-9)
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }

    return sum;
  },

  // Get numerology meaning for any number/text
  async getNumerologyMeaning(input: string): Promise<NumerologyEntry | null> {
    const numerologyNumber = this.calculateNumerologyNumber(input);
    return this.getNumerologyByNumber(numerologyNumber);
  },

  // Search numerology entries
  async searchNumerologyEntries(query: string): Promise<NumerologyEntry[]> {
    try {
      const { data, error } = await supabase
        .from('numerology')
        .select('*')
        .eq('is_active', true)
        .ilike('number', `%${query}%`)
        .order('number', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching numerology entries:', error);
      return [];
    }
  }
};