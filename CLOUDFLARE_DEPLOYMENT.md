# Cloudflare Deployment Guide for Natik

## Overview
Deploy your complete Natik website using Cloudflare's ecosystem:
- **Cloudflare Pages**: Frontend hosting
- **Cloudflare Workers**: Backend API
- **Cloudflare D1**: SQLite database
- **Cloudflare KV**: Session storage (optional)

## Benefits of Cloudflare Deployment
- ✅ Global CDN included
- ✅ Automatic HTTPS
- ✅ Serverless scaling
- ✅ Free tier generous limits
- ✅ Integrated ecosystem
- ✅ Custom domain support

## Deployment Options

### Option 1: Full Cloudflare Stack (Recommended)
Convert your Node.js backend to Cloudflare Workers

### Option 2: Hybrid Approach
- Frontend: Cloudflare Pages
- Backend: External service (Railway/Render) with Cloudflare proxy

## Option 1: Full Cloudflare Stack Setup

### Step 1: Prepare Frontend for Cloudflare Pages

1. **Create `wrangler.toml` for Pages**
```toml
name = "natik-frontend"
compatibility_date = "2024-01-01"

[env.production]
vars = { API_BASE_URL = "https://natik-api.your-subdomain.workers.dev" }
```

2. **Update API URLs in frontend**
Create a config file that switches between local and production APIs.

### Step 2: Convert Backend to Cloudflare Workers

1. **Create D1 Database**
```bash
npx wrangler d1 create natik-database
```

2. **Create Worker for API**
Convert Express routes to Cloudflare Workers format.

3. **Deploy Database Schema**
```bash
npx wrangler d1 execute natik-database --file=./schema.sql
```

### Step 3: Deploy to Cloudflare

1. **Deploy Frontend**
```bash
npx wrangler pages deploy
```

2. **Deploy Workers**
```bash
npx wrangler deploy
```

## Option 2: Hybrid Approach (Easier Migration)

### Step 1: Deploy Frontend to Cloudflare Pages

1. **Connect GitHub Repository**
   - Go to Cloudflare Dashboard > Pages
   - Connect your GitHub repository
   - Set build settings:
     - Build command: (leave empty for static site)
     - Build output directory: `/` (root)

2. **Configure Custom Domain**
   - Add your domain to Cloudflare
   - Set up DNS records
   - Enable SSL

### Step 2: Deploy Backend Separately

1. **Deploy to Railway/Render**
   - Keep your existing Node.js backend
   - Deploy to Railway or Render
   - Get the production API URL

2. **Update CORS in Backend**
   ```javascript
   const allowedOrigins = [
     'https://your-domain.com',
     'https://natik.pages.dev'
   ];
   ```

### Step 3: Update Frontend API Configuration

Create a production config that points to your backend URL.

## Quick Start: Hybrid Deployment

### 1. Prepare Repository Structure
```
natik-landing/
├── index.html          # Frontend files
├── styles.css
├── script.js
├── news.js
├── admin-*.html
├── natik-backend/      # Backend (separate deployment)
└── _headers            # Cloudflare headers config
```

### 2. Create `_headers` file for Cloudflare
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/admin-*
  X-Robots-Tag: noindex
```

### 3. Create `_redirects` file for SPA routing
```
/admin/* /admin-dashboard.html 200
/news/* /news-detail.html 200
```

### 4. Update Frontend Configuration

Create a config file that detects environment:

```javascript
// config.js
const CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://your-backend-url.com/api'
};
```

## Environment Variables for Backend

### Development (.env)
```
NODE_ENV=development
DATABASE_URL=file:./dev.db
JWT_SECRET=your-dev-secret
PORT=3001
```

### Production (Railway/Render)
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-secure-production-secret
PORT=3001
FRONTEND_URL=https://your-domain.com
```

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Cloudflare deployment"
git push origin main
```

### 2. Deploy Frontend to Cloudflare Pages
1. Go to Cloudflare Dashboard
2. Pages > Create a project
3. Connect to Git > Select your repository
4. Configure build settings:
   - Framework preset: None
   - Build command: (empty)
   - Build output directory: /
5. Deploy

### 3. Deploy Backend (if using hybrid approach)
1. Deploy to Railway/Render
2. Set environment variables
3. Run database migrations
4. Seed admin user

### 4. Update Frontend API URLs
Update all API calls to use production backend URL.

### 5. Test Everything
- Frontend loads correctly
- API endpoints work
- Admin login functions
- News articles display
- CORS is properly configured

## Cost Estimation
- Cloudflare Pages: Free (up to 500 builds/month)
- Cloudflare Workers: Free (up to 100k requests/day)
- Cloudflare D1: Free (up to 5GB storage)
- External backend (if hybrid): $5-20/month

## Next Steps
1. Choose deployment approach (full Cloudflare vs hybrid)
2. Set up Cloudflare account and domain
3. Configure GitHub repository
4. Deploy and test

The hybrid approach is recommended for easier migration, while the full Cloudflare stack offers better integration and potentially lower costs.
