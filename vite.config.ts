import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubPages = process.env.VITE_GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGitHubPages ? '/bassula/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: true,
  },
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
})
