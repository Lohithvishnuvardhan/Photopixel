export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token?: string;
}