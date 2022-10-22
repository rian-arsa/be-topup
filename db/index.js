const mongoose = require('mongoose');
const { mongoUrl } = require('../config');

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;
