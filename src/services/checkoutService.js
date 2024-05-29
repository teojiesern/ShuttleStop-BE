const mongoose = require('mongoose');
const Order = require('../models/OrderSchema');
const customerService = require('../services/customerService');

const createOrder = async (customerId, groupedProduct, shippingOption, selectedPaymentMethod) => {
    const customer = await customerService.getCustomerById(customerId);

    const cartItems = [];

    for (const shopName in groupedProduct) {
        const { shop, products } = groupedProduct[shopName];

        for (const item of products) {
            const { product, quantity, selectedVariant } = item;

            const cartItemInstance = {
                product: product.productId,
                quantity: quantity,
                selectedVariant: selectedVariant,
                shop: shop.shopId,
            };

            cartItems.push(cartItemInstance);
        }
    }

    let customerAddress;
    let shippingMethod;
    if (shippingOption === 'standardDelivery') {
        customerAddress = [
            customer.address.street,
            `${customer.address.postcode} ${customer.address.city}`,
            customer.address.state,
            customer.address.country,
        ]
            .filter(Boolean)
            .join(', ');
        shippingMethod = 'Standard Delivery';
    } else {
        customerAddress = shippingOption;
        shippingMethod = 'Express Delivery';
    }

    // check shipping method whether is standard delivery or self collection
    // self collection use different shipping address

    const order = new Order({
        products: cartItems,
        customer_name: customer.username,
        customer_email: customer.email,
        delivery_address: customerAddress,
        shippingOption: shippingMethod,
        paymentMethod: selectedPaymentMethod,
        customer: customerId,
    });

    await order.save();

    return order;
};

module.exports = {
    createOrder,
};
