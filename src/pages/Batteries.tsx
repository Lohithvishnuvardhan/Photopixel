import { useCart } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { Shield, Truck, Clock, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cart';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const staticBatteries = [
  {
    id: 13,
    name: 'Canon LP-E6NH Battery',
    price: 14000,
    image: "https://i.postimg.cc/yx6sb6Tn/battery.avif",
    description: 'High Capacity Battery for Canon EOS R Series',
    specs: [
      '2130mAh Capacity',
      'Up to 2030 Shots per Charge',
      'USB-C Charging Compatible',
      'Latest Generation Technology',
      'Info Communication Function',
      'Fast Charging Support'
    ],
    features: [
      'Enhanced Heat Resistance',
      'Improved Performance in Cold',
      'Real-time Battery Info Display'
    ],
    inStock: true,
    isProGrade: true
  },
  {
    id: 14,
    name: 'Sony NP-FZ100 Battery',
    price: 12990,
    image: "https://i.postimg.cc/3RRtSPvm/battery1.avif",
    description: 'Professional Battery for Sony Alpha Cameras',
    specs: [
      '2280mAh Capacity',
      'Up to 710 Shots per Charge',
      'Info-Lithium Technology',
      'Fast Charging Support',
      'Operating Temperature: -20°C to +60°C',
      'Weight: 83g'
    ],
    features: [
      'Accurate Power Indication',
      'Over-charge Protection',
      'Memory Effect Free'
    ],
    inStock: true,
    isProGrade: true
  },
  {
    id: 15,
    name: 'Nikon EN-EL15c Battery',
    price: 11990,
    image: "https://i.postimg.cc/gcLCGZxR/battery2.avif",
    description: 'Advanced Battery for Nikon Z Series',
    specs: [
      '2280mAh Capacity',
      'USB Charging Compatible',
      'Enhanced Performance',
      'Long Battery Life',
      'Operating Temperature: -10°C to +40°C',
      'Weight: 78g'
    ],
    features: [
      'Smart Battery Management',
      'Overcharge Protection',
      'Temperature Monitoring'
    ],
    inStock: true,
    isProGrade: true
  },
  {
    id: 16,
    name: 'Fujifilm NP-W235 Battery',
    price: 9990,
    image: "https://i.postimg.cc/3RsbktkG/battery3.avif",
    description: 'High-Performance Battery for Fujifilm Cameras',
    specs: [
      '2200mAh Capacity',
      'Up to 500 Shots per Charge',
      'Quick Charging Support',
      'Battery Level Indicator',
      'Operating Temperature: -10°C to +40°C',
      'Weight: 68g'
    ],
    features: [
      'Advanced Power Management',
      'Protection Circuit Built-in',
      'Extended Lifespan Design'
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

const Batteries = () => {
  const { t } = useLanguage();
  const { user, setPendingAction } = useAuth();
  const { addToCart } = useCart();
  const { addToBuyNow, buyNowItems, buyNowTotal } = useCartStore();
  const navigate = useNavigate();
  const [allBatteries, setAllBatteries] = useState([...staticBatteries]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminBatteries = async () => {
      try {
        const response = await api.get('/products');
        // Ensure response.data is an array before filtering
        const products = Array.isArray(response.data) ? response.data : [];
        const adminBatteries = products.filter((product: any) => 
          product.category === 'Batteries' && 
          !staticBatteries.some(battery => battery.id === product._id)
        );

        const formattedAdminBatteries = adminBatteries.map((battery: any) => ({
          ...battery,
          id: battery._id,
          specs: battery.specs || [
            'High Capacity Design',
            'Advanced Protection Circuit',
            'Reliable Performance',
            'Long Battery Life',
            'Wide Temperature Range',
            'Quick Charging Support'
          ],
          features: battery.features || [
            'Smart Power Management',
            'Safety Protection',
            'Durability Optimized'
          ],
          inStock: battery.stock > 0,
          isProGrade: true,
          image: battery.imageUrl
        }));

        setAllBatteries([...staticBatteries, ...formattedAdminBatteries]);
      } catch (error) {
        console.error('Error fetching batteries:', error);
        toast.error('Failed to fetch additional batteries');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminBatteries();
  }, []);

  const handleAddToCart = (battery: any) => {
    if (!user) {
      setPendingAction({ type: 'cart', product: battery });
      navigate('/login');
      return;
    }

    const product = {
      _id: battery._id || battery.id,
      name: battery.name,
      price: battery.price,
      description: battery.description,
      imageUrl: battery.imageUrl || battery.image,
      category: 'Batteries',
      stock: battery.stock || 10
    };
    
    addToCart(product);
    toast.success(`${battery.name} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleBuyNow = (battery: any) => {
    if (!user) {
      setPendingAction({ type: 'buyNow', product: battery });
      navigate('/login');
      return;
    }

    const product = {
      _id: battery._id || battery.id,
      name: battery.name,
      price: battery.price,
      description: battery.description,
      imageUrl: battery.imageUrl || battery.image,
      category: 'Batteries',
      stock: battery.stock || 10
    };

    addToBuyNow(product);
    
    navigate('/payment', { 
      state: { 
        items: [...buyNowItems, {
          _id: battery._id || battery.id,
          name: battery.name,
          price: battery.price,
          quantity: 1,
          image: battery.imageUrl || battery.image
        }],
        totalAmount: buyNowTotal + battery.price,
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
            <h1 className="text-4xl font-bold text-gray-900">{t('products.batteries.title')}</h1>
            <p className="mt-2 text-gray-600">{t('products.batteries.subtitle')}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <Truck className="h-5 w-5 mr-2" />
              <span>{t('products.freeShipping')}</span>
            </div>
            <div className="flex items-center text-purple-600">
              <Shield className="h-5 w-5 mr-2" />
              <span>{t('products.warranty')}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {allBatteries.map((battery) => (
            <div key={battery.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="relative">
                <img
                  src={battery.image}
                  alt={battery.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t('products.inStock')}
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {battery.inStock ? t('products.inStock') : t('products.outOfStock')}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{battery.name}</h3>
                    <p className="text-gray-600">{battery.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">{t('products.keyFeatures')}</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {battery.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Camera className="h-4 w-4 text-purple-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">{t('products.specifications')}</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {battery.specs.map((spec: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(battery.price)}</span>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{t('products.ships')}</span>
                    </div>
                  </div>
                  <div className="space-x-4">
                    <button 
                      onClick={() => handleAddToCart(battery)}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      disabled={!battery.inStock}
                    >
                      {t('products.addToCart')}
                    </button>
                    <button 
                      onClick={() => handleBuyNow(battery)}
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      disabled={!battery.inStock}
                    >
                      {t('products.buyNow')}
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

export default Batteries;