
import { RefreshCw, Shield, CheckCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns Policy</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Our Return Process</h2>
          <div className="grid gap-6">
            <div className="flex items-start">
              <RefreshCw className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">30-Day Return Window</h3>
                <p className="text-gray-600">
                  We offer a 30-day return period for most items. Items must be unused and in their original packaging with all accessories included.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">Warranty Coverage</h3>
                <p className="text-gray-600">
                  All products come with manufacturer warranty. Extended warranty options are available for select products.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-purple-600 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">Quality Guarantee</h3>
                <p className="text-gray-600">
                  If you receive a defective item, we'll replace it or provide a full refund, including shipping costs.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Return Instructions</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              To initiate a return:
            </p>
            <ol className="list-decimal ml-4 space-y-2">
              <li>Contact our customer service team</li>
              <li>Receive a return authorization number</li>
              <li>Pack the item securely in its original packaging</li>
              <li>Attach the provided return shipping label</li>
              <li>Drop off at the nearest courier location</li>
            </ol>
            <p className="mt-6">
              Once we receive and inspect the returned item, we'll process your refund within 5-7 business days. The refund will be credited to your original payment method.
            </p>
            <p className="mt-4">
              Please note: Custom-ordered items and opened software are not eligible for return unless defective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;