const mongoose = require('mongoose');

// NOTE: Cart Item should never be a standalone
const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    quantity: Number,
    selectedVariant: {
        type: String,
    },
    shop: { type: mongoose.Schema.ObjectId, ref: 'Shop' },
    status: {
        type: String,
        default: 'To Ship',
        enum: ['To Ship', 'Shipped', 'Completed'],
    },
    trackingNumber: {
        type: String,
        default: () => Math.floor(100000 + Math.random() * 900000), // 6 digit tracking number
        unique: true,
    },
});

module.exports = CartItemSchema;
