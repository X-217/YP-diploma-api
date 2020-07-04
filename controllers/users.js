const User = require('../models/user.js');
const {userNotFound} = require('../messages/messages_ru.json');
const {NotFound} = require('../errors/http-errors');

const getAuthorizedUser = (req, res, next) => {
    User.findById(req.user._id).select('-_id name email')
        .orFail(() => {
            throw new NotFound(userNotFound);
        })
        .then((user) => res.status(200).send(user))
        .catch(next);
};

module.exports = {
    getAuthorizedUser,
};
