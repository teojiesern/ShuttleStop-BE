const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/sellerController');
const { uploadSingle } = require('../middleware/fileMiddleware');

// GET
router.route('/information').get(sellerController.getSellerInformation);
router.route('/shop/:sellerId').get(sellerController.getShopInformation);

// POST
router.route('/signup').post(uploadSingle, sellerController.registerSeller);

module.exports = router;
