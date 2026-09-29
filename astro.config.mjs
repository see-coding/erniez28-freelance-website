import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://erniez28.de',
  output: 'static',
  integrations: [react()],
  build: { format: 'directory' },
})
