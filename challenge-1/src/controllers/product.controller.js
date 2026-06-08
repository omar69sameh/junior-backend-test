const mongoose = require('mongoose');
const Product = require('../models/Product');

const PRODUCTS_PER_PAGE = 10;

const invalidIdResponse = (res) =>
  res.status(400).json({
    success: false,
    message: 'Invalid product ID format.',
  });

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
};

const getProducts = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const [products, total] = await Promise.all([
    Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PRODUCTS_PER_PAGE),
    Product.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return res.status(200).json({
    success: true,
    data: products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts: total,
      productsPerPage: PRODUCTS_PER_PAGE,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
};

const getProductById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return invalidIdResponse(res);
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: product,
  });
};

const updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return invalidIdResponse(res);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return invalidIdResponse(res);
  }

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: product,
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
