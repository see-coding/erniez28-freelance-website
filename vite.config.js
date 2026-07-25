import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative Basis, damit der Build in jedem Unterverzeichnis
// auf dem Webhosting-Server funktioniert.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: true,
  },
})
