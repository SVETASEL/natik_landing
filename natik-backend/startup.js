const { execSync } = require('child_process');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...');
    
    // Check if database exists
    const dbPath = './prod.db';
    const dbExists = fs.existsSync(dbPath);
    
    if (!dbExists) {
      console.log('📦 Running database migrations...');
      try {
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
        console.log('✅ Migrations completed');
        
        // Initialize database with data
        await initializeData();
      } catch (migrationError) {
        console.error('⚠️ Migration failed, starting server anyway:', migrationError.message);
      }
    } else {
      console.log('✅ Database already exists');
    }
    
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
    console.log('🌱 Seeding database...');
    
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
    
    // Check if articles exist
    const articleCount = await prisma.article.count();
    if (articleCount === 0) {
      console.log('📝 Creating sample articles...');
      
      const sampleArticles = [
        {
          title: "Chile se corona como destino verde mundial: ¿Qué hay detrás de este éxito?",
          slug: "chile-destino-verde-mundial",
          excerpt: "Chile ha sido reconocido como el destino de turismo sostenible más importante de Sudamérica. Analizamos los factores que han llevado al país a este logro histórico.",
          content: "<p>Chile ha logrado un reconocimiento sin precedentes en el turismo sostenible mundial...</p>",
          categoryId: 1,
          imageUrl: "/assets/chile-verde.jpg",
          published: true,
          featured: true
        },
        {
          title: "El nuevo turista chileno: más consciente, más conectado con la naturaleza",
          slug: "nuevo-turista-chileno-consciente",
          excerpt: "Una nueva generación de viajeros chilenos está redefiniendo el turismo nacional, priorizando experiencias auténticas y sostenibles.",
          content: "<p>El perfil del turista chileno ha evolucionado significativamente...</p>",
          categoryId: 2,
          imageUrl: "/assets/turista-consciente.jpg",
          published: true,
          featured: false
        }
      ];
      
      for (const article of sampleArticles) {
        await prisma.article.create({ data: article });
      }
    }
    
    console.log('✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
