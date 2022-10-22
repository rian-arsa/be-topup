const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const voucherSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y',
    },
    thumbnail: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    nominals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Nominal',
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = model('Voucher', voucherSchema);
