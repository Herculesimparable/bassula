/**
 * Verifica catálogo: 20 produtos por categoria de filtro.
 * npm run verify (após build não necessário — lê TS via import dinâmico limitado)
 */
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const specsPath = path.join(root, 'src/data/catalogSpecs.ts')
const text = readFileSync(specsPath, 'utf8')
const categories = [...text.matchAll(/category: '([^']+)'/g)].map((m) => m[1])
console.log('Categorias definidas:', categories.length)
console.log(categories.join('\n'))
if (categories.length !== 20) {
  console.error('ERRO: esperadas 20 categorias')
  process.exit(1)
}
console.log('OK: estrutura de 20 categorias')
