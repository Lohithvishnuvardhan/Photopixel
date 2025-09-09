import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dbHelpers } from '../utils/supabase';
import toast from 'react-hot-toast';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const isAdminUser = await dbHelpers.isAdmin(user.id);
        if (isAdminUser) {
          setIsAdmin(true);
        } else {
          // Also check profile role as fallback
          const profile = await dbHelpers.getProfile(user.id);
          if (profile?.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            toast.error('Access denied. Admin privileges required.');
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        toast.error('Error verifying admin access');
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminAccess();
  }, [user]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};