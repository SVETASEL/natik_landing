const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getRelatedArticles
} = require('../controllers/articleController');

// Public routes
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.get('/:id/related', getRelatedArticles);

// Admin routes (will add authentication middleware later)
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
