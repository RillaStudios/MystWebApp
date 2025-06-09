import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-helmet-async'],

          'vendor-mantine': [
            '@mantine/core',
            '@mantine/hooks',
            '@mantine/notifications',
            '@mantine/form',
            '@tabler/icons-react'
          ],
          'vendor-carousel': [
            'embla-carousel',
            'embla-carousel-react',
            'embla-carousel-autoplay',
            'embla-carousel-auto-scroll'
          ],
          'vendor-router': ['react-router-dom'],
          'vendor-stripe': ['@stripe/react-stripe-js', '@stripe/stripe-js']
        }
      }
    },
  }
})
