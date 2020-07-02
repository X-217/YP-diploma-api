const mongoose = require('mongoose');
const validator = require('validator');

const errors = require('../messages/messages.json');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, errors.keywordRequired],
  },
  title: {
    type: String,
    required: [true, errors.titleRequired],
  },
  text: {
    type: String,
    required: [true, errors.textRequired],
  },
  date: {
    type: Date,
    required: [true, errors.dateRequired],
  },
  source: {
    type: String,
    required: [true, errors.sourceRequired],
  },
  link: {
    type: String,
    required: [true, errors.linkRequired],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: errors.linkIsNotUrl,
    },
  },
  image: {
    type: String,
    required: [true, errors.imageRequired],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: errors.imageIsNotUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, errors.ownerRequired],
    select: false,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, errors.articleIdNotValid],
  },
});

module.exports = mongoose.model('article', articleSchema);
