# Natik Website Deployment Guide

## Overview
This guide covers deploying the Natik website with its backend API to production.

## Architecture
- **Frontend**: Static files deployed to Netlify
- **Backend**: Node.js API deployed to Railway/Render
- **Database**: PostgreSQL (production) / SQLite (development)

## Prerequisites
1. GitHub repository with your code
2. Netlify account
3. Railway or Render account
4. Domain name (optional)

## Part 1: Prepare Backend for Production

### 1.1 Update Backend for Production Database
The backend needs to be configured for PostgreSQL in production while keeping SQLite for development.

### 1.2 Environment Variables Needed
```
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-secure-jwt-secret-here
PORT=3001
FRONTEND_URL=https://your-netlify-domain.netlify.app
```

### 1.3 CORS Configuration
Update CORS to allow your production frontend domain.

## Part 2: Deploy Backend

### Option A: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `natik-backend` folder
4. Add environment variables
5. Deploy

### Option B: Render
1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build and start commands
5. Add environment variables

## Part 3: Deploy Frontend

### 3.1 Update API URLs
Update the `API_BASE_URL` in your frontend files to point to your production backend.

### 3.2 Netlify Deployment
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set build settings (if needed)
4. Deploy

## Part 4: Database Setup

### 4.1 Create Production Database
- Railway: Add PostgreSQL service
- Render: Add PostgreSQL database
- External: Use services like Supabase, PlanetScale, or Neon

### 4.2 Run Migrations
```bash
npx prisma migrate deploy
npx prisma generate
```

### 4.3 Seed Production Data
```bash
node scripts/seed.js
node scripts/seedAdmin.js
```

## Part 5: Final Configuration

### 5.1 Update Frontend API URLs
Change all `localhost:3001` references to your production backend URL.

### 5.2 Test Everything
- Test frontend deployment
- Test backend API endpoints
- Test admin login
- Test article creation/editing
- Test news display

## Security Checklist
- [ ] Strong JWT secret in production
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Database credentials secured
- [ ] Admin password changed from default

## Monitoring
- Set up error monitoring (Sentry)
- Monitor database performance
- Set up uptime monitoring

## Backup Strategy
- Database backups (automated)
- Code backups (GitHub)
- Media files backup (if applicable)

## Cost Estimation
- Netlify: Free tier available
- Railway: ~$5-20/month depending on usage
- Database: ~$5-15/month
- Domain: ~$10-15/year (optional)

Total estimated cost: $10-50/month depending on traffic and features.
