const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const connection = require('../datastores/mongo.datastore');
const Institution = require('./institution.model');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['student', 'academic', 'administrator'],
    },
    salt: String,
    password: String,
    institution: {
        type: Number,
        ref: 'Institution',
    }
});

userSchema.methods.setPassword = async function setPassword(password) {
    const salt = await bcrypt.genSalt(10);
    this.salt = salt;

    const hash = await bcrypt.hash(password, salt);
    this.password = hash;

};
userSchema.methods.verifyPassword = async function verifyPassword(passwordAttempt) {
    const attemptedHash = await bcrypt.hash(passwordAttempt, this.salt);
    return this.password === attemptedHash;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.schema = userSchema;