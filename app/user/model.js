const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please input your name'],
        },
        email: {
            type: String,
            required: [true, 'Please input your email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please input your password'],
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
            require: [true, 'Please input your phone number'],
        },
    },
    { timestamps: true },
);

module.exports = model('User', userSchema);
