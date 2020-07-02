const router = require('express').Router();

const {
  validateArticle,
  validateArticleId,
} = require('../middlewares/validations');
const {
  getAllSavedArticles,
  removeArticleByID,
  createArticle,
} = require('../controllers/articles.js');

router.post('/', validateArticle, createArticle);
router.get('/', getAllSavedArticles);
router.delete('/articleId', validateArticleId, removeArticleByID);

module.exports = router;
