import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface BuyNowItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  buyNowItems: BuyNowItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToBuyNow: (product: Product) => void;
  clearBuyNow: () => void;
  total: number;
  buyNowTotal: number;
  checkout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      buyNowItems: [],
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find(item => item.product._id === product._id);
        
        if (existingItem) {
          if (existingItem.quantity < product.stock) {
            set({
              items: items.map(item =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
          }
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product._id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map(item =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      addToBuyNow: (product) => {
        const buyNowItems = get().buyNowItems;
        const newItem = {
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.imageUrl
        };
        set({ buyNowItems: [...buyNowItems, newItem] });
      },
      clearBuyNow: () => set({ buyNowItems: [] }),
      get total() {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },
      get buyNowTotal() {
        return get().buyNowItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
      checkout: async () => {
        try {
          const items = get().items;
          const total = get().total;

          const order = {
            items: items.map(item => ({
              product: item.product._id,
              quantity: item.quantity,
              price: item.product.price
            })),
            totalAmount: total
          };

          await api.post('/orders', order);
          set({ items: [] });
        } catch (error) {
          console.error('Checkout error:', error);
          throw error;
        }
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);