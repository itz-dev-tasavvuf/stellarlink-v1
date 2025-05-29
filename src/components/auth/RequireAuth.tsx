import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log('[RequireAuth] Render - loading:', loading, 'isAuthenticated:', isAuthenticated);

  useEffect(() => {
    console.log('[RequireAuth] Auth state changed - loading:', loading, 'isAuthenticated:', isAuthenticated);
  }, [loading, isAuthenticated]);

  if (loading) {
    console.log('[RequireAuth] Auth is loading, showing loading text.');
    return (
      <div>Loading...</div>
    );
  }

  if (!isAuthenticated) {
    console.log('[RequireAuth] Not authenticated, redirecting to login.');
    // Redirect to the login page, but save the current location they were trying to go to
    // so they can be redirected there after logging in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('[RequireAuth] Authenticated, rendering children.');
  // If authenticated, render the children components (i.e., the protected page)
  return <>{children}</>;
};

export default RequireAuth;