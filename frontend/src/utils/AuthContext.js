import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

/**
 * Authentication Context Provider
 * Manages user authentication state and JWT token
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  // Check if user is still authenticated on mount
  useEffect(() => {
    if (token) {
      // Token exists, user should be considered logged in
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, [token]);

  // Login function
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
