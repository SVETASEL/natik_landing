// Configuration for Natik website
const CONFIG = {
  // Automatically detect environment and set API URL
  // Use full Render URL in production to bypass Cloudflare proxy
  API_BASE_URL: window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api'
    : 'https://natik-landing.onrender.com/api'
};
