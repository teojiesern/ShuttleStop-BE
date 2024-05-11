require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/db');

connectDB();

// region db
const app = express();

// region middleware
app.use(
    cors({
        origin: config.allowedOrigins,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

// region routes
const customerRoutes = require('./routes/customerRoutes');
const ciamRoutes = require('./routes/ciamRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const marketingRoutes = require('./routes/marketingRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');

app.use('/customer-service', customerRoutes);
app.use('/authentication-service', ciamRoutes);
app.use('/seller-service', sellerRoutes);
app.use('/marketing-service', marketingRoutes);
app.use('/checkout-service', checkoutRoutes);

// Start the server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
