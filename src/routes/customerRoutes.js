const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const ciamController = require('../controllers/ciamController');
const { uploadSingle } = require('../middleware/fileMiddleware');

router.route('/').get(ciamController.hasCookie, customerController.getCustomer);
router.route('/signup').post(customerController.createCustomer);
router.route('/my-profile').patch(uploadSingle, customerController.updateCustomer);
router.route('/shop-by-product/:productId').get(customerController.getShop);

module.exports = router;
