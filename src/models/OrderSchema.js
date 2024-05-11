const mongoose = require('mongoose');
const CartItemSchema = require('./CartItemSchema');
const { v4: uuidv4 } = require('uuid');

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    products: [CartItemSchema],
    customer_name: {
        type: String,
        trim: true,
        required: 'Name is required',
    },
    customer_email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required',
    },
    delivery_address: {
        type: String,
        required: 'Delivery address is required',
    },
    shippingOption: {
        type: String,
        enum: ['Standard Delivery', 'Express Delivery'],
        required: 'Shipping option is required',
    },
    courierOption: {
        type: String,
        enum: ['PosLaju', 'J&T Express', 'DHL', 'NinjaVan', 'SKYNET'],
        required: 'Courier option is required',
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now,
    },
    customer: { type: String, ref: 'Customer' },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
