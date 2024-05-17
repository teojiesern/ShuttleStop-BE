const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/sellerController');
const { uploadSingle } = require('../middleware/fileMiddleware');

router.route('/signup').post(uploadSingle, sellerController.registerSeller);
router.route('/information').get(sellerController.getSellerInformation);

module.exports = router;
