import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/react-health/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
