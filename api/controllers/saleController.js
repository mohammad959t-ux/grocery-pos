const Sale = require('../../models/Sale');
const Product = require('../../models/Product');

// إضافة عملية بيع
const addSale = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    let total = 0;

    // تحديث المخزون وحساب الإجمالي
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      // خصم الكمية
      product.stock -= item.quantity;
      await product.save();

      total += item.price * item.quantity;
    }

    const sale = new Sale({ items, total, paymentMethod });
    await sale.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// جلب كل المبيعات
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('items.product');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addSale, getSales };
