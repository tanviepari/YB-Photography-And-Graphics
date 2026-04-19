const API_CONFIG = {
    // When you deploy, change this URL to your Render backend URL
    baseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
             ? 'http://localhost:5001' 
             : 'https://yb-studio-backend.onrender.com',
    
    // On localhost, we use /admin/ prefix. On Vercel, we usually don't.
    redirectBase: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                  ? '/admin' 
                  : ''
};

const getApiUrl = (path) => `${API_CONFIG.baseUrl}${path}`;
const getRedirectUrl = (path) => `${API_CONFIG.redirectBase}${path}`;
