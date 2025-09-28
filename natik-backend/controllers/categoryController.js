const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { articles: { where: { published: true } } }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get single category by slug
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        articles: {
          where: { published: true },
          include: { category: true },
          orderBy: { publishedAt: 'desc' }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

// Create new category (admin only)
const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const category = await prisma.category.create({
      data: { name, slug }
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Update category (admin only)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, slug }
    });

    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete category (admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};
