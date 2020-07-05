const mongoose = require('mongoose');
const validator = require('validator');

const {
    keywordRequired, textRequired, titleRequired, sourceRequired, imageIsNotUrl, linkIsNotUrl,
    dateRequired, imageRequired, linkRequired, ownerRequired
} = require('../messages/messages_ru.json');

const articleSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: [true, keywordRequired],
    },
    title: {
        type: String,
        required: [true, titleRequired],
    },
    text: {
        type: String,
        required: [true, textRequired],
    },
    date: {
        type: Date,
        required: [true, dateRequired],
    },
    source: {
        type: String,
        required: [true, sourceRequired],
    },
    link: {
        type: String,
        required: [true, linkRequired],
        validate: {
            validator(v) {
                return validator.isURL(v);
            },
            message: linkIsNotUrl,
        },
    },
    image: {
        type: String,
        required: [true, imageRequired],
        validate: {
            validator(v) {
                return validator.isURL(v);
            },
            message: imageIsNotUrl,
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, ownerRequired],
        select: false,
    },
});

articleSchema.methods.hide = function (secretKeys) {
    if (!articleSchema.options.toObject) {
        articleSchema.options.toObject = {};
    }
    articleSchema.options.toObject.transform = function (doc, ret) {
        const secrets = secretKeys.split(' ');
        secrets.forEach((secret) => {
            delete ret[secret]
        });
        return ret;
    };
    return this.toObject();
};

module.exports = mongoose.model('article', articleSchema);
