import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helper functions
export const authHelpers = {
  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },

  // Get user session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
};

// Database helper functions
export const dbHelpers = {
  // Get user profile
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Update user profile
  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...updates })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get user orders
  getOrders: async (userId: string, limit?: number) => {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_name,
          quantity,
          price,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Create order
  createOrder: async (orderData: any) => {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) throw orderError;
    return order;
  },

  // Create order items
  createOrderItems: async (orderId: string, items: any[]) => {
    const orderItems = items.map(item => ({
      order_id: orderId,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      image_url: item.image || item.imageUrl
    }));

    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (error) throw error;
    return data;
  }
};