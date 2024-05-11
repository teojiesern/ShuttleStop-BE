const Shop = require('../models/ShopSchema');
const Seller = require('../models/SellerSchema');

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
        return res.status(200).json({
            message: 'Successfully signed up as seller!',
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-register-as-seller',
            message: err.message,
        });
    }
};

module.exports = {
    registerSeller,
};
