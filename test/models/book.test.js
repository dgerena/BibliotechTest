const mongoose = require('mongoose');
const { assert } = require('chai');
const Book = require('../../models/book.model');

describe('Book model', () => {

    it('should create Schema', () => {
        assert(Book.schema instanceof mongoose.Schema);
    });

    it('should create model', () => {
        assert(Book.base === mongoose && Book.model, "Is a mongoose model");
    });

});