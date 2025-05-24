import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { debugLog } from '../utils/debug';

interface PublicRouteProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ 
  children, 
  requiresAuth = false,
  adminOnly = false 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  debugLog('PublicRoute:', { 
    isAuthenticated, 
    isAdmin: user?.is_admin, 
    path: location.pathname,
    requiresAuth,
    adminOnly
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Handle authentication requirements
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Handle admin-only routes
  if (adminOnly && !user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  // Handle authenticated users trying to access login/signup
  if (isAuthenticated && !requiresAuth && !adminOnly) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;