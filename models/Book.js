const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    publicationYear: {
        type: Number,
        min: 1000,
        max: new Date().getFullYear()
    },
    totalCopies: {
        type: Number,
        required: true,
        min: 1
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0
    },
    shelfLocation: {
        type: String,
        trim: true
    },
    bookType: {
        type: String,
        enum: ['Reference', 'Circulating'],
        default: 'Circulating'
    },
    status: {
        type: String,
        enum: ['Available', 'Checked Out'],
        default: 'Available'
    }
}, {
    timestamps: true
});

// Auto-generate book ID - Fixed middleware
bookSchema.pre('save', function(next) {
    if (!this.bookId) {
        this.bookId = 'BOOK' + Date.now().toString().slice(-8);
    }
    if (next && typeof next === 'function') {
        next();
    }
});

module.exports = mongoose.model('Book', bookSchema);
