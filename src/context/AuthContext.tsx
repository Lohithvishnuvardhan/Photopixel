import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, dbHelpers } from '../utils/supabase';
import toast from 'react-hot-toast';

interface UserProfile {
  profileImage: any;
  name: string;
  email: string;
  phoneNumber: string;
  role?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface Order {
  _id: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    image: string;
    price: number;
  }>;
  totalPrice: number;
  status: string;
  createdAt: string;
  shippingAddress?: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  orders: Order[];
  pendingAction: { type: 'cart' | 'buyNow'; product: any } | null;
  setPendingAction: (action: { type: 'cart' | 'buyNow'; product: any } | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (profileData: UserProfile) => Promise<void>;
  addOrder: (order: Order) => void;
  getOrders: () => Order[];
}

const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pendingAction, setPendingAction] = useState<{ type: 'cart' | 'buyNow'; product: any } | null>(null);

  // Check admin status when user changes
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const profile = await dbHelpers.getProfile(user.id);
          setIsAdmin(profile?.role === 'admin');
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);
  // Load profile and orders from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedOrders = localStorage.getItem('userOrders');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // Set default profile
      const defaultProfile: UserProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1 234 567 8900',
        role: 'user',
        address: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA'
        },
        profileImage: undefined
      };
      setUserProfile(defaultProfile);
      localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Set demo mode defaults
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    let subscription: { unsubscribe: () => void; };
    try {
      const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
        async (event: string, session: Session | null) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);

          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in!');
          } else if (event === 'SIGNED_OUT') {
            toast.success('Successfully signed out!');
          }
        }
      );
      subscription = authSubscription;
    } catch (error) {
      console.error('Auth state change listener error:', error);
    }

    return () => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password
    });
    if (error) throw error;
  };

  const updateProfile = async (profileData: UserProfile) => {
    setUserProfile(profileData);
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  };

  const addOrder = (order: Order) => {
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
  };

  const getOrders = () => {
    return orders;
  };

  const value = {
    user,
    session,
    loading,
    userProfile,
    isAdmin,
    orders,
    pendingAction,
    setPendingAction,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    addOrder,
    getOrders,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};