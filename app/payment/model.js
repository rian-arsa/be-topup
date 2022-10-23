const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
    {
        type: {
            type: String,
            required: [true, 'Please input payment type'],
        },
        status: {
            type: String,
            enum: ['Y', 'N'],
            default: 'Y',
        },
        banks: {
            type: [Schema.Types.ObjectId],
            ref: 'Bank',
        },
    },
    { timestamps: true },
);

module.exports = model('Payment', paymentSchema);
