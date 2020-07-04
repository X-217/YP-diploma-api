const {compare, hash} = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../config');
const {
    authorizationComplete, authorizationFailed, emailNotUnique,
} = require('../messages/messages_ru.json');
const User = require('../models/user.js');
const {Unauthorized, Conflict} = require('../errors/http-errors');

const createUser = (req, res, next) => {
    const {
        name, about, avatar, email, password,
    } = req.body;
    hash(password, 10)
        .then((hash) => User.create({
            name, about, avatar, email, password: hash,
        }))
        .then((user) => res.status(201).send(user.hide('password __v')))
        .catch(next);
};

const login = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email}).select('+password _id')
        .orFail(() => {
            throw new Unauthorized(authorizationFailed);
        })
        .then((user) => {
            compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        throw new Unauthorized(authorizationFailed);
                    }
                    const token = jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: '7d'});
                    res.status(200).cookie('jwt', token, {
                        maxAge: 3600000 * 24 * 7,
                        httpOnly: true,
                        sameSite: true,
                    })
                        .send({message: authorizationComplete});
                })
                .catch(next);
        })
        .catch(next);
};

const checkUserExist = (req, res, next) => {
    const {email} = req.body;

    User.findOne({email}).select('-_id email')
        .then((user) => {
            if (user !== null) {
                throw new Conflict(emailNotUnique);
            }
            next();
        })
        .catch(next);
};

module.exports = {
    checkUserExist,
    createUser,
    login,
};
