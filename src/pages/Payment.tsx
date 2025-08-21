import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, User, MapPin, Truck, Shield, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/Cartcontext';
import { useCartStore } from '../store/cart';
import { useAuth } from '../context/AuthContext';

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addOrder } = useAuth();
  const { clearCart } = useCart();
  const { clearBuyNow } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [orderItems] = useState(location.state?.items || []);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    if (!location.state?.items?.length) {
      navigate('/cart');
      return;
    }
  }, [navigate, location, orderItems]);

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((sum: number, item: { price: number; quantity: number; }) => 
      sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 999;
    return { subtotal, shipping, final: subtotal + shipping };
  };

  const { subtotal, shipping, final: finalTotal } = calculateTotal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }

    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateForm = () => {
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid card number');
      return false;
    }
    if (formData.cvv.length !== 3) {
      toast.error('Please enter a valid CVV');
      return false;
    }
    if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill in all address fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      // Create order data
      const orderData = {
        _id: 'order_' + Date.now(),
        orderItems: orderItems.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image || item.imageUrl,
          price: item.price
        })),
        totalPrice: finalTotal,
        status: 'Processing',
        createdAt: new Date().toISOString(),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }
      };

      // Add order to context
      addOrder(orderData);

      if (location.state?.isBuyNow) {
        clearBuyNow();
      } else {
        clearCart();
      }

      setShowSuccessPopup(true);
      
      // Navigate to order success page with order details
      setTimeout(() => {
        navigate('/order-success', { 
          state: { 
            orderDetails: {
              items: orderItems,
              totalAmount: finalTotal,
              orderId: orderData._id,
              shippingAddress: orderData.shippingAddress
            }
          }
        });
      }, 2000);

    } catch (error: any) {
      console.error('Order creation error:', error);
      toast.error(error.response?.data?.message || 'Failed to create order');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
            <div className="animate-pulse text-sm text-gray-500">Redirecting to orders page...</div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {orderItems.map((item: any) => (
                <div key={item._id} className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                  <img
                    src={item.image || item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">Price: ₹{item.price.toLocaleString()}</p>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="mt-2 text-purple-600 font-semibold">
                          Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength={3}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="123456"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="flex space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Secure Payment
                  </div>
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Free Shipping
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || orderItems.length === 0}
                  className={`flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    (isLoading || orderItems.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay ₹{finalTotal.toLocaleString()}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}