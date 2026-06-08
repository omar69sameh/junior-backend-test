const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { productRules } = require('../validators/product.validator');
const { handleValidationErrors } = require('../middleware/validation.middleware');
const { authenticate } = require('../middleware/auth.middleware');
const { authorizeAdmin } = require('../middleware/admin.middleware');
const { asyncHandler } = require('../middleware/async.middleware');

const router = express.Router();

// Public read endpoints
router.get('/', asyncHandler(getProducts));
router.get('/:id', asyncHandler(getProductById));

// Admin-only write endpoints (require JWT + admin role)
router.post(
  '/',
  authenticate,
  authorizeAdmin,
  productRules,
  handleValidationErrors,
  asyncHandler(createProduct)
);

router.put(
  '/:id',
  authenticate,
  authorizeAdmin,
  productRules,
  handleValidationErrors,
  asyncHandler(updateProduct)
);

router.delete('/:id', authenticate, authorizeAdmin, asyncHandler(deleteProduct));

module.exports = router;
