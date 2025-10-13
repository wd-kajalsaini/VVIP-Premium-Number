import { supabase } from '../lib/supabase';

export interface VisitorStats {
  id: number;
  total_visits: number;
  last_updated: string;
}

export const visitorService = {
  // Get total visitor count
  async getVisitorCount(): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('visitor_stats')
        .select('total_visits')
        .single();

      if (error) {
        // If table doesn't exist or no data, return a default count
        console.warn('Error fetching visitor count:', error);
        return 0; // Default starting count
      }

      return data?.total_visits || 0;
    } catch (error) {
      console.error('Error fetching visitor count:', error);
      return 0;
    }
  },

  // Increment visitor count
  async incrementVisitorCount(): Promise<number> {
    try {
      // First, try to get the current count
      const { data: existing, error: fetchError } = await supabase
        .from('visitor_stats')
        .select('*')
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" - which is fine for first insert
        console.error('Error fetching visitor stats:', fetchError);
        return 0;
      }

      let newCount: number;

      if (!existing) {
        // First time - insert initial record
        const { data, error } = await supabase
          .from('visitor_stats')
          .insert({
            id: 1,
            total_visits: 1, // Starting from 0 + 1
            last_updated: new Date().toISOString()
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating visitor stats:', error);
          return 0;
        }

        newCount = data?.total_visits || 1;
      } else {
        // Increment existing count
        newCount = existing.total_visits + 1;

        const { error } = await supabase
          .from('visitor_stats')
          .update({
            total_visits: newCount,
            last_updated: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (error) {
          console.error('Error updating visitor count:', error);
          return existing.total_visits;
        }
      }

      return newCount;
    } catch (error) {
      console.error('Error incrementing visitor count:', error);
      return 0;
    }
  },

  // Format visitor count with leading zeros (6 digits)
  formatVisitorCount(count: number): string {
    return count.toString().padStart(6, '0');
  }
};
