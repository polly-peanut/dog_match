import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Add security headers plugin
    {
      name: 'security-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Security headers with less restrictive CSP for development
          res.setHeader('Content-Security-Policy', 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: blob: https:; " +
            "font-src 'self' data:; " +
            "connect-src 'self' ws: wss:;"
          );
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('X-Frame-Options', 'DENY');
          res.setHeader('X-XSS-Protection', '1; mode=block');
          
          next();
        });
      }
    }
  ],
  server: {
    host: 'localhost',
    port: 5174,
    strictPort: true,
    origin: 'http://localhost:5174',
    cors: {
      origin: 'http://localhost:5174'
    }
  }
})