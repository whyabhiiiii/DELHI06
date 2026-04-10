const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// ─── Trust proxy (required for rate-limiting behind Render/Railway/Nginx) ───
if (isProduction) {
  app.set('trust proxy', 1);
}

// ─── CORS ─────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  // Add additional production domains here if needed
].filter(Boolean);

// In development, also allow local origins
if (!isProduction) {
  allowedOrigins.push(
    'http://localhost:5001',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
  );
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, same-origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (isProduction) {
      callback(new Error('Not allowed by CORS'));
    } else {
      callback(null, true); // Allow all in dev only
    }
  },
  credentials: true,
}));

// ─── Security Headers ─────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: isProduction ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",   // Required for inline event handlers
        "https://checkout.razorpay.com",
        "https://code.iconify.design",
        "https://api.iconify.design",
        "https://accounts.google.com",
        "https://apis.google.com",
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",   // Required for inline styles
        "https://fonts.googleapis.com",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",            // Allow images from any HTTPS source (user avatars, activity images)
      ],
      connectSrc: [
        "'self'",
        "https://api.iconify.design",
        "https://lumberjack.razorpay.com",
        "https://accounts.google.com",
      ],
      frameSrc: [
        "'self'",
        "https://api.razorpay.com",
        "https://accounts.google.com",
      ],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  } : false,
  crossOriginEmbedderPolicy: false,
}));

// ─── Gzip Compression ────────────────────────────────────
app.use(compression());

// ─── Body Parsers with size limits ───────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Serve Frontend Static Files (from public/ only) ─────
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: isProduction ? '1d' : 0,  // Cache static assets for 1 day in production
}));

// ─── Logging ─────────────────────────────────────────────
if (isProduction) {
  app.use(morgan('combined')); // Standard Apache-style logs for production
} else {
  app.use(morgan('dev'));
}

// ─── Rate Limiting ───────────────────────────────────────

// General API rate limit — 300 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use('/api/', apiLimiter);

// Strict rate limit for auth routes — 20 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
});
app.use('/api/auth/', authLimiter);

// ─── Routes ───────────────────────────────────────────────
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/bookings',   require('./routes/bookingRoutes'));
app.use('/api/timeslots',  require('./routes/timeslotRoutes'));
app.use('/api/reviews',    require('./routes/reviewRoutes'));
app.use('/api/admin',      require('./routes/adminRoutes'));
app.use('/api/payments',   require('./routes/paymentRoutes'));

// ─── Health Check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🏛️ Delhi 6 API is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// ─── SPA Fallback (serve index.html for non-API routes) ───
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── 404 Handler (for API routes only) ────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: isProduction ? 'Internal Server Error' : err.message,
    ...(! isProduction && { stack: err.stack }),
  });
});

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Delhi 6 server running on port ${PORT}`);
  console.log(`📍 Mode: ${process.env.NODE_ENV}`);
  console.log(`🌐 URL: http://localhost:${PORT}\n`);
});

// ─── Graceful Shutdown ────────────────────────────────────
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('🔒 HTTP server closed.');
    mongoose.connection.close(false).then(() => {
      console.log('🔒 MongoDB connection closed.');
      process.exit(0);
    });
  });

  // Force shutdown after 10s if graceful fails
  setTimeout(() => {
    console.error('⚠️ Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  if (isProduction) {
    gracefulShutdown('UNHANDLED_REJECTION');
  }
});
