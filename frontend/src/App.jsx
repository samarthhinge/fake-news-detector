import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import HomePage from './pages/HomePage';
import ArticleAnalyzer from './components/ArticleAnalyzer';
import Dashboard from './components/Dashboard';
import ReportNews from './components/ReportNews';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './utils/AuthContext';
import './index.css';

/**
 * Main App Component
 * Sets up routing and authentication context
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />

              {/* Protected routes */}
              <Route
                path="/analyzer"
                element={
                  <ProtectedRoute>
                    <ArticleAnalyzer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <ProtectedRoute>
                    <ReportNews />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all: redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-12">
            <p>© 2024 Fake News Detector. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2">
              This tool uses pattern analysis for educational purposes
            </p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
