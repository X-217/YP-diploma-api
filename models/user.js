const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const {
    nameNoSpaces, passwordRequired, emailRequired, nameRequired, emailNotValid, nameMinlength,
    emailNotUnique, nameMaxlength
} = require('../messages/messages_ru.json');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, nameRequired],
        minlength: [2, nameMinlength],
        maxlength: [30, nameMaxlength],
        match: [/^\S.*\S$/, nameNoSpaces],
    },
    email: {
        type: String,
        required: [true, emailRequired],
        unique: [true],
        validate: {
            validator(v) {
                return validator.isEmail(v);
            },
            message: emailNotValid,
        },
    },
    password: {
        type: String,
        required: [true, passwordRequired],
        select: false,
    },
});

userSchema.plugin(uniqueValidator, {message: emailNotUnique});

userSchema.methods.hide = function (secretKeys) {
    if (!userSchema.options.toObject) {
        userSchema.options.toObject = {};
    }
    userSchema.options.toObject.transform = function (doc, ret) {
        const secrets = secretKeys.split(' ');
        secrets.forEach((secret) => {
            delete ret[secret]
        });
        return ret;
    };
    return this.toObject();
};


module.exports = mongoose.model('user', userSchema);
