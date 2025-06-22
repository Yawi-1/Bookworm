const Book = require('../models/Book');
const uploadToCloudinary = require('../utils/cloudinary');

const createBook = async (req, res) => {
    console.log('hello')
    const { title, caption, rating } = req.body;
    const image = req.file;
    const createdBy = req.auth.id;
    if (!title || !caption || !rating) {
        return res.status(440).json({ message: 'Please enter all fields' });
    }
    try {
        const imageUrl = await uploadToCloudinary(image);
        const book = new Book({
            title,
            caption,
            rating,
            image: imageUrl,
            createdBy
        });
        await book.save();
        console.log(imageUrl);
        res.status(201).json({ message: 'Book created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createBook };