// Configuration for Natik website
const CONFIG = {
  // Automatically detect environment and set API URL
  // Use relative "/api" in production so Cloudflare Pages redirects proxy requests to Render (no CORS)
  API_BASE_URL: window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api'
    : '/api'
};
