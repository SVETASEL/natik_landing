const prisma = require('../models');

// Get all published articles
const getArticles = async (req, res) => {
  try {
    const { category, featured, limit = 10, offset = 0 } = req.query;
    
    const where = {
      published: true,
      ...(category && { category: { slug: category } }),
      ...(featured && { featured: featured === 'true' })
    };

    const articles = await prisma.article.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

// Get single article by ID
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const article = await prisma.article.findUnique({
      where: { 
        id: parseInt(id),
        published: true 
      },
      include: {
        category: true
      }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
};

// Create new article (admin only)
const createArticle = async (req, res) => {
  try {
    const { title, excerpt, content, imageUrl, featured, published, categoryId } = req.body;

    const article = await prisma.article.create({
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        featured: featured || false,
        published: published || false,
        publishedAt: published ? new Date() : null,
        categoryId: parseInt(categoryId)
      },
      include: {
        category: true
      }
    });

    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
};

// Update article (admin only)
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, imageUrl, featured, published, categoryId } = req.body;

    const updateData = {
      ...(title && { title }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content && { content }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(featured !== undefined && { featured }),
      ...(categoryId && { categoryId: parseInt(categoryId) })
    };

    // Handle published status change
    if (published !== undefined) {
      updateData.published = published;
      if (published && !updateData.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        category: true
      }
    });

    res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
};

// Delete article (admin only)
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.article.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
};

// Get related articles
const getRelatedArticles = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 3 } = req.query;

    const currentArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      select: { categoryId: true }
    });

    if (!currentArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const relatedArticles = await prisma.article.findMany({
      where: {
        published: true,
        categoryId: currentArticle.categoryId,
        id: { not: parseInt(id) }
      },
      include: {
        category: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: parseInt(limit)
    });

    res.json(relatedArticles);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    res.status(500).json({ error: 'Failed to fetch related articles' });
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getRelatedArticles
};
