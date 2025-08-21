import React from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), UPI, Net Banking, and EMI options. All payments are processed securely through our payment gateway."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package on our website or the courier's website."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to select countries internationally. Shipping costs and delivery times vary by location. Please check our shipping information page for more details."
    },
    {
      question: "What is your warranty policy?",
      answer: "All products come with manufacturer warranty. The warranty period varies by product and brand. Extended warranty options are available for select products at an additional cost."
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 24 hours of placement, provided they haven't been shipped. Once an order is shipped, it will need to go through our return process."
    },
    {
      question: "How do I return a product?",
      answer: "We offer a 30-day return window for most products. Items must be unused and in original packaging. Visit our Returns page for detailed instructions on how to initiate a return."
    },
    {
      question: "Do you offer price matching?",
      answer: "Yes, we offer price matching for identical products from authorized retailers. Contact our customer service team with proof of the lower price for verification."
    },
    {
      question: "How can I contact customer support?",
      answer: "Our customer support team is available Monday-Friday, 9 AM to 6 PM IST. You can reach us through email at support@photopro.com or call us at 1800-123-4567."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="bg-white rounded-lg shadow-lg">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-purple-600" />
                ) : (
                  <Plus className="h-5 w-5 text-purple-600" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;