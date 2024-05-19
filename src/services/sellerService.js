const Seller = require('../models/SellerSchema');
const Shop = require('../models/ShopSchema');

const getSellerInformation = async (customerId) => {
    const seller = await Seller.findOne({ customerId });

    return seller;
};

const getShopInformation = async (sellerId) => {
    const shop = await Shop.findOne({ owner: sellerId });

    return shop;
};

const updateShopInformation = async (sellerId, data) => {
    const shop = Shop.findOneAndUpdate({ owner: sellerId }, data, { new: true });

    return shop;
};

module.exports = {
    getSellerInformation,
    getShopInformation,
    updateShopInformation,
};
