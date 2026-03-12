const express = require('express');
const router = express.Router();
const {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
} = require('../controllers/bookController');

// POST /books - Add a new book
router.post('/', addBook);

// GET /books - Get all book records
router.get('/', getAllBooks);

// GET /books/search - Search books by title or author
router.get('/search', searchBooks);

// GET /books/:id - Get book by ID
router.get('/:id', getBookById);

// PUT /books/:id - Update book details
router.put('/:id', updateBook);

// DELETE /books/:id - Delete book record
router.delete('/:id', deleteBook);

module.exports = router;
