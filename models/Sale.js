// models/Sale.js
const mongoose = require('mongoose');

// تفاصيل كل منتج ضمن عملية البيع
const saleItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true } // السعر الفعلي للقطعة أو الكرتون
});

// schema الرئيسي لعملية البيع
const saleSchema = mongoose.Schema({
  items: [saleItemSchema],
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'debt'], default: 'cash' }
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
