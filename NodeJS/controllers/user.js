const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose.js');
const jwt = require('jsonwebtoken');
const config = require('../config/dev.js');

exports.auth = function(req, res) {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] });
    }

    User.findOne({ email }, function(err, user) {
        if (err) {
            return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
        }

        if (!user) {
            return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'User does not exists!' }] });
        }

        if (user.hasSamePassword(password)) {

            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, { expiresIn: '1h' });

            return res.json(token);
        } else {
            return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Wrong email or password!' }] });
        }

    });

};

exports.register = function(req, res) {

    const { username, email, password, passwordConfirmation } = req.body;

    if (!username || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] });
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({ errors: [{ title: 'Invalid passwored!', detail: 'paswword is not the same as confirmation!' }] });
    }

    User.findOne({ email }, function(err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Invalid email!', detail: 'User with this email is already exists!' }] });
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err) {
            if (err) {
                return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
            }

            return res.json({ 'registered': true });
        });
    });
}

exports.authMiddleware = function(req, res, next) {

    const token = req.headers.authorization;

    if (token) {

        const user = parseToken(token);
        return res.send({ title: 'token', detail: user });
        User.findById(user.userId, function(err, user) {
            if (err) {
                return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
            }

            if (user) {
                res.locals.user = user;
                next();
            } else {
                return res.status(422).send({ errors: [{ title: 'Not autorized', detail: 'You need to login to get access!' }] });
            }
        });
    } else {
        return res.status(422).send({ errors: [{ title: 'Not autorized', detail: 'You need to login to get access!' }] });
    }
}


function parseToken(token) {

    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAutorazed(res) {
    return res.status(401).send({ errors: [{ title: 'Not authorized!', detail: 'You need to login to get access!' }] });
}