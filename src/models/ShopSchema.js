const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
    },
    description: {
        type: String,
        trim: true,
    },
    logo: {
        data: Buffer,
        contentType: String,
    },
    supportedStandardDelivery: {
        type: [String],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one supported standard delivery is required',
        },
    },
    supportedShippingMethod: {
        type: [String],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one supported shipping method is required',
        },
    },
    pickupAddress: {
        type: String,
        required: 'Pickup address is required',
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required',
    },
    phoneNumber: {
        type: String,
        required: 'Phone number is required',
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    owner: { type: String, ref: 'Seller' },
});

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;
