const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.route('/create-order').post(checkoutController.createOrder);

module.exports = router;
