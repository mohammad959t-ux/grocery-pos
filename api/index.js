const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Middleware لانتظار الاتصال قبل كل طلب
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Root
app.get('/', (req, res) => {
  res.send('Grocery POS Backend is running');
});

// Route اختبار MongoDB
app.get('/api/test-db', async (req, res) => {
  try {
    const Sale = require('../models/Sale');
    const count = await Sale.countDocuments();
    res.json({ message: 'MongoDB connected!', saleCount: count });
  } catch (err) {
    console.error('MongoDB test error:', err);
    res.status(500).json({ message: 'MongoDB connection failed', error: err.message });
  }
});

module.exports = app;
