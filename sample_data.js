const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const sampleBooks = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        genre: "Fiction",
        publisher: "Scribner",
        publicationYear: 1925,
        totalCopies: 5,
        availableCopies: 3,
        shelfLocation: "A1-101",
        bookType: "Circulating",
        status: "Available"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0-06-112008-4",
        genre: "Fiction",
        publisher: "J.B. Lippincott & Co.",
        publicationYear: 1960,
        totalCopies: 8,
        availableCopies: 6,
        shelfLocation: "A1-102",
        bookType: "Circulating",
        status: "Available"
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "978-0-452-28423-4",
        genre: "Dystopian Fiction",
        publisher: "Secker & Warburg",
        publicationYear: 1949,
        totalCopies: 4,
        availableCopies: 2,
        shelfLocation: "B2-201",
        bookType: "Circulating",
        status: "Available"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "978-0-14-143951-8",
        genre: "Romance",
        publisher: "T. Egerton",
        publicationYear: 1813,
        totalCopies: 6,
        availableCopies: 4,
        shelfLocation: "C3-301",
        bookType: "Circulating",
        status: "Available"
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        isbn: "978-0-316-76948-0",
        genre: "Fiction",
        publisher: "Little, Brown and Company",
        publicationYear: 1951,
        totalCopies: 3,
        availableCopies: 1,
        shelfLocation: "A1-103",
        bookType: "Circulating",
        status: "Available"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_management');
        console.log('Connected to MongoDB');

        // Clear existing books
        await Book.deleteMany({});
        console.log('Cleared existing books');

        // Insert sample books
        const insertedBooks = await Book.insertMany(sampleBooks);
        console.log(`Inserted ${insertedBooks.length} sample books`);

        console.log('Sample data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
