import mongoose from 'mongoose';
//const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: String,
  image: String,
  quantity: {
    type: Number,
    default: 1
  }
});

const Cart = mongoose.model('Cart', cartItemSchema);

export default Cart;


// // Order Schema
// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//       quantity: Number,
//     },
//   ],
//   totalCost: Number,
//   orderDate: { type: Date, default: Date.now },
// });

// // Model
// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;