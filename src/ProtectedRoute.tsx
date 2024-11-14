import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './components/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true}) => {
  const { isAuthenticated } = useAuth();

  // If authentication is required and the user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If all checks pass, render the children components
  return <>{children}</>;
};
export default ProtectedRoute;