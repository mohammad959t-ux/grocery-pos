const Joi = require('joi');
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// مخطط التحقق من عملية بيع واحدة
const singleSaleItemSchema = Joi.object({
  product: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().positive().required(),
});

const singleSaleSchema = Joi.object({
  items: Joi.array().items(singleSaleItemSchema).min(1).required(),
  total: Joi.number().positive().required(),
  paymentMethod: Joi.string().valid('cash', 'debt').required(),
});

// مخطط التحقق من مصفوفة من المبيعات
const salesArraySchema = Joi.array().items(singleSaleSchema).min(1);

const addSale = async (req, res) => {
  try {
    const { items, total, paymentMethod } = req.body;

    // التحقق من صحة عملية البيع الواحدة
    const { error } = singleSaleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // معالجة البيع
    await processSales([{ items, total, paymentMethod }]);

    res.status(201).json({ message: 'Sale added successfully' });
  } catch (error) {
    console.error('Error adding sale:', error);
    res.status(500).json({ message: error.message });
  }
};

const syncSales = async (req, res) => {
  try {
    const { error } = salesArraySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    await processSales(req.body);

    res.status(200).json({ message: 'Sales synced successfully' });
  } catch (error) {
    console.error('Error syncing sales:', error);
    res.status(500).json({ message: error.message });
  }
};

const processSales = async (salesToProcess) => {
  try {
    for (const saleData of salesToProcess) {
      const { items, total, paymentMethod } = saleData;

      // تحديث المخزون لكل منتج
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for product ${product.name}`);
        }
        product.stock -= item.quantity;
        await product.save();
      }

      // حفظ عملية البيع
      const newSale = new Sale({ items, total, paymentMethod });
      await newSale.save();
    }
  } catch (error) {
    throw error;
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('items.product');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addSale, syncSales, getSales };
