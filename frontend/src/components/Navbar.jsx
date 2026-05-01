import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

/**
 * Navigation Bar Component
 */
function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-bold cursor-pointer hover:text-blue-100"
          onClick={() => navigate('/')}
        >
          🔍 Fake News Detector
        </div>

        <div className="space-x-4 flex items-center">
          {isAuthenticated ? (
            <>
              <span className="text-sm">Welcome, {user?.username}!</span>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/analyzer')}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded"
              >
                Analyze
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
