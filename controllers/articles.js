const Article = require('../models/article');
const {NotFound, Forbidden, Conflict} = require('../errors/http-errors');
const {
    articleNotFound, articleRemoved, removeArticleForbidden, articleNotUnique,
} = require('../messages/messages_ru.json');

const getAllSavedArticles = (req, res, next) => {
    Article.find({owner: req.user._id}).select('-__v')
        .then((articles) => res.status(200).send(articles))
        .catch(next);
};

const createArticle = (req, res, next) => {
    const {
        keyword, title, text, date, source, link, image,
    } = req.body;
    const owner = req.user._id;
    Article.create({
        keyword, title, text, date, source, link, image, owner,
    })
        .then((article) => res.status(200).send(article.hide('__v')))
        .catch(next);
};

const removeArticleByID = (req, res, next) => {
    Article.findOne({_id: req.params.articleId}).select('+owner')
        .orFail(() => {
            throw new NotFound(articleNotFound);
        })
        .then((article) => {
            if (req.user._id === article.owner.toString()) {
                Article.findOneAndDelete({_id: req.params.articleId})
                    .then(() => res.status(200).send({message: articleRemoved}))
                    .catch(next);
            } else {
                throw new Forbidden(removeArticleForbidden);
            }
        })
        .catch(next);
};

const checkArticleExist = (req, res, next) => {
    const {
        keyword, title, text, date, source, link, image,
    } = req.body;
    Article.findOne({keyword, title, text, date, source, link, image})
        .then((article) => {
            if (article !== null) {
                throw new Conflict(articleNotUnique);
            }
            next();
        })
        .catch(next);
};

module.exports = {
    createArticle,
    getAllSavedArticles,
    removeArticleByID,
    checkArticleExist,
};
