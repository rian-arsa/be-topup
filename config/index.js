const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
    portUrl: process.env.PORT,
    serviceName: process.env.SERVICE_NAME,
    mongoUrl: process.env.MONGO_URL,
    mongoUser: process.env.MONGO_USER,
    mongoPassword: process.env.MONGO_PASSWORD,

    rootPath: path.resolve(__dirname, '..'),
    jwtKey: process.env.SECRET,
};
