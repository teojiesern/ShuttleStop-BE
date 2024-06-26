const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const SellerSchema = new mongoose.Schema({
    sellerId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    customerId: {
        type: String,
        ref: 'Customer',
        required: 'Customer ID reference is required',
    },
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
    },
    icNumber: {
        type: String,
        trim: true,
        unique: true,
        required: 'IC Number is required',
    },
    bankAccount: {
        type: String,
        enum: ['Maybank2u', 'CIMB Clicks', 'Public Bank', 'RHB Now', 'Bank Islam', 'Standard Chartered', ''],
        default: '',
        trim: true,
    },
    accountNumber: {
        type: String,
        trim: true,
        default: '',
    },
    nameInBankAccount: {
        type: String,
        trim: true,
        default: '',
    },
    totalIncome: {
        type: Number,
        default: 0,
    },
});

const Seller = mongoose.model('Seller', SellerSchema);

module.exports = Seller;
