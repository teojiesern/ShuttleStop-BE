const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        const uri = config.mongodb_uri;
        await mongoose.connect(uri);
        const connection = mongoose.connection;
        console.log('MONGODB CONNECTED SUCCESSFULLY!');
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = connectDB;
