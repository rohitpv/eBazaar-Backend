const Product = require("../models/Product");
const mongoose = require("mongoose");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // const products = await Product.find();
    const products = await mongoose.connection.db.collection('products').find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const result = await mongoose.connection.db.collection('products').insertOne(req.body);
    // const product = new Product(req.body);
    // await product.save();
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProducts, createProduct };
