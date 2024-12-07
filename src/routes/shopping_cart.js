const express = require('express');
const router = express.Router();
const ShoppingCartController = require('..\\app\\controllers\\ShoppingCartControllers');

// Định tuyến cho giỏ hàng
router.get('/', ShoppingCartController.index); // Hiển thị giỏ hàng
router.post('/add', ShoppingCartController.addToCart); // Thêm món vào giỏ hàng

module.exports = router;
