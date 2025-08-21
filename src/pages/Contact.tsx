import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="How can we help you?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">
                      123 Camera Street<br />
                      Photography District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">info@photopro.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Business Hours</h3>
                <div className="text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;