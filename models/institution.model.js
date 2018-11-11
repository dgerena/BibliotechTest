const mongoose = require('mongoose');

const connection = require('../datastores/mongo.datastore');

const institutionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    url: String,
    emailDomain: String
});

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;
module.exports.schema = institutionSchema;