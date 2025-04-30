const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  Id: { type: Number, unique: true },
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  stock: Number,
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;