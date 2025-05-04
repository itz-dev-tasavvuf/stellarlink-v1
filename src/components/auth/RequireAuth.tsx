import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log('[RequireAuth] loading:', loading, 'isAuthenticated:', isAuthenticated);

  if (loading) {
    // Show a full-page spinner while auth is loading
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stellar-500 mb-4"></div>
        <span className="ml-4 text-stellar-400 font-medium">Checking authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the current location so we can redirect
    // back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;