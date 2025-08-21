// Mock API for frontend-only application
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  login: async (data: any) => {
    await mockDelay();
    return {
      success: true,
      _id: 'user_1',
      name: 'John Doe',
      email: data.email,
      isAdmin: false,
      token: 'mock_token_123'
    };
  },
  
  register: async (data: { name: string; email: string; password: string }) => {
    await mockDelay();
    return {
      success: true,
      _id: 'user_1',
      name: data.name,
      email: data.email,
      isAdmin: false,
      token: 'mock_token_123'
    };
  },
  
  logout: async () => {
    await mockDelay();
    return { success: true };
  },
  
  getProfile: async () => {
    await mockDelay();
    return {
      _id: 'user_1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1 234 567 8900'
    };
  },
};

export const orderAPI = {
  createOrder: async (data: any) => {
    await mockDelay();
    return {
      data: {
        _id: 'order_' + Date.now(),
        ...data,
        status: 'Processing',
        createdAt: new Date().toISOString()
      }
    };
  },
  
  getOrders: async () => {
    await mockDelay();
    return {
      data: [
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
      ]
    };
  },
  
  getOrder: async (id: string) => {
    await mockDelay();
    return {
      data: {
        _id: id,
        orderItems: [],
        totalPrice: 0,
        status: 'Processing',
        createdAt: new Date().toISOString()
      }
    };
  },
  
  updateOrder: async (id: string, data: any) => {
    await mockDelay();
    return { data: { success: true } };
  },
};

export const productAPI = {
  getProducts: async () => {
    await mockDelay();
    return {
      data: [
        {
          _id: '1',
          name: 'Canon EOS R5',
          price: 324900,
          imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
          description: '45MP Full-Frame Mirrorless Camera',
          category: 'Cameras',
          stock: 10
        }
      ]
    };
  },
  
  getProduct: async (id: string) => {
    await mockDelay();
    return {
      data: {
        _id: id,
        name: 'Canon EOS R5',
        price: 324900,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
        description: '45MP Full-Frame Mirrorless Camera',
        category: 'Cameras',
        stock: 10
      }
    };
  },
};

// Mock API instance
const api = {
  get: async (url: string) => {
    await mockDelay();
    return { data: [] };
  },
  post: async (url: string, data: any) => {
    await mockDelay();
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

export default api;