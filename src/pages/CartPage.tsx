import { useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/Cartcontext';
import { useLanguage } from '../context/LanguageContext';

const CartPage = () => {
  const { t } = useLanguage();
  const { items = [], removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const shipping = total > 50000 ? 0 : 999;
  const finalTotal = total + shipping;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!items?.length) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/payment', { 
      state: { 
        items: items,
        totalAmount: finalTotal
      } 
    });
  };

  if (!items?.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cart.empty')}</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            {t('cart.continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1 ml-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Package className="h-4 w-4 mr-1" />
                            <span>In Stock</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-gray-200 rounded-full"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded-lg bg-white shadow-sm">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-6 py-2 font-medium text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('cart.orderSummary')}</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.shipping')}</span>
                  <span>{shipping === 0 ? t('cart.free') : `₹${shipping}`}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                  <span>{t('cart.total')}</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {t('cart.checkout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;