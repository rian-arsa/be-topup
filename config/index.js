const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  serviceName: process.env.SERVICE_NAME,
  mongoUrl: process.env.MONGO_URL,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
};
