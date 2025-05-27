import axios from 'axios';
import Cookies from 'js-cookie';

const axiosCsrf = axios.create({
  baseURL: import.meta.env.VITE_API_URL.replace('/api', ''),
  withCredentials: true,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

let csrfFetched = false;

api.interceptors.request.use(async (config) => {
  if (!csrfFetched && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method.toUpperCase())) {
    try {
      await axiosCsrf.get('/sanctum/csrf-cookie');
      csrfFetched = true;
    } catch (error) {
      console.error("Failed to get CSRF token:", error);
      return Promise.reject(error);
    }
  }
  
  const xsrfToken = Cookies.get('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken;
  }

  return config;
});

export default api;
