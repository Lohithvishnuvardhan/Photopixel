import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { useCart } from '../context/Cartcontext';
import toast from 'react-hot-toast';

interface ProductProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export function ProductCard({ _id, name, price, image, description }: ProductProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id,
      name,
      price,
      image,
      quantity: 1
    });
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    const item = {
      _id,
      name,
      price,
      image,
      quantity: 1
    };
    
    navigate('/payment', { 
      state: { 
        items: [item],
        totalAmount: price,
        isBuyNow: true
      } 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            In Stock
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ₹{price.toLocaleString()}
          </span>
          <div className="space-x-2">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}