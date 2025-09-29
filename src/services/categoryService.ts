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
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
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
          is_active: input.is_active ?? true
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
      const { data, error } = await supabase
        .from('categories')
        .update(input)
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