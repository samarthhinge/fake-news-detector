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
const newsRoutes = require('./src/routes/news');

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');

const app = express();


// ============ MIDDLEWARE ============

// Security
app.use(helmet());

// ✅ FIXED CORS (MOST IMPORTANT)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://fake-news-detector-gamma-two.vercel.app",
    "https://fake-news-detector-git-main-samarthhinges-projects.vercel.app"
  ],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: request logger (helps debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// ============ DATABASE CONNECTION ============

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    // ❌ don't crash server in production
  });


// ============ ROUTES ============

// Root route (Render check)
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/news', newsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});


// ============ ERROR HANDLING ============

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);


// ============ START SERVER ============

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});


// ============ SAFETY HANDLERS ============

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
});