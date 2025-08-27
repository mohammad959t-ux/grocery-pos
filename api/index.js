const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/products', require('./routes/productRoutes'));
app.use('/sales', require('./routes/saleRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));

// Root
app.get('/', (req, res) => {
    res.send('Grocery POS Backend is running');
});

module.exports = app;