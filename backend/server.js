// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const authRoutes = require('./src/routes/auth');
const analyzeRoutes = require('./src/routes/analyze');
const historyRoutes = require('./src/routes/history');
const reportRoutes = require('./src/routes/report');

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// ============ MIDDLEWARE ============

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ DATABASE CONNECTION ============

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fake_news_detector')
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err);
    process.exit(1);
  });

// ============ ROUTES ============

app.use('/api/auth', authRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/report', reportRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// ============ START SERVER ============

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
