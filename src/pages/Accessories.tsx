import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { Shield, Truck, Clock, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cart';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const staticAccessories = [
  {
    id: 9,
    name: 'Peak Design Camera Strap',
    price: 5990,
    image: "https://i.postimg.cc/qvDwt1Y7/Access1.avif",
    description: 'Professional Camera Strap with Quick-Release System',
    specs: [
      'Quick-Release System for Easy Attachment',
      'Adjustable Length from 38" to 57"',
      'Dual Adjustment Points',
      'Aircraft-Grade Aluminum Hardware',
      'Weatherproof Construction',
      'Lifetime Warranty'
    ],
    features: [
      'Compatible with All Camera Types',
      'Comfort-Padded Design',
      'Anti-Slip Technology'
    ],
    inStock: true,
    isProGrade: true
  },
  {
    id: 10,
    name: 'Manfrotto MT055XPRO4 Tripod',
    price: 24990,
    image: "https://m.media-amazon.com/images/I/51UFAE2RyDL._AC_UF1000,1000_QL80_.jpg",
    description: 'Professional Carbon Fiber Tripod with Advanced Features',
    specs: [
      'Carbon Fiber Construction',
      'Maximum Height: 170cm',
      'Minimum Height: 9cm',
      'Load Capacity: 9kg',
      'Weight: 2.1kg',
      'Quick Power Lock System'
    ],
    features: [
      '90° Column System',
      'Easy Link Connection',
      'Bubble Level Included'
    ],
    inStock: true,
    isProGrade: true
  },
  {
    id: 11,
    name: 'Godox V1 Flash',
    price: 32990,
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80",
    description: 'Professional Round Head Flash with Advanced Features',
    specs: [
      'Round Head Design',
      '2.4GHz Wireless System',
      '1/8000s High-Speed Sync',
      'Magnetic Modifier Mount',
      'Li-ion Battery: 480 Full Power Flashes',
      'Recycle Time: 1.5s at Full Power'
    ],
    features: [
      'TTL Auto Flash',
      'Built-in 2.4GHz X System',
      'AD200 Battery Compatible'
    ],
    inStock: true,
    isProGrade: true
  },
  {
    id: 12,
    name: 'Peak Design Everyday Backpack',
    price: 21990,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80",
    description: 'Professional Camera Backpack with Innovative Design',
    specs: [
      '30L Capacity',
      'Weatherproof 400D Nylon Canvas',
      'Padded Laptop Sleeve (15")',
      'Tablet Sleeve (12.9")',
      'Weight: 1.8kg',
      'External Carry Straps'
    ],
    features: [
      'MagLatch Top Access',
      'Dual Side Access',
      'FlexFold Dividers'
    ],
    inStock: true,
    isProGrade: true
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const Accessories = () => {
  const { addToCart } = useCart();
  const { addToBuyNow, buyNowItems, buyNowTotal } = useCartStore();
  const navigate = useNavigate();
  const [allAccessories, setAllAccessories] = useState([...staticAccessories]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminAccessories = async () => {
      try {
        const response = await api.get('/products');
        const adminAccessories = response.data.filter((product: any) => 
          product.category === 'Accessories' && 
          !staticAccessories.some(acc => acc.id === product._id)
        );

        const formattedAdminAccessories = adminAccessories.map((acc: any) => ({
          ...acc,
          id: acc._id,
          specs: acc.specs || [
            'Professional Grade Construction',
            'Durable Materials',
            'Premium Build Quality',
            'Advanced Features',
            'Ergonomic Design',
            'Universal Compatibility'
          ],
          features: acc.features || [
            'High-Quality Build',
            'User-Friendly Design',
            'Versatile Usage'
          ],
          inStock: acc.stock > 0,
          isProGrade: true,
          image: acc.imageUrl
        }));

        setAllAccessories([...staticAccessories, ...formattedAdminAccessories]);
      } catch (error) {
        console.error('Error fetching accessories:', error);
        toast.error('Failed to fetch additional accessories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminAccessories();
  }, []);

  const handleAddToCart = (accessory: any) => {
    const product = {
      _id: accessory._id || accessory.id,
      name: accessory.name,
      price: accessory.price,
      description: accessory.description,
      imageUrl: accessory.imageUrl || accessory.image,
      category: 'Accessories',
      stock: accessory.stock || 10
    };
    
    addToCart(product);
    toast.success(`${accessory.name} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleBuyNow = (accessory: any) => {
    const product = {
      _id: accessory._id || accessory.id,
      name: accessory.name,
      price: accessory.price,
      description: accessory.description,
      imageUrl: accessory.imageUrl || accessory.image,
      category: 'Accessories',
      stock: accessory.stock || 10
    };

    addToBuyNow(product);
    
    navigate('/payment', { 
      state: { 
        items: [...buyNowItems, {
          _id: accessory._id || accessory.id,
          name: accessory.name,
          price: accessory.price,
          quantity: 1,
          image: accessory.imageUrl || accessory.image
        }],
        totalAmount: buyNowTotal + accessory.price,
        isBuyNow: true
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Professional Accessories</h1>
            <p className="mt-2 text-gray-600">Essential gear for your photography needs</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <Truck className="h-5 w-5 mr-2" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center text-purple-600">
              <Shield className="h-5 w-5 mr-2" />
              <span>Warranty Included</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {allAccessories.map((accessory) => (
            <div key={accessory.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="relative">
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Professional Grade
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {accessory.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{accessory.name}</h3>
                    <p className="text-gray-600">{accessory.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {accessory.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Camera className="h-4 w-4 text-purple-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Specifications</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {accessory.specs.map((spec: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(accessory.price)}</span>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Ships in 24 hours</span>
                    </div>
                  </div>
                  <div className="space-x-4">
                    <button 
                      onClick={() => handleAddToCart(accessory)}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      disabled={!accessory.inStock}
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(accessory)}
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      disabled={!accessory.inStock}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accessories;