/**
 * Verifica catálogo: categorias, contagem e imagens principais.
 * npm run verify
 */
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const specsPath = path.join(root, 'src/data/catalogSpecs.ts')
const text = readFileSync(specsPath, 'utf8')
const categories = [...text.matchAll(/category: '([^']+)'/g)].map((m) => m[1])

console.log('Categorias definidas:', categories.length)
if (categories.length !== 21) {
  console.error(`ERRO: esperadas 21 categorias (incl. Verduras), encontradas ${categories.length}`)
  process.exit(1)
}

const productsDir = path.join(root, 'public/images/products')
let missingImages = 0
for (let id = 1; id <= 48; id++) {
  const file = path.join(productsDir, `${id}.jpg`)
  if (!existsSync(file)) {
    console.warn(`AVISO: falta imagem ${id}.jpg`)
    missingImages++
  }
}

if (missingImages > 0) {
  console.warn(`AVISO: ${missingImages} imagens em falta (execute npm run images:fetch)`)
}

console.log('OK: estrutura de catálogo válida')
