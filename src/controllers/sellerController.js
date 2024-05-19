const Shop = require('../models/ShopSchema');
const Seller = require('../models/SellerSchema');

const SellerService = require('../services/sellerService');
const CustomerService = require('../services/customerService');
const Product = require('../models/ProductSchema');

const registerShop = ({ shop, logoPath, owner }) => {
    const shopInformation = {
        ...shop,
        logoPath,
        owner,
    };

    const shopInstance = new Shop(shopInformation);
    return shopInstance;
};

const updateShop = async (req, res) => {
    try {
        const { sellerId, ...payload } = req.body;
        const updatedShop = await SellerService.updateShopInformation(sellerId, payload);

        res.json(updatedShop);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

const registerSeller = async (req, res) => {
    const { sellerName, sellerIcNumber, shopName, shopPickupAddress, shopEmail, shopPhoneNumber } = req.body;

    const seller = new Seller({
        name: sellerName,
        icNumber: sellerIcNumber,
        customerId: req.cookies['shuttle-token'],
    });

    const shop = registerShop({
        shop: {
            name: shopName,
            pickupAddress: shopPickupAddress,
            email: shopEmail,
            phoneNumber: shopPhoneNumber,
        },
        logoPath: req.file.path,
        owner: seller.sellerId,
    });

    try {
        await seller.save();
        await shop.save();

        await CustomerService.updateCustomer(req.cookies['shuttle-token'], { seller: true });

        return res.status(200).json({
            message: 'Successfully signed up as seller!',
            seller,
            shop,
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-register-as-seller',
            message: err.message,
        });
    }
};

const addNewProduct = async (req, res) => {
    try {
        const { sellerId, payload } = req.body;
        const product = new Product(payload);
        await product.save();
        await SellerService.updateShopInformation(sellerId, { $push: { products: product.productId } });
    } catch (error) {
        return res.status(500).json({
            type: 'unable-to-add-new-product',
            message: err.message,
        });
    }
};

const getSellerInformation = async (req, res) => {
    try {
        const seller = await SellerService.getSellerInformation(req.cookies['shuttle-token']);

        return res.status(200).json({
            seller,
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-get-seller-information',
            message: err.message,
        });
    }
};

const getShopInformation = async (req, res) => {
    try {
        const shop = await SellerService.getShopInformation(req.params.sellerId);

        return res.status(200).json({
            shop,
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-get-shop-information',
            message: err.message,
        });
    }
};

module.exports = {
    registerSeller,
    updateShop,
    addNewProduct,
    getSellerInformation,
    getShopInformation,
};
