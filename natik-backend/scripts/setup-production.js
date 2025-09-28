const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupProduction() {
  try {
    console.log('🚀 Setting up production database...');

    // Run migrations
    console.log('📦 Running database migrations...');
    
    // Check if admin user exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!existingAdmin) {
      console.log('👤 Creating admin user...');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await prisma.user.create({
        data: {
          email: 'admin@natik.com',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@natik.com');
      console.log('🔑 Password: admin123');
      console.log('⚠️  Please change the password after first login!');
    } else {
      console.log('👤 Admin user already exists');
    }

    // Check if categories exist
    const categoryCount = await prisma.category.count();
    if (categoryCount === 0) {
      console.log('📂 Creating default categories...');
      
      const categories = [
        { name: 'Turismo Sostenible', slug: 'turismo-sostenible' },
        { name: 'Destinos', slug: 'destinos' },
        { name: 'Ecoturismo', slug: 'ecoturismo' },
        { name: 'Noticias', slug: 'noticias' },
        { name: 'Guías', slug: 'guias' }
      ];

      for (const category of categories) {
        await prisma.category.create({ data: category });
      }
      
      console.log('✅ Categories created successfully!');
    } else {
      console.log('📂 Categories already exist');
    }

    console.log('🎉 Production setup completed successfully!');

  } catch (error) {
    console.error('❌ Error setting up production:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupProduction();
