# Quick Render Deployment Steps

## 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

## 2. Deploy on Render

1. **Go to [render.com](https://render.com)** and sign up/login with GitHub
2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Select "Build and deploy from a Git repository"
   - Connect your GitHub account if not already connected
   - Choose your repository

3. **Configure Service Settings**
   ```
   Name: natik-backend
   Region: Oregon (US West) or Frankfurt (Europe)
   Branch: main
   Root Directory: natik-backend
   Runtime: Node
   Build Command: npm install && npx prisma generate
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click "Advanced" and add these:
   ```
   NODE_ENV = production
   JWT_SECRET = your-super-secure-random-string-here
   DATABASE_URL = file:./prod.db
   FRONTEND_URL = https://your-cloudflare-pages-url.com
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - You'll get a URL like: `https://natik-backend.onrender.com`

## 3. Test Your Backend

Test these endpoints in your browser:
- `https://natik-backend.onrender.com/api/articles`
- `https://natik-backend.onrender.com/api/categories`

## 4. Update Frontend Configuration

Update `/config.js`:
```javascript
const CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://natik-backend.onrender.com/api' // Replace with your actual URL
};
```

## 5. Setup Production Database

After deployment, run the setup script:
1. Go to Render Dashboard → Your Service → Shell
2. Run: `node scripts/setup-production.js`

This will:
- Create admin user (admin@natik.com / admin123)
- Create default categories
- Setup database properly

## 6. Deploy Frontend to Cloudflare Pages

1. **Go to Cloudflare Dashboard** → Pages
2. **Connect GitHub** and select your repository
3. **Build Settings:**
   ```
   Framework: None
   Build command: (empty)
   Build output directory: /
   Root directory: (empty)
   ```
4. **Deploy** - You'll get a URL like `https://natik-xxx.pages.dev`

## 7. Update CORS Settings

Update your Render environment variables:
```
FRONTEND_URL = https://natik-xxx.pages.dev
```

Redeploy the backend service after updating environment variables.

## 8. Test Everything

- ✅ Frontend loads at Cloudflare Pages URL
- ✅ News articles display correctly
- ✅ Admin login works at `/admin-login.html`
- ✅ Can create/edit articles in admin panel
- ✅ No CORS errors in browser console

## Important Notes

- **Free Tier**: Backend spins down after 15 minutes of inactivity
- **First Request**: May take 30-60 seconds after spin-down
- **Database**: SQLite file persists on Render's disk
- **Logs**: Check Render dashboard for any errors

## Costs
- Render Free Tier: $0/month (with spin-down)
- Cloudflare Pages: Free
- **Total: $0/month**

Your site will be live with a global CDN and a production backend!
