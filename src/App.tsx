import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Payment } from './pages/Payment';
import { Orders } from './pages/Orders';
import CartPage from './pages/CartPage';
import Cameras from './pages/Camera';
import Lenses from './pages/Lenses';
import Accessories from './pages/Accessories';
import Batteries from './pages/Batteries';
import About from './pages/About';
import Contact from './pages/Contact';
import ShippingInfo from './pages/ShippingInfo';
import Returns from './pages/Returns';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import TrackOrder from './pages/TrackOrder';
import { OrderSuccess } from './pages/OrderSuccess';
import { ViewOrder } from './pages/ViewOrder';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AddProduct from './pages/admin/AddProduct';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import AdminRevenue from './pages/admin/AdminRevenue';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/Cartcontext';
import { LanguageProvider } from './context/LanguageContext';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Something went wrong:</h1>
        <pre className="mt-2 text-gray-700">{error.message}</pre>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LanguageProvider>
        <AuthProvider>
          <SearchProvider>
            <CartProvider>
              <Router>
                <Routes>
                  {/* Auth routes - accessible only when not logged in */}
                  <Route path="/login" element={
                    <ProtectedRoute requireAuth={false}>
                      <Login />
                    </ProtectedRoute>
                  } />
                  <Route path="/signup" element={
                    <ProtectedRoute requireAuth={false}>
                      <Signup />
                    </ProtectedRoute>
                  } />
                  <Route path="/forgot-password" element={
                    <ProtectedRoute requireAuth={false}>
                      <ForgotPassword />
                    </ProtectedRoute>
                  } />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/add" element={<AddProduct />} />
                    <Route path="products/edit/:id" element={<AddProduct />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="revenue" element={<AdminRevenue />} />
                  </Route>
                  
                  {/* Main app routes */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="cameras" element={<Cameras />} />
                    <Route path="lenses" element={<Lenses />} />
                    <Route path="accessories" element={<Accessories />} />
                    <Route path="batteries" element={<Batteries />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="shipping" element={<ShippingInfo />} />
                    <Route path="returns" element={<Returns />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="track-order" element={<TrackOrder />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:id" element={<BlogPost />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms-conditions" element={<TermsConditions />} />
                    
                    {/* Protected routes - require authentication */}
                    <Route path="profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="profile/edit" element={
                      <ProtectedRoute>
                        <EditProfile />
                      </ProtectedRoute>
                    } />
                    <Route path="orders" element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    } />
                    <Route path="view-order" element={
                      <ProtectedRoute>
                        <ViewOrder />
                      </ProtectedRoute>
                    } />
                    <Route path="payment" element={
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    } />
                    <Route path="order-success" element={
                      <ProtectedRoute>
                        <OrderSuccess />
                      </ProtectedRoute>
                    } />
                  </Route>
                </Routes>
              </Router>
            </CartProvider>
          </SearchProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;