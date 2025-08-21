import React, { createContext, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isLoading: false,
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item._id === product._id);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          // Temporarily disabled auth-dependent toast
          // toast.success(`${product.name} added to cart!`);
          
          return {
            items: [...state.items, {
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.imageUrl || product.image,
              quantity: 1
            }],
          };
        }
        )
        toast.success(`${product.name} added to cart!`);
      },
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item._id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => {
        set({ items: [] });
        localStorage.removeItem('cart');
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

const CartContext = createContext<CartStore | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useCartStore();

  return (
    <CartContext.Provider value={store}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};