import axios from 'axios';

axios.defaults.withCredentials = true; // Ceci est essentiel pour envoyer les cookies

const csrfClient = axios.create({
  baseURL: 'https://todobackend-production-1553.up.railway.app',
  withCredentials: true, // Pour récupérer le CSRF-cookie
});

const api = axios.create({
  baseURL: 'https://todobackend-production-1553.up.railway.app/api',
  withCredentials: true, // Pour envoyer le cookie de session et le XSRF-TOKEN
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

let csrfReady = false;

api.interceptors.request.use(async (config) => {
  if (!csrfReady) {
    // Appelle le endpoint sanctum/csrf-cookie pour définir le cookie XSRF-TOKEN
    await csrfClient.get('/sanctum/csrf-cookie');
    csrfReady = true;
  }
  // Axios et Sanctum gèrent l'envoi du X-XSRF-TOKEN header automatiquement
  // à partir du cookie XSRF-TOKEN existant. Ne pas le manipuler manuellement.
  return config;
});

export default api;