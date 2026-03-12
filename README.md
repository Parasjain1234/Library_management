# Library Management System API

A comprehensive REST API for managing library books, built with Node.js, Express, and MongoDB.

## Features

- ✅ Complete CRUD operations for books
- ✅ Search books by title or author
- ✅ Proper HTTP status codes
- ✅ Error handling middleware
- ✅ Input validation
- ✅ Auto-generated book IDs
- ✅ MongoDB integration with Mongoose
- ✅ Environment configuration

## Book Schema

Each book record contains:
- **bookId** (Auto-generated)
- **title** (Required)
- **author** (Required)
- **isbn** (Required, Unique)
- **genre** (Required)
- **publisher** (Required)
- **publicationYear**
- **totalCopies** (Required, Positive number)
- **availableCopies** (Required)
- **shelfLocation**
- **bookType** (Reference/Circulating)
- **status** (Available/Checked Out, Default: Available)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/books` | Add a new book |
| GET | `/api/books` | Get all book records |
| GET | `/api/books/:id` | Get book by ID |
| PUT | `/api/books/:id` | Update book details |
| DELETE | `/api/books/:id` | Delete book record |
| GET | `/api/books/search` | Search books by title or author |

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library_management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - Or use MongoDB Atlas and update `MONGODB_URI` in `.env`

5. **Seed sample data (optional)**
   ```bash
   node sample_data.js
   ```

6. **Start the server**
   ```bash
   npm start
   # For development with auto-restart:
   npm run dev
   ```

## API Usage Examples

### Add a New Book
```bash
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0-7432-7356-5",
  "genre": "Fiction",
  "publisher": "Scribner",
  "publicationYear": 1925,
  "totalCopies": 5,
  "availableCopies": 3,
  "shelfLocation": "A1-101",
  "bookType": "Circulating"
}
```

### Get All Books
```bash
GET /api/books
```

### Get Book by ID
```bash
GET /api/books/:id
```

### Update Book
```bash
PUT /api/books/:id
Content-Type: application/json

{
  "title": "The Great Gatsby (Updated Edition)",
  "availableCopies": 4
}
```

### Delete Book
```bash
DELETE /api/books/:id
```

### Search Books
```bash
# Search by title
GET /api/books/search?title=Great

# Search by author
GET /api/books/search?author=Fitzgerald

# Search by both
GET /api/books/search?title=Gatsby&author=Fitzgerald
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## HTTP Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **404** - Not Found
- **500** - Server Error

## Project Structure

```
library_management/
├── controllers/
│   └── bookController.js    # Business logic
├── models/
│   └── Book.js             # MongoDB schema
├── routes/
│   └── bookRoutes.js       # API routes
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── sample_data.js          # Sample data seeder
├── server.js               # Main server file
└── README.md               # Documentation
```

## Deployment

### GitHub
1. Create a new repository on GitHub
2. Add remote origin and push:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <github-repo-url>
   git push -u origin main
   ```

### Render
1. Connect your GitHub repository to Render
2. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 3000 (Render's default)
3. Deploy the web service

## Testing with Postman

Import the following collection to test all endpoints:

```json
{
  "info": {
    "name": "Library Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Books",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/books"
      }
    },
    {
      "name": "Add Book",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/books",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Test Book\",\n  \"author\": \"Test Author\",\n  \"isbn\": \"123-456-789\",\n  \"genre\": \"Fiction\",\n  \"publisher\": \"Test Publisher\",\n  \"totalCopies\": 5,\n  \"availableCopies\": 5\n}"
        }
      }
    }
  ]
}
```

Set `baseUrl` variable to: `http://localhost:3000`

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variables

## License

ISC License
