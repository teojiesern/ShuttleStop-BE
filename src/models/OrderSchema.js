const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem',
        },
    ],
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
        street: { type: String, required: 'Street is required' },
        city: { type: String, required: 'City is required' },
        state: { type: String },
        zipcode: { type: String, required: 'Zip Code is required' },
        country: { type: String, required: 'Country is required' },
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
