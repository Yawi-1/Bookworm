const router = require('express').Router();
const { createBook } = require('../controllers/book.controller');
const upload = require('../middleware/upload');
const authenticated = require('../middleware/authenticate');
router.post('/addBook', upload.single('image'), authenticated, createBook)

module.exports = router;