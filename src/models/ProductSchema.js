const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const VariantSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    totalStock: {
        type: Number,
        required: true,
    },
    totalSales: {
        type: Number,
        default: 0,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const ProductSchema = mongoose.Schema({
    productId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please enter product name'],
    },
    category: {
        type: String,
        enum: ['RACQUETS', 'FOOTWEARS', 'APPARELS', 'BAGS', 'SHUTTLECOCKS', 'ACCESSORIES'],
        required: 'Category is required',
    },
    brand: {
        type: String,
        enum: ['YONEX', 'LI_NING', 'VICTOR', 'ASICS', 'APACS', 'FZ_FORZA', 'KAWASAKI'],
        required: 'Brand is required',
    },
    thumbnailImage: {
        type: String,
        required: 'Thumbnail image is required',
    },
    productImages: {
        type: [String],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one product image is required',
        },
    },
    productDescription: {
        type: String,
        required: 'Product description is required',
    },
    variants: {
        type: [VariantSchema],
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one product image is required',
        },
    },
    rate: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
