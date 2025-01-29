import axios from 'axios';

const VITE_API_URL = 'https://cadastro-backend-wxg2.onrender.com';

const api = axios.create({
   baseURL: VITE_API_URL
});

export default api;