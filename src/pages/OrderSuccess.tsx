import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Home, CheckCircle, MapPin } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
}

interface OrderDetails {
  items: OrderItem[];
  totalAmount: number;
  orderId: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails as OrderDetails;

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
    }
  }, [orderDetails, navigate]);

  const handleViewOrders = () => {
    navigate('/view-order');
  };

  if (!orderDetails) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600">Order ID: {orderDetails.orderId}</p>
          </div>

          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-purple-600">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₹{orderDetails.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Shipping</span>
              <span>{orderDetails.totalAmount > 50000 ? 'Free' : '₹999'}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{orderDetails.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <div className="flex items-start text-gray-600">
              <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
              <div>
                <p>{orderDetails.shippingAddress.address}</p>
                <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
                <p>PIN: {orderDetails.shippingAddress.pincode}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleViewOrders}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              View Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}