/**
 * Imagens por produto — OFF (embalados) + LoremFlickr (frescos, lock por ID).
 * npm run images:fetch
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/images/products')
const catDir = path.join(__dirname, '../public/images/categories')

/**
 * fresh: true → só LoremFlickr (foto real do alimento)
 * off + keywords: Open Food Facts com validação
 * lf: tags fixas por produto
 */
const PRODUCTS = {
  '1': { off: 'leite uht', keywords: ['leite', 'milk', 'uht'], lf: 'milk,carton,uht' },
  '2': { off: 'arroz', keywords: ['arroz', 'rice'], lf: 'rice,bag,white' },
  '3': { off: 'azeite oliva virgem', keywords: ['azeite', 'olive', 'oil'], lf: 'olive,oil,bottle' },
  '4': { off: 'pao de forma integral', keywords: ['pão', 'pao', 'bread', 'forma'], lf: 'bread,loaf,sliced' },
  '5': { fresh: true, lf: 'strawberry,fruit,fresh' },
  '6': { fresh: true, lf: 'avocado,fruit,fresh' },
  '7': { fresh: true, lf: 'whole,chicken,raw' },
  '8': { off: 'iogurte natural', keywords: ['iogurte', 'yogurt', 'yoghurt'], lf: 'yogurt,cup' },
  '9': { off: 'queijo flamengo', keywords: ['queijo', 'cheese'], lf: 'cheese,slices' },
  '10': { off: 'esparguete massa', keywords: ['esparguete', 'spaghetti', 'pasta'], lf: 'spaghetti,pasta,dry' },
  '11': { off: 'cafe moido', keywords: ['café', 'cafe', 'coffee'], lf: 'coffee,ground,package' },
  '12': { off: 'cerveja', keywords: ['cerveja', 'beer'], lf: 'beer,bottles,pack' },
  '13': { off: 'vinho tinto', keywords: ['vinho', 'wine', 'tinto'], lf: 'red,wine,bottle' },
  '14': { off: 'champo shampoo', keywords: ['shampoo', 'champô', 'champu'], lf: 'shampoo,bottle' },
  '15': { off: 'pasta dentes', keywords: ['pasta', 'dentes', 'toothpaste'], lf: 'toothpaste,tube' },
  '16': { off: 'papel higienico', keywords: ['papel', 'higiénico', 'higienico', 'toilet'], lf: 'toilet,paper,rolls' },
  '17': { off: 'bolachas chocolate', keywords: ['bolacha', 'cookie', 'biscuit'], lf: 'chocolate,cookies' },
  '18': { off: 'sumo laranja', keywords: ['sumo', 'laranja', 'orange', 'juice'], lf: 'orange,juice,bottle' },
  '19': { off: 'detergente roupa', keywords: ['detergente', 'laundry', 'roupa'], lf: 'laundry,detergent' },
  '20': { off: 'racao cao', keywords: ['cão', 'cao', 'dog', 'racao', 'ração'], lf: 'dog,food,bag' },
  '21': { fresh: true, lf: 'banana,fruit,bunch' },
  '22': { fresh: true, lf: 'cherry,tomato,fresh' },
  '23': { fresh: true, lf: 'red,apple,fruit' },
  '24': { off: 'agua mineral', keywords: ['água', 'agua', 'water', 'mineral'], lf: 'water,bottles' },
  '25': { fresh: true, lf: 'beef,steak,raw' },
  '26': { fresh: true, lf: 'salmon,fillet,fresh' },
  '27': { off: 'atum lata', keywords: ['atum', 'tuna', 'lata'], lf: 'tuna,can,canned' },
  '28': { off: 'cereais integrais', keywords: ['cereal', 'cereais', 'flakes'], lf: 'cereal,box,breakfast' },
  '29': { off: 'leite po', keywords: ['leite', 'pó', 'po', 'powder', 'milk'], lf: 'milk,powder' },
  '30': { fresh: true, lf: 'croissant,butter,pastry' },
  '31': { off: 'coca cola', keywords: ['cola', 'coca', 'refrigerante'], lf: 'cola,soda,bottle' },
  '32': { off: 'cerveja garrafa', keywords: ['cerveja', 'beer'], lf: 'beer,bottle' },
  '33': { off: 'manteiga', keywords: ['manteiga', 'butter'], lf: 'butter,block' },
  '34': { off: 'detergente multiusos', keywords: ['detergente', 'spray', 'cleaner'], lf: 'cleaner,spray' },
  '35': { off: 'racao gato', keywords: ['gato', 'cat', 'racao', 'ração'], lf: 'cat,food,bag' },
  '36': { off: 'fraldas bebe', keywords: ['fralda', 'diaper', 'bebé', 'bebe'], lf: 'diapers,baby' },
  '37': { lf: 'grater,kitchen,stainless' },
  '38': { off: 'creme facial', keywords: ['creme', 'facial', 'face'], lf: 'face,cream,jar' },
  '39': { off: 'cha verde', keywords: ['chá', 'cha', 'tea', 'verde'], lf: 'green,tea,box' },
  '40': { off: 'snacks cao', keywords: ['cão', 'cao', 'dog', 'snack'], lf: 'dog,treats' },
  '41': { lf: 'microwave,oven,white' },
  '42': { lf: 'refrigerator,fridge,silver' },
  '43': { lf: 'washing,machine,white' },
  '44': { lf: 'blender,kitchen' },
  '45': { lf: 'steam,iron' },
  '46': { lf: 'electric,kettle' },
  '47': { lf: 'desk,fan' },
  '48': { lf: 'vacuum,cleaner' },
}

const CATEGORIES = {
  frutas: { lf: 'fresh,fruit,market' },
  padaria: { lf: 'bakery,bread,loaf' },
  vinhos: { lf: 'wine,bottle,red' },
  peixaria: { lf: 'fresh,fish,seafood' },
  carnes: { lf: 'raw,meat,butcher' },
  bebidas: { lf: 'beverages,drinks' },
  higiene: { lf: 'shampoo,toiletries' },
  mercearia: { lf: 'grocery,shelves' },
  electrodomesticos: { lf: 'kitchen,appliances' },
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = 'Bassula/1.0 (image-fetch; authorized)'

function resolveUrl(base, loc) {
  if (!loc) return null
  if (loc.startsWith('http')) return loc
  const u = new URL(base)
  return `${u.protocol}//${u.host}${loc.startsWith('/') ? loc : `/${loc}`}`
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    const req = client.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        const next = resolveUrl(url, res.headers.location)
        if (!next) return reject(new Error('redirect inválido'))
        return download(next, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => file.close(() => resolve(dest)))
      file.on('error', reject)
    })
    req.on('error', reject)
  })
}

function loremFlickr(tag, lock) {
  return `https://loremflickr.com/800/800/${tag}?lock=bassula-v5-${lock}`
}

function matchesKeywords(name, keywords, min = 1) {
  const n = (name || '').toLowerCase()
  const hits = keywords.filter((k) => n.includes(k.toLowerCase())).length
  return hits >= min
}

async function offImageUrl(search, keywords) {
  const api = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(search)}&search_simple=1&action=process&json=1&page_size=25&lc=pt`
  const res = await fetch(api, { headers: { 'User-Agent': UA } })
  if (!res.ok) return null
  const json = await res.json()
  const list = json.products || []
  const minHits = keywords.length >= 3 ? 2 : 1

  for (const p of list) {
    const name = [p.product_name_pt, p.product_name, p.product_name_en, p.generic_name]
      .filter(Boolean)
      .join(' ')
    if (keywords.length && !matchesKeywords(name, keywords, minHits)) continue
    const url = p.image_front_url || p.image_url
    if (url?.startsWith('http') && !url.includes('undefined')) return url
  }
  return null
}

async function getUrl(id, meta) {
  if (meta.fresh && meta.lf) {
    return loremFlickr(meta.lf, id)
  }

  if (meta.off) {
    const off = await offImageUrl(meta.off, meta.keywords || [])
    if (off) return off
  }

  if (meta.lf) {
    return loremFlickr(meta.lf, id)
  }

  return loremFlickr('grocery,product', id)
}

async function saveProduct(id, meta) {
  const dest = path.join(outDir, `${id}.jpg`)
  const url = await getUrl(id, meta)
  await download(url, dest)
  const stat = fs.statSync(dest)
  if (stat.size < 800) throw new Error('imagem demasiado pequena')
  return url
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  fs.mkdirSync(catDir, { recursive: true })

  let ok = 0
  let fail = 0
  const manifest = []

  for (const [id, meta] of Object.entries(PRODUCTS)) {
    try {
      const src = await saveProduct(id, meta)
      manifest.push({ id, fresh: !!meta.fresh, src: src.slice(0, 120) })
      console.log(`OK produto ${id}`)
      ok++
    } catch (e) {
      console.error(`FAIL produto ${id}:`, e.message)
      fail++
    }
    await sleep(700)
  }

  for (const [slug, meta] of Object.entries(CATEGORIES)) {
    const dest = path.join(catDir, `${slug}.jpg`)
    try {
      await download(loremFlickr(meta.lf, `cat-${slug}`), dest)
      console.log(`OK categoria ${slug}`)
      ok++
    } catch (e) {
      console.error(`FAIL categoria ${slug}:`, e.message)
      fail++
    }
    await sleep(500)
  }

  try {
    await download(loremFlickr('supermarket,grocery,africa', 'hero'), path.join(__dirname, '../public/images/hero.jpg'))
    console.log('OK hero')
    ok++
  } catch (e) {
    console.error('FAIL hero:', e.message)
    fail++
  }

  fs.writeFileSync(
    path.join(__dirname, '../public/images/manifest.json'),
    JSON.stringify({ generated: new Date().toISOString(), source: 'off+fresh-lf', products: manifest }, null, 2),
  )

  console.log(`\n${ok} OK, ${fail} falhas`)
  process.exit(fail > 10 ? 1 : 0)
}

main()
