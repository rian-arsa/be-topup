const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

const HAND_ROUND = 10;

let playerSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'email harus diisi'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'nama harus diisi'],
        },
        username: {
            type: String,
            required: [true, 'username harus diisi'],
        },
        avatar: {
            type: String,
        },
        password: {
            type: String,
            required: [true, 'password harus diisi'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        status: {
            type: String,
            enum: ['Y', 'N'],
            default: 'Y',
        },
        phoneNumber: {
            type: String,
            required: [true, 'nomor telepon harus diisi'],
        },
    },
    { timestamps: true },
);

playerSchema.path('email').validate(
    async function (value) {
        try {
            const count = await this.model('Player').countDocuments({
                email: value,
            });
            return !count;
        } catch (error) {
            throw error;
        }
    },
    (attr) => `${attr.value} sudah terdaftar`,
);

playerSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HAND_ROUND);
    next();
});

module.exports = mongoose.model('Player', playerSchema);
