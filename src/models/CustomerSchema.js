const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const CustomerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    username: {
        type: String,
        trim: true,
        required: 'username is required',
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required',
    },
    hashed_password: {
        type: String,
        required: 'Password is required',
    },
    salt: String,
    seller: {
        type: Boolean,
        default: false,
    },
    phoneNo: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: '',
    },
    birthday: {
        type: Date,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
});

CustomerSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

CustomerSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 8) {
        this.invalidate('password', 'Password must be at least 8 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

CustomerSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },
};

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
