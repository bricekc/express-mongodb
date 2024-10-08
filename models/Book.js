const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    author: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
}, { timestamps: true})

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
