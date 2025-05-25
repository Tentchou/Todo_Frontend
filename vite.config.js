import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to your Laravel backend
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true, // needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '/api'), // ensure /api remains
      },
      // Proxy the CSRF cookie endpoint
      '/sanctum/csrf-cookie': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
       // If other endpoints (like /login, /register) are *not* under /api prefix in Laravel's API routes,
       // you might need to proxy them explicitly if you want them to pass through Vite.
       // However, often Laravel's API routes are prefixed with 'api'.
       // If your Laravel routes are defined like Route::post('/login', ...) then no proxy is needed for them.
       // Only if your Laravel routes are under a specific domain or you have custom proxy needs.
       // Given your `VITE_API_URL`, direct requests might be fine.
       // For direct requests like http://localhost:8000/login, no proxy is needed.
    }
  }
})