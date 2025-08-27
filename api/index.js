const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Middleware للتأكد من اتصال DB
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
// Test DB connection
app.get('/api/test-db', async (req, res) => {
    try {
      const db = await connectDB();
      const collections = await db.connection.db.listCollections().toArray();
      res.json({ message: 'MongoDB connected!', collections });
    } catch (error) {
      res.status(500).json({ message: 'MongoDB connection failed', error: error.message });
    }
  });
  
// Root
app.get('/', (req, res) => {
  res.send('Grocery POS Backend is running');
});

module.exports = app;
