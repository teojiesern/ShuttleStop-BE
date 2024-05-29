const Shop = require('../models/ShopSchema');
const Seller = require('../models/SellerSchema');

const SellerService = require('../services/sellerService');
const CustomerService = require('../services/customerService');
const ProductService = require('../services/productService');
const OrderService = require('../services/orderService');
const Product = require('../models/ProductSchema');
const { deleteFile } = require('../middleware/fileMiddleware');

const registerShop = ({ shop, logoPath, owner }) => {
    const shopInformation = {
        ...shop,
        logoPath,
        owner,
    };

    const shopInstance = new Shop(shopInformation);
    return shopInstance;
};

const registerSeller = async (req, res) => {
    const { sellerName, sellerIcNumber, shopName, shopPickupAddress, shopEmail, shopPhoneNumber } = req.body;

    const seller = new Seller({
        name: sellerName,
        icNumber: sellerIcNumber,
        customerId: req.cookies['shuttle-token'],
    });

    const shop = registerShop({
        shop: {
            name: shopName,
            pickupAddress: shopPickupAddress,
            email: shopEmail,
            phoneNumber: shopPhoneNumber,
        },
        logoPath: req.file.path,
        owner: seller.sellerId,
    });

    try {
        await seller.save();
        await shop.save();

        await CustomerService.updateCustomer(req.cookies['shuttle-token'], { seller: true });

        return res.status(200).json({
            message: 'Successfully signed up as seller!',
            seller,
            shop,
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-register-as-seller',
            message: err.message,
        });
    }
};

const updateShop = async (req, res) => {
    try {
        const { sellerId, file, ...payload } = req.body;

        if (req.file) {
            const shop = await SellerService.getShopInformation(sellerId);

            if (shop.logoPath) {
                deleteFile(shop.logoPath);
            }
            payload.logoPath = req.file.path;
        }

        const updatedShop = await SellerService.updateShopInformation(sellerId, payload);

        res.json(updatedShop);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

const addNewProduct = async (req, res) => {
    try {
        const { sellerId, name, category, brand, productDescription, variants } = req.body;

        const thumbnailImage = req.files['thumbnailImage'][0].path;

        const productImages = Object.keys(req.files)
            .filter((fieldName) => fieldName !== 'thumbnailImage')
            .flatMap((fieldName) => req.files[fieldName].map((file) => file.path));

        const parsedVariants = JSON.parse(variants);

        const product = new Product({
            name,
            category,
            brand,
            thumbnailImage,
            productImages,
            productDescription,
            variants: parsedVariants,
        });
        await product.save();

        // Puts newly added product to the top of the list
        await SellerService.updateShopInformation(sellerId, {
            $push: {
                products: {
                    $each: [product.productId],
                    $position: 0,
                },
            },
        });
        return res.status(200).json({
            message: 'Successfully added a new product!',
            productId: product.productId,
        });
    } catch (error) {
        return res.status(500).json({
            type: 'unable-to-add-new-product',
            message: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updateFields = {};
        const { productId, name, category, brand, productDescription, variants, productImages } = req.body;

        const product = await ProductService.getProductById(productId);

        if (name) updateFields.name = name;
        if (category) updateFields.category = category;
        if (brand) updateFields.brand = brand;
        if (productDescription) updateFields.productDescription = productDescription;
        if (variants) updateFields.variants = JSON.parse(variants);
        if (productImages) {
            const parsedProductImages = JSON.parse(productImages);

            const oldImages = product.productImages;
            const imagesToDelete = oldImages.filter((img) => !parsedProductImages.includes(img));
            imagesToDelete.forEach((img) => deleteFile(img));
            updateFields.productImages = parsedProductImages;
        }

        if (req.files && req.files['thumbnailImage']) {
            if (product.thumbnailImage && req.files['thumbnailImage'][0].path !== product.thumbnailImage) {
                deleteFile(product.thumbnailImage);
            }
            updateFields.thumbnailImage = req.files['thumbnailImage'][0].path;
        }

        const updatedProduct = await ProductService.updateProduct(productId, updateFields);

        return res.status(200).json({
            message: 'Successfully updated the product!',
            updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            type: 'unable-to-update-product',
            message: error.message,
        });
    }
};

const getSellerInformation = async (req, res) => {
    try {
        const seller = await SellerService.getSellerInformation(req.cookies['shuttle-token']);

        return res.status(200).json({
            seller,
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-get-seller-information',
            message: err.message,
        });
    }
};

const getShopInformation = async (req, res) => {
    try {
        const shop = await SellerService.getShopInformation(req.params.sellerId);

        return res.status(200).json({
            shop,
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-get-shop-information',
            message: err.message,
        });
    }
};

const getShopProducts = async (req, res) => {
    try {
        const productIds = req.body.productIds;
        const products = await ProductService.getProductsByIds(productIds);
        products.sort((a, b) => productIds.indexOf(a.productId) - productIds.indexOf(b.productId));

        res.json(products);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

const getToShipOrders = async (req, res) => {
    try {
        const { shopId } = req.params;

        const allOrders = await OrderService.getAllOrders();
        const orders = [];

        for (let order of allOrders) {
            const matchingProducts = [];

            for (let product of order.products) {
                if (product.shop.toString() === shopId && product.status === 'To Ship') {
                    const productDetails = await ProductService.getProductById(product.product);
                    matchingProducts.push({ ...product._doc, thumbnailImage: productDetails.thumbnailImage });
                }
            }

            if (matchingProducts.length > 0) {
                orders.push({ ...order._doc, products: matchingProducts });
            }
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

const getShippingOrders = async (req, res) => {
    try {
        const { shopId } = req.params;

        const allOrders = await OrderService.getAllOrders();
        const orders = [];

        for (let order of allOrders) {
            const matchingProducts = [];

            for (let product of order.products) {
                if (product.shop.toString() === shopId && product.status === 'Shipping') {
                    const productDetails = await ProductService.getProductById(product.product);
                    matchingProducts.push({ ...product._doc, thumbnailImage: productDetails.thumbnailImage });
                }
            }

            if (matchingProducts.length > 0) {
                orders.push({ ...order._doc, products: matchingProducts });
            }
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

const getCompletedOrders = async (req, res) => {
    try {
        const { shopId } = req.params;

        const allOrders = await OrderService.getAllOrders();
        const orders = [];

        for (let order of allOrders) {
            const matchingProducts = [];

            for (let product of order.products) {
                if (product.shop.toString() === shopId && product.status === 'Completed') {
                    const productDetails = await ProductService.getProductById(product.product);
                    matchingProducts.push({ ...product._doc, thumbnailImage: productDetails.thumbnailImage });
                }
            }

            if (matchingProducts.length > 0) {
                orders.push({ ...order._doc, products: matchingProducts });
            }
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

module.exports = {
    registerSeller,
    updateShop,
    addNewProduct,
    updateProduct,
    getSellerInformation,
    getShopInformation,
    getShopProducts,
    getToShipOrders,
    getShippingOrders,
    getCompletedOrders,
};
