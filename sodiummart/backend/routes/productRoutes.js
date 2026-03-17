const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFeaturedProducts,
  getProductById
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.get('/featured', getFeaturedProducts);
router.get('/featured', getFeaturedProducts);
router.get('/get/:id', getProductById);
router.get('/:slug', getProduct);
router.get('/', getProducts);
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
