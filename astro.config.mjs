import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// Build und Dev-Server nutzen getrennte Vite-Caches. Sonst überschreibt
// `astro build` die vorgebündelten Abhängigkeiten eines laufenden Dev-Servers.
const isBuild = process.argv.includes('build')

export default defineConfig({
  site: 'https://erniez28.de',
  output: 'static',
  integrations: [react()],
  build: { format: 'directory' },
  vite: { cacheDir: isBuild ? 'node_modules/.vite-build' : 'node_modules/.vite' },
})
