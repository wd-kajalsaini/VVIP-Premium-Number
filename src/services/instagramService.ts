import { supabase } from '../lib/supabase';

// Instagram URL Management Service
export class InstagramService {

  // Get the current Instagram URL from database
  static async getInstagramUrl(): Promise<string | null> {
    try {
      // Simple direct query - should work with the new policies
      const { data, error } = await supabase
        .from('admin_users')
        .select('instagram_url')
        .not('instagram_url', 'is', null)
        .not('instagram_url', 'eq', '')
        .limit(1);

      if (error) {
        console.error('❌ Database error:', error);
        return null;
      }

      if (!data || data.length === 0) {
        return null;
      }

      const url = data[0]?.instagram_url;
      return url || null;
    } catch (error) {
      console.error('💥 Unexpected error fetching Instagram URL:', error);
      return null;
    }
  }

  // Update Instagram URL for current admin user
  static async updateInstagramUrl(url: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      // Validate URL format
      if (url && !this.isValidInstagramUrl(url)) {
        return { success: false, error: 'Invalid Instagram URL format' };
      }

      // Update the Instagram URL for current user
      const { error } = await supabase
        .from('admin_users')
        .update({
          instagram_url: url || null
        })
        .eq('id', user.id);

      if (error) {
        console.error('Database update error:', error);
        return { success: false, error: 'Failed to update Instagram URL' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating Instagram URL:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Clear Instagram URL
  static async clearInstagramUrl(): Promise<{ success: boolean; error?: string }> {
    return this.updateInstagramUrl('');
  }

  // Validate Instagram URL format
  static isValidInstagramUrl(url: string): boolean {
    const instagramPattern = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?(\?.*)?$/;
    return instagramPattern.test(url);
  }

  // Extract username from Instagram URL
  static extractUsername(url: string): string | null {
    try {
      const patterns = [
        /instagram\.com\/([^\/\?]+)/,
        /instagram\.com\/([^\/\?]+)\//,
        /instagram\.com\/([^\/\?]+)\?/
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1].replace(/[^a-zA-Z0-9._]/g, '');
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // Get Instagram URL with real-time updates
  static subscribeToInstagramUrl(callback: (url: string | null) => void) {
    const channel = supabase
      .channel('instagram_url_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'admin_users'
        },
        (payload) => {
          callback(payload.new.instagram_url);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
}