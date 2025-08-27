const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// قم بالاتصال بقاعدة البيانات مرة واحدة عند بدء تشغيل الخادم
// هذا النمط مثالي لبيئات مثل Vercel التي تستخدم Serverless Functions
connectDB();

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Test DB connection
app.get('/api/test-db', (req, res) => {
    // بما أننا قمنا بالاتصال بالفعل، لا داعي لمحاولة الاتصال مرة أخرى
    // فقط نتحقق من حالة الاتصال الحالية
    if (mongoose.connection.readyState === 1) {
        res.json({ message: 'MongoDB connected successfully!' });
    } else {
        res.status(500).json({ message: 'MongoDB connection failed' });
    }
});

// Root
app.get('/', (req, res) => {
    res.send('Grocery POS Backend is running');
});

module.exports = app;