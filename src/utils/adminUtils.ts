import { supabase } from './supabase';

export const adminUtils = {
  // Check if current user is admin
  isAdmin: async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('is_admin');
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      return data || false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },

  // Get user profile with role
  getUserProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },

  // Make a user admin (only works if current user is admin or via SQL)
  makeUserAdmin: async (userEmail: string) => {
    try {
      const { error } = await supabase.rpc('make_user_admin', {
        user_email: userEmail
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error making user admin:', error);
      throw error;
    }
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
};