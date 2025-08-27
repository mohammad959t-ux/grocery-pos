const Sale = require('../../models/Sale');
const Product = require('../../models/Product');

const getAnalytics = async (req, res) => {
  try {
    const sales = await Sale.find().populate('items.product');

    let totalIncome = 0;
    let totalCost = 0;
    let productSales = {};

    sales.forEach(sale => {
      totalIncome += sale.total;

      sale.items.forEach(item => {
        const prodId = item.product._id.toString();
        if (!productSales[prodId]) productSales[prodId] = 0;
        productSales[prodId] += item.quantity;

        totalCost += item.quantity * item.product.costPrice;
      });
    });

    const profit = totalIncome - totalCost;

    res.json({
      totalIncome,
      profit,
      productSales
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAnalytics };
