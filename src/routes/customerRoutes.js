const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const ciamController = require('../controllers/ciamController');
const { uploadSingle } = require('../middleware/fileMiddleware');

router.route('/').get(ciamController.hasCookie, customerController.getCustomer);
router.route('/signup').post(customerController.createCustomer);
router.route('/my-profile').patch(uploadSingle, customerController.updateCustomer);
router.route('/products').get(customerController.getAllProducts);
router.route('/product/:productId').get(customerController.getProductById);
router.route('/shop-by-product/:productId').get(customerController.getShop);
router.route('/my-purchase-toship').get(customerController.getToShipPurchases);
router.route('/my-purchase-shipping').get(customerController.getShippingPurchases);
router.route('/my-purchase-completed').get(customerController.getCompletedPurchases);
router.route('/complete-order').patch(customerController.completeOrder);
router.route('/update-rating/:orderId').patch(customerController.updateProductRating);
router.route('/change-password').patch(customerController.changePassword);

module.exports = router;
