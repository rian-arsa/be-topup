const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const bankSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please input bank name'],
        },
        bankName: {
            type: String,
            required: [true, 'Please input bank name'],
        },
        noRekening: {
            type: String,
            required: [true, 'Please input bank account number'],
        },
    },
    { timestamps: true },
);

module.exports = model('Bank', bankSchema);
