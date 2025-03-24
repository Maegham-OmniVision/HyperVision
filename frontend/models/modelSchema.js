const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: String,
    modelPath: String,
    posterPath: String,
    price: Number,
    rating: Number
});

module.exports = mongoose.model('Model', modelSchema);
