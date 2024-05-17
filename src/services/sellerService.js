const Seller = require('../models/SellerSchema');

const getSellerInformation = async (customerId) => {
    const seller = await Seller.findOne({ customerId });

    return seller;
};

module.exports = {
    getSellerInformation,
};
