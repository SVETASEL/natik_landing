# Render Backend Deployment Guide for Natik

## Step-by-Step Render Deployment

### Step 1: Prepare Backend for Production

Your backend is already mostly ready. We need to make a few adjustments for production.

### Step 2: Create Render Account and Deploy

1. **Go to [render.com](https://render.com)** and sign up/login
2. **Connect GitHub** - Link your GitHub account
3. **Create New Web Service**
   - Click "New +" > "Web Service"
   - Connect your repository
   - Select your repository from the list

### Step 3: Configure Render Settings

**Basic Settings:**
- **Name**: `natik-backend`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `natik-backend`
- **Runtime**: `Node`

**Build & Deploy Settings:**
- **Build Command**: `npm install && npx prisma generate`
- **Start Command**: `npm start`

### Step 4: Environment Variables

Add these environment variables in Render dashboard:

```
NODE_ENV=production
JWT_SECRET=your-super-secure-jwt-secret-here-make-it-long-and-random
PORT=10000
FRONTEND_URL=https://your-cloudflare-pages-domain.com
DATABASE_URL=file:./prod.db
```

### Step 5: Database Setup

**Option A: SQLite (Simple)**
- Keep using SQLite (good for small to medium traffic)
- Database file will be stored on Render's disk

**Option B: PostgreSQL (Recommended for production)**
- Add PostgreSQL database in Render
- Update DATABASE_URL to PostgreSQL connection string

### Step 6: Deploy and Test

1. Click "Create Web Service"
2. Render will automatically deploy your backend
3. You'll get a URL like: `https://natik-backend.onrender.com`
4. Test your API endpoints

### Step 7: Update Frontend Configuration

Update your `config.js` with the Render URL:

```javascript
const CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://natik-backend.onrender.com/api' // Your Render URL
};
```

## Important Notes

### Free Tier Limitations
- Render free tier "spins down" after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider paid tier ($7/month) for always-on service

### Database Persistence
- SQLite files persist on Render's disk storage
- For high availability, consider PostgreSQL add-on

### CORS Configuration
Your backend is already configured to accept requests from your frontend domain.

## Troubleshooting

### Build Fails
- Check that `package.json` is in `natik-backend` folder
- Verify all dependencies are listed in `package.json`
- Check build logs in Render dashboard

### Database Issues
- Ensure Prisma generates correctly: `npx prisma generate`
- Check DATABASE_URL format
- Verify database migrations run: `npx prisma migrate deploy`

### API Not Responding
- Check service logs in Render dashboard
- Verify PORT environment variable is set
- Test endpoints directly in browser

## Cost Estimation
- **Free Tier**: $0/month (with spin-down)
- **Starter Tier**: $7/month (always-on)
- **PostgreSQL**: $7/month (if needed)

Total: $0-14/month depending on your needs.
