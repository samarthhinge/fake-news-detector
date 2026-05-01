import React from 'react';
import { useAuth } from '../utils/AuthContext';

/**
 * Protected Route Wrapper
 * Redirects to login if user is not authenticated
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4 inline-block">⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg mb-4">Please log in to access this page</p>
          <a href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
