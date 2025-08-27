const mongoose = require('mongoose');

const barcodeSchema = mongoose.Schema({
  code: { type: String, required: true },
  type: { type: String, enum: ['piece', 'carton'], required: true },
  unit: { type: Number, required: true } // 1 للقطعة، 24 للكرتون
});

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: {
    piece: { type: Number, required: true },
    carton: { type: Number }
  },
  costPrice: { type: Number, required: true }, // سعر الشراء للقطعة
  stock: { type: Number, default: 0 },
  barcodes: [barcodeSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
