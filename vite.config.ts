import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this is set to root for custom domain
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
