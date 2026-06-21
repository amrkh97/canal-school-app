import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During local development the React dev server runs on :5173 and the
// backend on :4000. These proxies let the frontend call "/api" and
// "/uploads" without worrying about CORS or ports.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000',
      '/uploads': 'http://localhost:4000',
    },
  },
});
