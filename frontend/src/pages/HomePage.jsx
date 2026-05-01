import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

/**
 * Landing/Home Page
 */
function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🔍 Fake News Detector
          </h1>
          <p className="text-xl mb-8">
            Identify fake news and misinformation in seconds using AI-powered analysis
          </p>
          <button
            onClick={() => navigate(isAuthenticated ? '/analyzer' : '/signup')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 mr-4"
          >
            Get Started
          </button>
          {!isAuthenticated && (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-semibold text-lg mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              Sign up safely with encrypted passwords and JWT token authentication
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-lg mb-2">Instant Analysis</h3>
            <p className="text-gray-600">
              Get confidence scores and detailed reasoning for every article in seconds
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-lg mb-2">Track History</h3>
            <p className="text-gray-600">
              View all your analyzed articles, statistics, and trends over time
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🚨</div>
            <h3 className="font-semibold text-lg mb-2">Report News</h3>
            <p className="text-gray-600">
              Help the community by reporting suspicious or false information
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">💾</div>
            <h3 className="font-semibold text-lg mb-2">Save Results</h3>
            <p className="text-gray-600">
              Automatically save all your analyses for future reference and comparison
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-lg mb-2">Responsive Design</h3>
            <p className="text-gray-600">
              Works seamlessly on desktop, tablet, and mobile devices
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold mb-1">Sign Up or Login</h4>
              <p className="text-gray-600">Create a secure account or log in to your existing account</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold mb-1">Paste or Enter Article</h4>
              <p className="text-gray-600">Paste the article text or type it in. Add a title and optional tags</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold mb-1">Click "Check Authenticity"</h4>
              <p className="text-gray-600">Submit your article for analysis. Processing takes just a few seconds</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h4 className="font-semibold mb-1">Get Results</h4>
              <p className="text-gray-600">See if the article is "Real", "Fake", or "Unknown" with confidence score</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              5
            </div>
            <div>
              <h4 className="font-semibold mb-1">View Your Dashboard</h4>
              <p className="text-gray-600">Track your history, view statistics, and report suspicious content</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Detect Fake News?</h2>
        <p className="mb-6">Start analyzing articles today and help fight misinformation</p>
        <button
          onClick={() => navigate(isAuthenticated ? '/analyzer' : '/signup')}
          className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100"
        >
          {isAuthenticated ? 'Go to Analyzer' : 'Sign Up Now'}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
