const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
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
        trim: true,
    },
    accountNumber: {
        type: String,
        trim: true,
    },
    nameInBankAccount: {
        type: String,
        trim: true,
    },
    totalIncome: {
        type: Number,
        default: 0,
    },
});

const Seller = mongoose.model('Seller', SellerSchema);

module.exports = Seller;
