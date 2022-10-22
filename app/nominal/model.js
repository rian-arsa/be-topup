const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const nominalSchema = new Schema({
    coinQuantity: {
        type: Number,
        required: [true, 'Coin quantity is required'],
        default: 0,
    },
    coinName: {
        type: String,
        required: [true, 'Coin name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        default: 0,
    },
});

module.exports = model('Nominal', nominalSchema);
