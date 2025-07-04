const Book = require('../models/Book');
const uploadToCloudinary = require('../utils/cloudinary');

const createBook = async (req, res) => {
    
  const { title, caption, rating, imageBase64 } = req.body;
  const createdBy = req.auth.id;

  if (!title || !caption || !rating || !imageBase64) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const imageUrl = await uploadToCloudinary(imageBase64); 
    const book = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      createdBy
    });
    await book.save();
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('createdBy', 'username profilePic');
        res.json({ message: 'All books fetched', books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getBooksByUser = async (req, res) => {
    const userId = req.auth.id;
    try {
        const books = await Book.find({ createdBy: userId });
        res.json({ message: 'Books fetched by user', books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createBook,
    getBooks,
    getBooksByUser,
    deleteBook
};