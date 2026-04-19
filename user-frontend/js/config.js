const API_CONFIG = {
    // When you deploy, change this URL to your Render backend URL
    // e.g., 'https://yb-studio-backend.onrender.com'
    baseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
             ? 'http://localhost:5001' 
             : 'https://yb-studio-backend.onrender.com' // <-- Update this after deploying to Render
};

const getApiUrl = (path) => `${API_CONFIG.baseUrl}${path}`;
