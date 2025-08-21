import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Camera, LogOut, Settings } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Layout = () => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [, setShowResults] = useState(false);
  const [, setSearchResults] = useState<any[]>([]);
  const [, setIsMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const items = useCartStore(state => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const navTimeoutRef = useRef<NodeJS.Timeout>();
  const visibilityTimeoutRef = useRef<NodeJS.Timeout>();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (event.clientY <= 80) {
        setShowNav(true);
        
        if (navTimeoutRef.current) {
          clearTimeout(navTimeoutRef.current);
        }
        if (visibilityTimeoutRef.current) {
          clearTimeout(visibilityTimeoutRef.current);
        }

        visibilityTimeoutRef.current = setTimeout(() => {
          setShowNav(false);
        }, 5000);
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (navTimeoutRef.current) {
        clearTimeout(navTimeoutRef.current);
      }
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const searchTermLower = query.toLowerCase();
    if (searchTermLower.includes('camera')) {
      navigate('/cameras');
    } else if (searchTermLower.includes('lens')) {
      navigate('/lenses');
    } else if (searchTermLower.includes('accessory') || searchTermLower.includes('accessories')) {
      navigate('/accessories');
    } else if (searchTermLower.includes('battery') || searchTermLower.includes('batteries')) {
      navigate('/batteries');
    }
  };


  const handleNavClick = () => {
    if (visibilityTimeoutRef.current) {
      clearTimeout(visibilityTimeoutRef.current);
    }
    visibilityTimeoutRef.current = setTimeout(() => {
      setShowNav(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col overflow-x-hidden">
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0">
            <Link to="/" className="flex items-center space-x-3">
              <Camera className="h-8 w-8 md:h-12 md:w-12 text-amber-500" strokeWidth={1.5} />
              <span className="text-3xl md:text-5xl font-extrabold italic bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-transparent bg-clip-text font-sans tracking-tight hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 transition-all duration-300">
                {t('header.title')}
              </span>
            </Link>

            <div className="flex-1 max-w-3xl mx-auto md:mx-12 relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={t('header.search')}
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base md:text-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 md:space-x-8">
              <Link 
                to="/cart" 
                className="relative text-purple-400 hover:text-purple-300 transition-colors"
                aria-label={t('header.cart')}
              >
                <ShoppingCart className="h-6 w-6 md:h-8 md:w-8" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs md:text-sm font-bold rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User menu */}
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                {user ? (
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                      <User className="h-6 w-6 md:h-8 md:w-8" />
                      <span className="hidden md:block text-sm">{user.user_metadata?.name || user.email}</span>
                    </button>
                    
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors first:rounded-t-lg"
                      >
                        <User className="h-4 w-4 inline mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4 inline mr-2" />
                        Orders
                      </Link>
                      <Link
                        to="/admin"
                        className="block px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="h-4 w-4 inline mr-2" />
                        Admin Panel
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors last:rounded-b-lg"
                      >
                        <LogOut className="h-4 w-4 inline mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/login"
                      className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      Sign In
                    </Link>
                    <span className="text-gray-600">/</span>
                    <Link
                      to="/signup"
                      className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div 
            className={`absolute left-0 right-0 top-full bg-gray-900 border-b border-gray-800 transition-all duration-300 z-40 ${
              showNav ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onMouseEnter={() => {
              setShowNav(true);
              if (visibilityTimeoutRef.current) {
                clearTimeout(visibilityTimeoutRef.current);
              }
              visibilityTimeoutRef.current = setTimeout(() => {
                setShowNav(false);
              }, 10000);
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4">
                <div className="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-8 lg:space-x-12">
                  <Link 
                    to="/cameras" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    {t('nav.cameras')}
                  </Link>
                  <Link 
                    to="/lenses" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    {t('nav.lenses')}
                  </Link>
                  <Link 
                    to="/accessories" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    {t('nav.accessories')}
                  </Link>
                  <Link 
                    to="/batteries" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    {t('nav.batteries')}
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    {t('nav.about')}
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    {t('nav.contact')}
                  </Link>
                  <Link 
                    to="/blog" 
                    className="text-purple-400 hover:text-purple-300 transition-colors text-base md:text-lg text-center"
                    onClick={handleNavClick}
                  >
                    {t('nav.blog')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.aboutUs')}</h3>
              <p className="text-purple-300">{t('footer.aboutDesc')}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-purple-300 hover:text-purple-200">{t('nav.about')}</Link></li>
                <li><Link to="/contact" className="text-purple-300 hover:text-purple-200">{t('nav.contact')}</Link></li>
                <li><Link to="/blog" className="text-purple-300 hover:text-purple-200">{t('nav.blog')}</Link></li>
                <li><Link to="/faq" className="text-purple-300 hover:text-purple-200">{t('footer.faq')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.customerService')}</h3>
              <ul className="space-y-2">
                <li><Link to="/shipping" className="text-purple-300 hover:text-purple-200">{t('footer.shippingInfo')}</Link></li>
                <li><Link to="/returns" className="text-purple-300 hover:text-purple-200">{t('footer.returns')}</Link></li>
                <li><Link to="/track-order" className="text-purple-300 hover:text-purple-200">{t('footer.trackOrder')}</Link></li>
                <li><Link to="/privacy-policy" className="text-purple-300 hover:text-purple-200">{t('footer.privacyPolicy')}</Link></li>
                <li><Link to="/terms-conditions" className="text-purple-300 hover:text-purple-200">{t('footer.termsConditions')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-purple-300">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

export { Layout };