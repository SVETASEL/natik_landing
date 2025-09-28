// Configuration for Natik website
const CONFIG = {
  // Automatically detect environment and set API URL
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://your-backend-url.com/api' // Replace with your production backend URL
};
