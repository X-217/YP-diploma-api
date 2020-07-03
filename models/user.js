const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const messages = require('../messages/messages_ru.json');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, messages.nameRequired],
    minlength: [2, messages.nameMinlength],
    maxlength: [30, messages.nameMaxlength],
    match: [/^\S.*\S$/, messages.nameNoSpaces],
  },
  email: {
    type: String,
    required: [true, messages.emailRequired],
    unique: [true],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: messages.emailNotValid,
    },
  },
  password: {
    type: String,
    required: [true, messages.passwordRequired],
    select: false,
  },
});

userSchema.plugin(uniqueValidator, { message: messages.emailNotUnique });

module.exports = mongoose.model('user', userSchema);
