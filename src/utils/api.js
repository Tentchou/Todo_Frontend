import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const csrfClient = axios.create({
  baseURL: 'https://todobackend-production-1553.up.railway.app',
  withCredentials: true,
});

const api = axios.create({
  baseURL: 'https://todobackend-production-1553.up.railway.app/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

let csrfReady = false;

api.interceptors.request.use(async (config) => {
  if (!csrfReady) {
    await csrfClient.get('/sanctum/csrf-cookie');
    csrfReady = true;
  }

  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }

  return config;
});

export default api;
