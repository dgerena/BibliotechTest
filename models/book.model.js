const mongoose = require('mongoose');

const connection = require('../datastores/mongo.datastore');
const Institution = require('./institution.model');

const bookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    institution: {
        type: Number,
        ref: 'Institution',
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
module.exports.schema = bookSchema;
