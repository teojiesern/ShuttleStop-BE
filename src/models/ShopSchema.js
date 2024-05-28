const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ShopSchema = new mongoose.Schema({
    shopId: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
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
    logoPath: {
        type: String,
        required: 'Logo is required',
    },
    description: {
        type: String,
        trim: true,
    },
    shopSupportedCourierOption: {
        type: [String],
        enum: ['PosLaju', 'J&T Express', 'DHL', 'NinjaVan', 'SKYNET'],
        default: ['PosLaju', 'J&T Express', 'DHL'],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one supported courier option is required',
        },
    },
    shopSupportedShippingOption: {
        type: [String],
        enum: ['Standard Delivery', 'Self Pickup'],
        default: ['Standard Delivery'],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one supported shipping option is required',
        },
    },
    shopSupportedPaymentOption: {
        type: [String],
        enum: ['Online Banking', 'Cash on Delivery'],
        default: ['Online Banking'],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one supported payment option is required',
        },
    },
    products: [
        {
            type: String,
            ref: 'Product',
        },
    ],
    owner: { type: String, ref: 'Seller' },
});

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;
