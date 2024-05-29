const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/sellerController');
const { uploadSingle, uploadFields } = require('../middleware/fileMiddleware');

// GET
router.route('/information').get(sellerController.getSellerInformation);
router.route('/shop/:sellerId').get(sellerController.getShopInformation);
router.route('/orders/to-ship/:shopId').get(sellerController.getToShipOrders);
router.route('/orders/shipping/:shopId').get(sellerController.getshippingOrders);
router.route('/orders/completed/:shopId').get(sellerController.getCompletedOrders);

// POST
router.route('/signup').post(uploadSingle, sellerController.registerSeller);
router.route('/add-product').post(
    uploadFields([
        { name: 'thumbnailImage', maxCount: 1 },
        { name: 'productImage1', maxCount: 1 },
        { name: 'productImage2', maxCount: 1 },
        { name: 'productImage3', maxCount: 1 },
        { name: 'productImage4', maxCount: 1 },
    ]),
    sellerController.addNewProduct,
);
router.route('/update-product').post(
    uploadFields([
        { name: 'thumbnailImage', maxCount: 1 },
        { name: 'productImage1', maxCount: 1 },
        { name: 'productImage2', maxCount: 1 },
        { name: 'productImage3', maxCount: 1 },
        { name: 'productImage4', maxCount: 1 },
    ]),
    sellerController.updateProduct,
);
router.route('/products').post(sellerController.getShopProducts);

// PATCH
router.route('/update-shop').patch(uploadSingle, sellerController.updateShop);

module.exports = router;
