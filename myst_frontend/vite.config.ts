import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
  //           if (id.includes('@mantine')) return 'vendor-mantine'
  //           if (id.includes('@emotion')) return 'vendor-emotion'
  //           if (id.includes('zustand')) return 'vendor-state'
  //           if (id.includes('react-router')) return 'vendor-router'
  //           return 'vendor'
  //         }
  //       },
  //     },
  //   },
  // }
})
