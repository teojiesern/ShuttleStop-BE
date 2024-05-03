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
    }),
);
app.use(express.json());
app.use(cookieParser());

// region routes
const customerRoutes = require('./routes/customerRoutes');
const ciamRoutes = require('./routes/ciamRoutes');

app.use('/customer-service', customerRoutes);
app.use('/authentication-service', ciamRoutes);

// Start the server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
