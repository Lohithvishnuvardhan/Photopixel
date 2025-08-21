import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-500 rounded-2xl shadow-2xl mb-8 px-8 py-16 text-center">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-20 w-20 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <p className="text-gray-600 text-lg">
                Last updated: January 1, 2024
              </p>
            </div>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Agreement to Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing and using Photo Pixel's website and services, you accept and agree to be 
                  bound by the terms and provision of this agreement.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Use License</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Permission is granted to temporarily download one copy of the materials on Photo Pixel's 
                  website for personal, non-commercial transitory viewing only.
                </p>
                <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We strive to provide accurate product information, including descriptions, prices, 
                  and availability. However, we do not warrant that product descriptions or other 
                  content is accurate, complete, reliable, current, or error-free.
                </p>
                <p>
                  All products are subject to availability. We reserve the right to discontinue any 
                  product at any time without notice.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing and Payment</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All prices are listed in Indian Rupees (INR) and are subject to change without notice. 
                  We reserve the right to modify prices at any time.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is required at the time of purchase</li>
                  <li>We accept major credit cards, debit cards, and UPI payments</li>
                  <li>All transactions are processed securely</li>
                  <li>Additional taxes may apply based on your location</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping and Delivery</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We offer shipping throughout India and to select international locations. 
                  Delivery times may vary based on location and product availability.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free shipping on orders over ₹50,000</li>
                  <li>Standard delivery: 5-7 business days</li>
                  <li>Express delivery: 1-2 business days (additional charges apply)</li>
                  <li>International shipping: 7-14 business days</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Returns and Refunds</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We offer a 30-day return policy for most items. Products must be unused, 
                  in original packaging, and in the same condition as received.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Return shipping costs are the responsibility of the customer</li>
                  <li>Refunds will be processed within 5-7 business days</li>
                  <li>Custom orders and opened software are not eligible for return</li>
                  <li>Defective items will be replaced or refunded at no cost</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Warranty</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All products come with manufacturer warranty. Extended warranty options 
                  are available for select products at additional cost.
                </p>
                <p>
                  Warranty claims must be processed through the manufacturer or authorized 
                  service centers as per the warranty terms.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  The materials on Photo Pixel's website are provided on an 'as is' basis. 
                  Photo Pixel makes no warranties, expressed or implied, and hereby disclaims 
                  and negates all other warranties including without limitation, implied warranties 
                  or conditions of merchantability, fitness for a particular purpose, or 
                  non-infringement of intellectual property or other violation of rights.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitations</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  In no event shall Photo Pixel or its suppliers be liable for any damages 
                  (including, without limitation, damages for loss of data or profit, or due to 
                  business interruption) arising out of the use or inability to use the materials 
                  on Photo Pixel's website, even if Photo Pixel or an authorized representative 
                  has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  These terms and conditions are governed by and construed in accordance with 
                  the laws of India and you irrevocably submit to the exclusive jurisdiction 
                  of the courts in that State or location.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Email:</strong> legal@photopixel.com</p>
                  <p><strong>Phone:</strong> 1800-123-4567</p>
                  <p><strong>Address:</strong> 123 Camera Street, Photography District, New York, NY 10001</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;