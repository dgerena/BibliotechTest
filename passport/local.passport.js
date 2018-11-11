const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

module.exports = new LocalStrategy({ usernameField: 'email', },
    async function (email, password, done) {

        const user = await User.findOne({ email });
        if (!user) {
            return done('User not found');
        }

        const verified = await user.verifyPassword(password)
        if (!verified) {
            return done('Invalid password');
        }

        return done(null, user);
    }
);
