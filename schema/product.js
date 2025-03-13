const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
    min: 0
  },
  description: {
    type: String,
    default: "",
  },
  urlImg: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
