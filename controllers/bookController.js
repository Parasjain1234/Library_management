const Book = require('../models/Book');


const addBook = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        
        const book = new Book(req.body);
        await book.save();
        
        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: book
        });
    } catch (error) {
        console.error('Error in addBook:', error);
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'ISBN already exists',
                error: error.message
            });
        }
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                error: errors.join(', ')
            });
        }
        
        res.status(400).json({
            success: false,
            message: 'Error adding book',
            error: error.message
        });
    }
};

// Get all book records
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving books',
            error: error.message
        });
    }
};

// Get book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving book',
            error: error.message
        });
    }
};

// Update book details
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'ISBN already exists',
                error: error.message
            });
        }
        res.status(400).json({
            success: false,
            message: 'Error updating book',
            error: error.message
        });
    }
};

// Delete book record
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting book',
            error: error.message
        });
    }
};

// Search books by title or author
const searchBooks = async (req, res) => {
    try {
        const { title, author } = req.query;
        let searchQuery = {};

        if (title) {
            searchQuery.title = { $regex: title, $options: 'i' };
        }
        if (author) {
            searchQuery.author = { $regex: author, $options: 'i' };
        }

        if (!title && !author) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title or author for search'
            });
        }

        const books = await Book.find(searchQuery).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            message: 'Books searched successfully',
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching books',
            error: error.message
        });
    }
};

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
};
