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

module.exports = {
    getSellerInformation,
    getShopInformation,
};
