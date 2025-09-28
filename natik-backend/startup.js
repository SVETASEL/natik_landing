const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...');
    
    // Check if database exists
    const dbPath = './prod.db';
    const dbExists = fs.existsSync(dbPath);
    
    if (!dbExists) {
      console.log('📦 Running database migrations...');
      execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    } else {
      console.log('✅ Database already exists');
    }
    
    console.log('🎉 Database setup completed!');
    
    // Start the main server
    require('./server.js');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
