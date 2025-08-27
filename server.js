const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// تحميل متغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./api/routes/productRoutes'));
app.use('/api/sales', require('./api/routes/saleRoutes'));
app.use('/api/analytics', require('./api/routes/analyticsRoutes')); // تحليلات

// Root route (اختياري)
app.get('/', (req, res) => {
  res.send('Grocery POS Backend is running');
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
