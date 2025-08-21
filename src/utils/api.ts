// Mock API utilities for frontend-only application
import toast from 'react-hot-toast';

// Mock delay to simulate network requests
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockProducts = [
  {
    _id: '1',
    name: 'Canon EOS R5',
    price: 324900,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    description: '45MP Full-Frame Mirrorless Camera',
    category: 'Cameras',
    stock: 10
  },
  {
    _id: '2',
    name: 'Sony A7 IV',
    price: 209990,
    imageUrl: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    description: '33MP Full-Frame Mirrorless Camera',
    category: 'Cameras',
    stock: 15
  },
  // Add more mock products as needed
];

const mockOrders = [
  {
    _id: 'order_1',
    orderItems: [
      {
        name: 'Canon EOS R5',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
        price: 324900
      }
    ],
    totalPrice: 324900,
    status: 'Processing',
    createdAt: new Date().toISOString()
  }
];

// Mock API object
const api = {
  get: async (url: string) => {
    await mockDelay();
    
    if (url === '/products') {
      return { data: mockProducts };
    }
    
    if (url === '/orders/myorders') {
      return { data: mockOrders };
    }
    
    if (url === '/users/profile') {
      return {
        data: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: '+1 234 567 8900'
        }
      };
    }
    
    return { data: [] };
  },
  
  post: async (url: string, data: any) => {
    await mockDelay();
    
    if (url === '/orders') {
      const newOrder = {
        _id: 'order_' + Date.now(),
        ...data,
        status: 'Processing',
        createdAt: new Date().toISOString()
      };
      mockOrders.unshift(newOrder);
      return { data: newOrder };
    }
    
    return { data: { success: true } };
  },
  
  put: async (url: string, data: any) => {
    await mockDelay();
    return { data: { success: true } };
  },
  
  delete: async (url: string) => {
    await mockDelay();
    return { data: { success: true } };
  }
};

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  status?: string;
}

export const orderAPI = {
  getOrders: async () => {
    try {
      const response = await api.get('/orders/myorders');
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch orders');
    }
  },

  createOrder: async (orderData: any) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to create order');
    }
  }
};

export type { Product };
export default api;