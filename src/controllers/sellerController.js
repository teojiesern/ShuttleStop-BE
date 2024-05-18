const Shop = require('../models/ShopSchema');
const Seller = require('../models/SellerSchema');

const SellerService = require('../services/sellerService');
const CustomerService = require('../services/customerService');

const registerShop = ({ shop, logoPath, owner }) => {
    const shopInformation = {
        ...shop,
        logoPath,
        owner,
    };

    const shopInstance = new Shop(shopInformation);
    return shopInstance;
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
        const shop = await SellerService.getShopInformation(req.body.sellerId);

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
    getSellerInformation,
    getShopInformation,
};
