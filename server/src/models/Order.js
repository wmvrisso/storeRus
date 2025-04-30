const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  totalCost: Number,
  orderDate: { type: Date, default: Date.now },
});

// Model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;