const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
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
    supportedCourierOption: {
        type: [String],
        enum: ['PosLaju', 'J&T Express', 'DHL', 'NinjaVan', 'SKYNET'],
        default: ['PosLaju', 'J&T Express', 'DHL'],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one supported courier option is required',
        },
    },
    supportedShippingMethod: {
        type: [String],
        enum: ['Standard Delivery', 'Self Pickup'],
        default: ['Standard Delivery'],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one supported shipping method is required',
        },
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
