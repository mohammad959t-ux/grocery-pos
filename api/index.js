const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Root route
app.get('/', (req, res) => res.send('Grocery POS Backend on Vercel'));

// Export app without app.listen()
module.exports = app;
