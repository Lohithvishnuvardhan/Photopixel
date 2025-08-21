import React from 'react';
import { X, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center">
              <ShoppingCart className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">${item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => alert('Checkout functionality coming soon!')}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;