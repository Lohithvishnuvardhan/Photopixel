import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header with Gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl shadow-2xl mb-8 px-8 py-16 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-20 w-20 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-purple-100 text-xl max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <p className="text-gray-600 text-lg">
                Last updated: January 1, 2024
              </p>
            </div>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us for support.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by our payment providers)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <UserCheck className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer service and support</li>
                  <li>Send you important updates about your orders</li>
                  <li>Improve our products and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Lock className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Information Security</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure payment processing through trusted providers</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use cookies and similar technologies to enhance your browsing experience, 
                  analyze site traffic, and personalize content.
                </p>
                <p>
                  You can control cookies through your browser settings, but disabling cookies 
                  may affect the functionality of our website.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may use third-party services for payment processing, shipping, analytics, 
                  and marketing. These services have their own privacy policies and we encourage 
                  you to review them.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>Email:</strong> privacy@photopixel.com</p>
                  <p><strong>Phone:</strong> 1800-123-4567</p>
                  <p><strong>Address:</strong> 123 Camera Street, Photography District, New York, NY 10001</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy on this page and updating the 
                  "Last updated" date.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;