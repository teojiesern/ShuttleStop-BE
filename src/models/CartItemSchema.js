const mongoose = require('mongoose');

// NOTE: Cart Item should never be a standalone
const CartItemSchema = new mongoose.Schema({
    product: { type: String, ref: 'Product' },
    quantity: Number,
    selectedVariant: {
        type: String,
    },
    shop: { type: String, ref: 'Shop' },
    status: {
        type: String,
        default: 'To Ship',
        enum: ['To Ship', 'Shipping', 'Completed'],
    },
    trackingNumber: {
        type: String,
        default: () => Math.floor(100000 + Math.random() * 900000), // 6 digit tracking number
        unique: true,
    },
});

module.exports = CartItemSchema;
