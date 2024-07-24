const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createProduct);

router.get('/', getAllProducts);

router.get('/search', searchProducts);

router.get('/:id', getProductById);

router.put('/:id', protect, updateProduct);

router.delete('/:id', protect, deleteProduct);

module.exports = router;