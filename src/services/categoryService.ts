import { supabase } from '../lib/supabase';

export interface Category {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryInput {
  name: string;
  is_active?: boolean;
}

export const categoryService = {
  // Get all categories (admin)
  async getAllCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert is_active from smallint to boolean if needed
      return (data || []).map(cat => ({
        ...cat,
        is_active: Boolean(cat.is_active)
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get active categories (for public display)
  async getActiveCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', 1)
        .order('name', { ascending: true });

      if (error) throw error;

      // Convert is_active from smallint to boolean if needed
      return (data || []).map(cat => ({
        ...cat,
        is_active: Boolean(cat.is_active)
      }));
    } catch (error) {
      console.error('Error fetching active categories:', error);
      return [];
    }
  },

  // Get active categories that have at least one active phone number
  async getCategoriesWithActivePhoneNumbers(): Promise<Category[]> {
    try {
      // Get all active phone numbers with their categories
      const { data: phoneNumbers, error: phoneError } = await supabase
        .from('phone_numbers')
        .select('category_id')
        .eq('is_active', true)
        .eq('is_sold', false);

      if (phoneError) throw phoneError;

      // Extract unique category IDs that have active phone numbers
      const categoryIds = new Set<number>();
      (phoneNumbers || []).forEach(phone => {
        if (phone.category_id) {
          // Handle comma-separated category IDs
          const categoryIdStr = String(phone.category_id);
          if (categoryIdStr.includes(',')) {
            categoryIdStr.split(',').forEach(id => {
              const numId = parseInt(id.trim());
              if (!isNaN(numId)) {
                categoryIds.add(numId);
              }
            });
          } else {
            const numId = parseInt(categoryIdStr);
            if (!isNaN(numId)) {
              categoryIds.add(numId);
            }
          }
        }
      });

      if (categoryIds.size === 0) {
        return [];
      }

      // Fetch only categories that have active phone numbers
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', 1)
        .in('id', Array.from(categoryIds))
        .order('name', { ascending: true });

      if (error) throw error;

      // Convert is_active from smallint to boolean if needed
      return (data || []).map(cat => ({
        ...cat,
        is_active: Boolean(cat.is_active)
      }));
    } catch (error) {
      console.error('Error fetching categories with active phone numbers:', error);
      return [];
    }
  },


  // Get single category
  async getCategory(id: number): Promise<Category | null> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  },


  // Create category (admin)
  async createCategory(input: CategoryInput): Promise<Category | null> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          name: input.name,
          is_active: (input.is_active ?? true) ? 1 : 0
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      return null;
    }
  },

  // Update category (admin)
  async updateCategory(id: number, input: Partial<CategoryInput>): Promise<Category | null> {
    try {
      const updateData: any = { ...input };
      if (input.is_active !== undefined) {
        updateData.is_active = input.is_active ? 1 : 0;
      }

      const { data, error } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating category:', error);
      return null;
    }
  },

  // Delete category (admin)
  async deleteCategory(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  },


};