const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL, 'https://natik.pages.dev', 'https://natik.netlify.app', 'https://natik-landing.pages.dev', 'https://natiktravel.com', 'https://www.natiktravel.com'] 
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Seed-Secret']
}));
// Explicitly handle preflight for all routes (Express 5 path-to-regexp v6)
app.options('/(.*)', cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Simple setup endpoint (GET for testing)
app.get('/api/setup', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const bcrypt = require('bcryptjs');
    const prisma = new PrismaClient();
    
    // Create categories
    const categories = [
      { name: 'Turismo Sostenible', slug: 'turismo-sostenible' },
      { name: 'Destinos', slug: 'destinos' },
      { name: 'Ecoturismo', slug: 'ecoturismo' },
      { name: 'Noticias', slug: 'noticias' },
      { name: 'Guías', slug: 'guias' }
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
      where: { email: 'admin@natik.com' },
      update: {},
      create: {
        email: 'admin@natik.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    
    await prisma.$disconnect();
    
    res.json({
      status: 'Database setup completed',
      message: 'Categories and admin user created',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'Setup failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Database status endpoint
app.get('/api/status', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const articleCount = await prisma.article.count();
    const categoryCount = await prisma.category.count();
    const userCount = await prisma.user.count();
    
    await prisma.$disconnect();
    
    res.json({
      status: 'Database connected',
      articles: articleCount,
      categories: categoryCount,
      users: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'Database error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Import routes with error handling
try {
  app.use('/api/articles', require('./routes/articles'));
  app.use('/api/categories', require('./routes/categories'));
  app.use('/api/auth', require('./routes/auth'));
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
}

// Manual database setup endpoint
app.post('/api/setup', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const bcrypt = require('bcryptjs');
    const prisma = new PrismaClient();
    
    // Create categories
    const categories = [
      { name: 'Turismo Sostenible', slug: 'turismo-sostenible' },
      { name: 'Destinos', slug: 'destinos' },
      { name: 'Ecoturismo', slug: 'ecoturismo' },
      { name: 'Noticias', slug: 'noticias' },
      { name: 'Guías', slug: 'guias' }
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
      where: { email: 'admin@natik.com' },
      update: {},
      create: {
        email: 'admin@natik.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    
    await prisma.$disconnect();
    
    res.json({
      status: 'Database setup completed',
      message: 'Categories and admin user created',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'Setup failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
});
