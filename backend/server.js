// ============ LOAD ENV ============
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// ============ IMPORT ROUTES ============
const authRoutes = require('./src/routes/auth');
const analyzeRoutes = require('./src/routes/analyze');
const historyRoutes = require('./src/routes/history');
const reportRoutes = require('./src/routes/report');
const newsRoutes = require('./src/routes/news');

// ============ IMPORT MIDDLEWARE ============
const errorHandler = require('./src/middleware/errorHandler');

const app = express();


// ============ MIDDLEWARE ============

// Security
app.use(helmet());

// ✅ FINAL CORS FIX (dynamic + safe)
const allowedOrigins = [
  "http://localhost:3000",
  "https://fake-news-detector-x8v7.vercel.app",
  "https://fake-news-detector-gamma-two.vercel.app",
  "https://fake-news-detector-git-main-samarthhinges-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug logger (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// ============ DATABASE ============

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    // Don't crash production server
  });


// ============ ROUTES ============

// Root route (important for Render)
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