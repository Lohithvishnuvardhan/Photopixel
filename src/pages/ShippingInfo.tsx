
import { Truck, Package, Clock } from 'lucide-react';

const ShippingInfo = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Information</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Truck className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">Standard Shipping</h3>
                <p className="text-gray-600">
                  Free shipping on orders above ₹50,000<br />
                  Delivery within 5-7 business days
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Package className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">Express Delivery</h3>
                <p className="text-gray-600">
                  ₹999 for next-day delivery<br />
                  Available for select pin codes
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">International Shipping</h3>
                <p className="text-gray-600">
                  Available for select countries<br />
                  Delivery within 7-14 business days
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Policy</h2>
          <div className="prose text-gray-600">
            <p>
              All orders are processed within 24-48 hours of payment confirmation. Orders placed after 2 PM IST may be processed the next business day.
            </p>
            <p className="mt-4">
              Tracking information will be provided via email once your order has been shipped. Please note that delivery times may vary based on your location and the shipping method selected.
            </p>
            <p className="mt-4">
              For international orders, additional customs duties and taxes may apply, which are the responsibility of the customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;