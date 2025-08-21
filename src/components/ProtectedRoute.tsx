import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        setShouldRedirect(true);
      } else if (!requireAuth && user) {
        setShouldRedirect(true);
      }
    }
  }, [user, loading, requireAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (shouldRedirect) {
    if (requireAuth && !user) {
      // Redirect to login if authentication is required but user is not logged in
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (!requireAuth && user) {
      // Redirect to home if user is logged in but trying to access auth pages
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};