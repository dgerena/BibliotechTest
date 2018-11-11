const express = require('express');

const Book = require('../models/book.model');

const router = express.Router();
module.exports = router;

async function createMethod(req, res) {
    const {
        isbn,
        title,
        author,
        institution,
    } = req.body;

    if (!isbn) {
        return res.jsend.fail("fields required {isbn}");
    }

    const bookFound = await Book.findOne({ isbn }).catch(error => error);

    if (bookFound instanceof Error) {
        return res.jsend.error(bookFound);
    }

    if (bookFound) {
        return res.jsend.fail("Book already exists");
    }

    const book = await Book.create({
        isbn,
        title,
        author,
        institution,
    }).catch(error => error);

    if (book instanceof Error) {
        return res.jsend.error(book);
    }

    book.save();

    res.jsend.success(book);
};

async function getBooks(req, res) {
    //db get books from mongo
    const book = await Book.findOne();

    res.jsend.success(book);
};

router.get('/', getBooks);
router.post('/create', createMethod);