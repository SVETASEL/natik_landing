# Cloudflare Pages Deployment Steps for Natik

## Quick Deployment Guide

### Step 1: Prepare Your Repository
Your repository is already set up correctly. Just ensure these files are committed:
- All HTML, CSS, JS files in root directory
- `_headers` and `_redirects` files for Cloudflare configuration
- `natik-backend/` folder (for separate backend deployment)

### Step 2: Deploy Frontend to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Navigate to Pages section
   - Click "Create a project"

2. **Connect GitHub Repository**
   - Select "Connect to Git"
   - Choose your Natik repository
   - Select the main/master branch

3. **Configure Build Settings**
   ```
   Framework preset: None
   Build command: (leave empty)
   Build output directory: /
   Root directory: /
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Your site will be available at `https://natik-xxx.pages.dev`

### Step 3: Deploy Backend

**Option A: Keep Current Setup (Recommended)**
If your backend is already running elsewhere, just update the CORS settings:

```javascript
// In natik-backend/server.js
const allowedOrigins = [
  'https://your-domain.com',
  'https://natik-xxx.pages.dev', // Your Cloudflare Pages URL
  'http://localhost:3000' // For development
];
```

**Option B: Deploy Backend to Railway/Render**
1. Create account on Railway or Render
2. Connect your GitHub repository
3. Select `natik-backend` folder
4. Set environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=your-database-url
   JWT_SECRET=your-secure-secret
   FRONTEND_URL=https://your-cloudflare-pages-url
   ```

### Step 4: Update Frontend Configuration

Update your `config.js` with the production backend URL:

```javascript
const CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://your-backend-url.com/api' // Your actual backend URL
};
```

### Step 5: Custom Domain (Optional)

1. **Add Domain to Cloudflare**
   - Go to Cloudflare Dashboard > Websites
   - Add your domain
   - Update nameservers

2. **Configure Pages Custom Domain**
   - In Pages > Your Project > Custom domains
   - Add your domain
   - SSL will be automatically configured

### Step 6: Test Everything

- [ ] Frontend loads correctly
- [ ] News articles display
- [ ] Admin login works
- [ ] Article creation/editing works
- [ ] API calls succeed

## Environment Variables Needed

### Backend (.env or hosting platform)
```
NODE_ENV=production
DATABASE_URL=your-database-connection-string
JWT_SECRET=your-very-secure-jwt-secret-here
FRONTEND_URL=https://your-domain.com
PORT=3001
```

### Frontend (automatic via config.js)
- API_BASE_URL is automatically detected

## Quick Commands

### Push to GitHub
```bash
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main
```

### Test locally before deployment
```bash
# Start backend
cd natik-backend
npm start

# Open frontend in browser
open index.html
```

## Troubleshooting

### CORS Issues
Make sure your backend allows your Cloudflare Pages domain in CORS settings.

### API Not Working
1. Check if backend is running
2. Verify API URLs in config.js
3. Check browser console for errors
4. Verify CORS configuration

### Admin Panel Not Loading
1. Check `_redirects` file is deployed
2. Verify admin HTML files are in root directory
3. Check browser console for JavaScript errors

## Cost
- Cloudflare Pages: Free (generous limits)
- Backend hosting: $5-20/month (Railway/Render)
- Custom domain: $10-15/year (optional)

Your site will be live at `https://natik-xxx.pages.dev` immediately after deployment!
