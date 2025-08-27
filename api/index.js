// api/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
// قم بإزالة '/api' من بداية كل مسار هنا
app.use('/products', require('./routes/productRoutes'));
app.use('/sales', require('./routes/saleRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));

// Test DB connection
// هذا المسار يجب أن يعمل
app.get('/test-db', (req, res) => {
    // ...
});

// Root
// هذا المسار يجب أن يعمل
app.get('/', (req, res) => {
    res.send('Grocery POS Backend is running');
});

module.exports = app;