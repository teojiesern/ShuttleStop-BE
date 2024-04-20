const express = require('express');
const cors = require('cors');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// region routes
const customerRoutes = require('./routes/customerRoutes');
app.use('/customer', customerRoutes);

// Start the server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
