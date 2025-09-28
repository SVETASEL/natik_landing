const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
  try {
    console.log('🔄 Applying database migrations...');
    try {
      execSync('npx prisma migrate deploy', { stdio: 'inherit' });
      console.log('✅ Migrations completed');
    } catch (migrationError) {
      console.error('⚠️ Migration failed (continuing):', migrationError.message);
    }
    // Initialize baseline data idempotently
    await initializeData();
    
    console.log('🎉 Database setup completed!');
    
  } catch (error) {
    console.error('⚠️ Database setup had issues:', error.message);
  }
  
  // Always start the server, even if database setup fails
  console.log('🚀 Starting server...');
  require('./server.js');
}

async function initializeData() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🌱 Ensuring baseline data...');
    // Categories (idempotent)
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

    // Admin user (idempotent)
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

    console.log('✅ Baseline data ensured');
  } catch (error) {
    console.error('❌ Baseline initialization failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
