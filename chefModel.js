const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // store image URL/path
    description: { type: String, required: true }
});

module.exports = mongoose.model('Chef', chefSchema);