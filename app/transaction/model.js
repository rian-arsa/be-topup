const mongoose = require('mongoose');

const { Schema, model } = mongoose;

let transactionSchema = new Schema(
    {
        historyVoucherTopup: {
            gameName: {
                type: String,
                required: [true, 'Nama game harus diisi'],
            },
            category: {
                type: String,
                required: [true, 'Kategori harus diisi'],
            },
            thumbnail: { type: String },
            coinName: {
                type: String,
                required: [true, 'Nama koin harus diisi'],
            },
            coinQuantity: {
                type: String,
                required: [true, 'Jumlah koin harus diisi'],
            },
            price: { type: Number },
        },

        historyPayment: {
            name: { type: String, required: [true, 'Nama harus diisi'] },
            type: {
                type: String,
                required: [true, 'Tipe pembayaran harus diisi'],
            },
            bankName: {
                type: String,
                required: [true, 'Nama bank harus diisi'],
            },
            noRekening: {
                type: String,
                required: [true, 'Nomor rekening harus diisi'],
            },
        },

        name: {
            type: String,
            required: [true, 'Nama harus diisi'],
            maxlength: [225, 'Nama harus antara 3 -225 karakter'],
            minlength: [3, 'Nama harus antara 3 -225 karakter'],
        },

        accountUser: {
            type: String,
            required: [true, 'Nama harus diisi'],
            maxlength: [225, 'Nama harus antara 3 -225 karakter'],
            minlength: [3, 'Nama harus antara 3 -225 karakter'],
        },

        tax: {
            type: Number,
            default: 0,
        },

        value: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ['pending', 'success', 'failed'],
            default: 'pending',
        },

        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        historyUser: {
            name: { type: String, required: [true, 'Nama pemain harus diisi'] },
            phoneNumber: {
                type: String,
                required: [true, 'Nomor telepon harus diisi'],
                maxlength: [13, 'Nama harus antara 9 - 13 karakter'],
                minlength: [9, 'Nama harus antara 9 - 13 karakter'],
            },
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestampt: true },
);

module.exports = model('Transaction', transactionSchema);
