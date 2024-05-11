const mongoose = require('mongoose');

// NOTE: Cart Item are only created when the user places the order, not when the user adds the product to the cart.
const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    quantity: Number,
    shop: { type: mongoose.Schema.ObjectId, ref: 'Shop' },
    status: {
        type: String,
        default: 'Not processed',
        enum: ['To Ship', 'Shipped', 'Completed'],
    },
});

const CartItem = mongoose.model('CartItem', CartItemSchema);
module.exports = CartItem;
