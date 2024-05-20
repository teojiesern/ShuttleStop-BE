const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const ciamController = require('../controllers/ciamController');

router.route('/').get(ciamController.hasCookie, customerController.getCustomer);
router.route('/signup').post(customerController.createCustomer);
router.route('/my-profile').patch(customerController.updateCustomer);
router.route('/shop-by-product/:productId').get(customerController.getShop);

module.exports = router;
