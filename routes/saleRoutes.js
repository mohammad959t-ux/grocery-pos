const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// POST /api/sales
router.post('/', saleController.addSale);

// GET /api/sales
router.get('/', saleController.getSales);

// POST /api/sales/sync
router.post('/sync', saleController.syncSales);

module.exports = router;