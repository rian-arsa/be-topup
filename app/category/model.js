const mongoose = require('mongoose');

const { Schema, model } = mongoose;

let categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = model('Category', categorySchema);
