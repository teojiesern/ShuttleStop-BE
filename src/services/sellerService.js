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

const updateSellerInformation = async (sellerId, data) => {
    const shop = await Seller.findOneAndUpdate({ sellerId }, data, { new: true });

    return shop;
};

const updateShopInformation = async (sellerId, data) => {
    const shop = await Shop.findOneAndUpdate({ owner: sellerId }, data, { new: true });

    return shop;
};

const withdrawIncome = async (sellerId, amount) => {
    const seller = await Seller.findOneAndUpdate({ sellerId }, { $inc: { totalIncome: -amount } }, { new: true });

    return seller.totalIncome;
};

module.exports = {
    getSellerInformation,
    getShopInformation,
    updateShopInformation,
    updateSellerInformation,
    withdrawIncome,
};
