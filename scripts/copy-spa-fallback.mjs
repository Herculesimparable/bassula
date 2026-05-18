import { copyFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const index = path.join(dist, 'index.html')
const fallback = path.join(dist, '404.html')

if (!existsSync(index)) {
  console.error('copy-spa-fallback: dist/index.html não encontrado — execute build primeiro')
  process.exit(1)
}

copyFileSync(index, fallback)
console.log('OK: dist/404.html (SPA fallback para GitHub Pages)')
