import { Package, Truck, MapPin, Clock } from 'lucide-react';

const TrackOrder = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Order Status Guide</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Package className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-gray-600">
                  Your order has been received and is being processed. We'll verify payment and prepare your items for shipping.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Truck className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">In Transit</h3>
                <p className="text-gray-600">
                  Your order has been shipped and is on its way. Use your tracking number to monitor its journey.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">Out for Delivery</h3>
                <p className="text-gray-600">
                  Your package is in your local area and will be delivered today.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">Delivered</h3>
                <p className="text-gray-600">
                  Your order has been successfully delivered to the specified address.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="prose text-gray-600">
            <p>
              Standard shipping typically takes 5-7 business days. For orders over ₹50,000, we offer free shipping.
            </p>
            <p className="mt-4">
              Express delivery is available for select pin codes with next-day delivery. Additional charges may apply.
            </p>
            <p className="mt-4">
              International shipping is available for select countries with delivery times ranging from 7-14 business days.
            </p>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-900 mb-2">Need Help?</h3>
              <p className="text-purple-700">
                Our customer service team is available Monday-Friday, 9 AM to 6 PM IST.
                Contact us at support@photopixel.com or call 1800-123-4567.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;