import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Clock, Camera, Award, Users, DollarSign, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Canon EOS R5",
      price: 324900,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
      rating: 4.9,
      reviews: 128
    },
    {
      id: 2,
      name: "Sony A7 IV",
      price: 209990,
      image: "https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80",
      rating: 4.8,
      reviews: 95
    },
    {
      id: 3,
      name: "Nikon Z6 II",
      price: 164990,
      image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80",
      rating: 4.7,
      reviews: 82
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Photographer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      content: "PhotoPro has been my go-to store for all my photography needs. Their selection and service are unmatched.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Wedding Photographer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      content: "The quality of equipment and customer support here is exceptional. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Travel Photographer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      content: "Fast shipping, great prices, and amazing selection. PhotoPro is the best in the business.",
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, label: t("home.stats.customers"), value: "10,000+" },
    { icon: Camera, label: t("home.stats.products"), value: "5,000+" },
    { icon: Award, label: t("home.stats.years"), value: "15+" },
    { icon: Heart, label: t("home.stats.reviews"), value: "25,000+" }
  ];

  const handleShopNow = () => {
    navigate('/cameras');
  };

  return (
    <div className="bg-gray-900">
      {/* Hero Section with Video */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-gradient-to-r from-purple-900 via-blue-900 to-gray-900">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
                <span className="italic">{t('home.hero.title')}</span>
              </h1>
              <p className="text-lg text-gray-200 mb-6">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleShopNow}
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {t('home.hero.shopNow')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link
                  to="/about"
                  className="inline-flex items-center bg-white bg-opacity-20 text-white px-6 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-300"
                >
                  {t('home.hero.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center">
              <Shield className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-white font-semibold">{t('home.trust.secure')}</h3>
                <p className="text-gray-400 text-sm">{t('home.trust.secureDesc')}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Truck className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-white font-semibold">{t('home.trust.shipping')}</h3>
                <p className="text-gray-400 text-sm">{t('home.trust.shippingDesc')}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-white font-semibold">{t('home.trust.support')}</h3>
                <p className="text-gray-400 text-sm">{t('home.trust.supportDesc')}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="text-white font-semibold">{t('home.trust.price')}</h3>
                <p className="text-gray-400 text-sm">{t('home.trust.priceDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">{t('home.featured')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-500 text-white px-2 py-1 rounded-full text-sm">
                    Best Seller
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-600'
                        }`}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-2 text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <Link
                      to={`/cameras`}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t('home.testimonials')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.content}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-gray-900 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-gray-300 max-w-none">
            <h2 className="text-3xl font-bold text-white mb-6">Professional Photography Equipment</h2>
            <p className="mb-4">
              Welcome to PhotoPro, your premier destination for professional photography equipment in India. We offer a comprehensive selection of high-quality cameras, lenses, and accessories from leading brands like Canon, Sony, Nikon, and more.
            </p>
            <p className="mb-4">
              Whether you're a professional photographer or an enthusiast, our expert team is here to help you find the perfect equipment for your needs. We pride ourselves on offering competitive prices, authentic products, and exceptional customer service.
            </p>
            <p>
              Explore our wide range of digital cameras, mirrorless cameras, DSLR cameras, professional lenses, camera accessories, and photography gear. All our products come with manufacturer warranty and after-sales support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}