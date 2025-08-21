
import { Link } from 'react-router-dom';
import { Camera, ShoppingCart } from 'lucide-react';
import SearchBar from './SearchBar';
import Cart from './Cart';
import { useCart } from '../context/Cartcontext';

const Navbar = () => {
  // Add default empty values to prevent undefined errors
  const { cartItems = [], removeFromCart, updateQuantity, isCartOpen = false, setIsCartOpen } = useCart() || {};
  
  // Add safety check for cartItems before reducing
  const totalItems = cartItems && cartItems.length > 0 
    ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;

  // Safe handler for cart toggle
  const handleToggleCart = () => {
    if (typeof setIsCartOpen === 'function') {
      setIsCartOpen(!isCartOpen);
    }
  };
  
  // Safe handler for cart close
  const handleCloseCart = () => {
    if (typeof setIsCartOpen === 'function') {
      setIsCartOpen(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold">PhotoPro</span>
          </Link>
          
          <div className="flex-1 max-w-3xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="hover:text-purple-400">Sign In</Link>
            <button 
              onClick={handleToggleCart}
              className="hover:text-purple-400 relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div className="py-4">
          <div className="flex space-x-8">
            <Link to="/cameras" className="hover:text-purple-400">Cameras</Link>
            <Link to="/lenses" className="hover:text-purple-400">Lenses</Link>
            <Link to="/accessories" className="hover:text-purple-400">Accessories</Link>
            <Link to="/about" className="hover:text-purple-400">About</Link>
            <Link to="/contact" className="hover:text-purple-400">Contact</Link>
          </div>
        </div>
      </div>

      {/* Only render Cart if it's available */}
      {typeof Cart === 'function' && (
        <Cart
          isOpen={isCartOpen}
          onClose={handleCloseCart}
          items={cartItems || []}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </nav>
  );
};

export default Navbar;