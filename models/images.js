const mongoose = require('mongoose');
const ImagesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    images: [Buffer]
});

const Images = mongoose.model('images', ImagesSchema);

module.exports = Images;