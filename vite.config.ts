import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@helper': '/src/helper',
      '@models': '/src/models',
      '@api': '/src/api',
      '@auth': '/src/features/auth',
      '@posts': '/src/features/posts',
      '@users': '/src/features/users',
      '@settings': '/src/features/settings',
      '@dashboard': '/src/features/dashboard',
      '@contexts': '/src/contexts',
      '@guards': '/src/guards',
      '@layouts': '/src/layouts',
    },
  },
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false, // Disable SSL verification if using self-signed certificates
      },
    },
  },
})
