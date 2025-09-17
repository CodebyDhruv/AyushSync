import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.26.95.153:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log(`Proxying: ${path} -> http://3.26.95.153:8080${path}`);
          return path;
        }
      }
    }
  }
})