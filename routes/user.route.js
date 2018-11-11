const express = require('express');
const passport = require('passport');

const User = require('../models/user.model');
const localStrategy = require('../passport/local.passport');
const router = express.Router();

passport.use(localStrategy);

module.exports = router;

async function createMethod(req, res) {
    const { name, email, password, role, institution } = req.body;

    if (!name || !email || !password || !role || !institution) {

        return res.jsend.fail("fields required { name, email, password, role, institution }");
    }

    const userFound = await User.findOne({ email }).catch(error => error);

    if (userFound instanceof Error) {
        return res.jsend.error(userFound);
    }

    if (userFound) {
        return res.jsend.fail("User already exists");
    }

    const user = await User.create({ name, email, role, institution, }).catch(error => error);

    if (user instanceof Error) {
        return res.jsend.error(user);
    }

    await user.setPassword(password);
    user.save();

    res.jsend.success(user);
};

async function localMethod(req, res, next) {
    passport.authenticate('local', function (error, user, info) {
        if (error) {
            return res.jsend.error(error);
        }

        res.jsend.success(user);
    })(req, res, next);
}

router.post('/signIn', localMethod);
router.post('/create', createMethod);