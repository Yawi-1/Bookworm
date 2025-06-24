const router = require('express').Router();
const { createBook,getBooks,getBooksByUser, deleteBook } = require('../controllers/book.controller');
const upload = require('../middleware/upload');
const authenticated = require('../middleware/authenticate');
router.post('/', authenticated, createBook)
router.get('/',authenticated, getBooks);
router.get('/getBooksByUser', authenticated, getBooksByUser);
router.delete('/:id', authenticated, deleteBook);

module.exports = router;