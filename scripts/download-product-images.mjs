/**
 * Descarga imagens para todos os produtos Bassula.
 * Fontes: Open Food Facts (embalados) → LoremFlickr (tags fixas por ID).
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
const promoDir = path.join(__dirname, '../public/promo')
const LOCK_VER = 'v8'

const PRODUCTS = {
  '1': { off: 'leite uht meio gordo', keywords: ['leite', 'milk', 'uht'], lf: 'milk,carton,uht,white' },
  '2': { off: 'arroz agulha', keywords: ['arroz', 'rice'], lf: 'rice,bag,white,grain' },
  '3': { off: 'azeite virgem extra', keywords: ['azeite', 'olive', 'oil'], lf: 'olive,oil,bottle,green' },
  '4': { off: 'pao forma integral', keywords: ['pão', 'pao', 'bread', 'forma'], lf: 'bread,loaf,sliced' },
  '5': { fresh: true, lf: 'strawberry,fruit,fresh,red' },
  '6': { fresh: true, lf: 'avocado,fruit,fresh,green' },
  '7': { fresh: true, lf: 'whole,chicken,raw,poultry' },
  '8': { off: 'iogurte natural', keywords: ['iogurte', 'yogurt'], lf: 'yogurt,cup,white' },
  '9': { off: 'queijo flamengo fatias', keywords: ['queijo', 'cheese', 'flamengo'], lf: 'cheese,slices,yellow' },
  '10': { off: 'esparguete massa', keywords: ['esparguete', 'spaghetti', 'pasta'], lf: 'spaghetti,pasta,dry' },
  '11': { off: 'cafe torrado moido', keywords: ['café', 'cafe', 'coffee'], lf: 'coffee,ground,package' },
  '12': { off: 'cerveja lata pack', keywords: ['cerveja', 'beer', 'lata'], lf: 'beer,cans,pack' },
  '13': { off: 'vinho tinto garrafa', keywords: ['vinho', 'wine', 'tinto'], lf: 'red,wine,bottle' },
  '14': { off: 'shampoo', keywords: ['shampoo', 'champô', 'champu'], lf: 'shampoo,bottle' },
  '15': { off: 'pasta dentes', keywords: ['pasta', 'dentes', 'toothpaste'], lf: 'toothpaste,tube' },
  '16': { off: 'papel higienico', keywords: ['papel', 'higiénico', 'toilet', 'roll'], lf: 'toilet,paper,rolls' },
  '17': { off: 'bolachas chocolate', keywords: ['bolacha', 'cookie', 'chocolate'], lf: 'chocolate,cookies' },
  '18': { off: 'sumo laranja', keywords: ['sumo', 'laranja', 'orange', 'juice'], lf: 'orange,juice,bottle' },
  '19': { off: 'detergente roupa liquido', keywords: ['detergente', 'laundry', 'roupa'], lf: 'laundry,detergent,bottle' },
  '20': { off: 'racao cao adulto', keywords: ['cão', 'cao', 'dog', 'racao'], lf: 'dog,food,bag,kibble' },
  '21': { fresh: true, lf: 'banana,fruit,bunch,yellow' },
  '22': { fresh: true, lf: 'cherry,tomato,fresh,red' },
  '23': { fresh: true, lf: 'red,apple,fruit,fresh' },
  '24': { off: 'agua mineral garrafa', keywords: ['água', 'agua', 'water', 'mineral'], lf: 'water,bottles,pack' },
  '25': { fresh: true, lf: 'beef,steak,raw,meat' },
  '26': { fresh: true, lf: 'salmon,fillet,fresh,fish' },
  '27': { off: 'atum lata', keywords: ['atum', 'tuna', 'lata'], lf: 'tuna,can,canned' },
  '28': { off: 'cereais pequeno almoco', keywords: ['cereal', 'cereais', 'flakes'], lf: 'cereal,box,breakfast' },
  '29': { off: 'leite po', keywords: ['leite', 'pó', 'po', 'powder', 'milk'], lf: 'milk,powder,can' },
  '30': { fresh: true, lf: 'croissant,butter,pastry,bakery' },
  '31': { off: 'coca cola', keywords: ['cola', 'coca', 'refrigerante'], lf: 'cola,soda,bottle' },
  '32': { off: 'cerveja garrafa', keywords: ['cerveja', 'beer', 'garrafa'], lf: 'beer,bottle,glass' },
  '33': { off: 'manteiga com sal', keywords: ['manteiga', 'butter'], lf: 'butter,block,yellow' },
  '34': { off: 'detergente multiusos spray', keywords: ['detergente', 'spray', 'multiusos'], lf: 'cleaner,spray,bottle' },
  '35': { off: 'racao gato', keywords: ['gato', 'cat', 'racao'], lf: 'cat,food,bag' },
  '36': { off: 'fraldas bebe', keywords: ['fralda', 'diaper', 'bebé', 'bebe'], lf: 'diapers,baby,pack' },
  '37': { lf: 'cheese,grater,kitchen,stainless' },
  '38': { off: 'creme facial hidratante', keywords: ['creme', 'facial', 'face'], lf: 'face,cream,jar' },
  '39': { off: 'cha verde', keywords: ['chá', 'cha', 'tea', 'verde'], lf: 'green,tea,box' },
  '40': { off: 'snacks cao', keywords: ['cão', 'cao', 'dog', 'snack'], lf: 'dog,treats,biscuit' },
  '41': { lf: 'microwave,oven,kitchen,white' },
  '42': { lf: 'refrigerator,fridge,silver,kitchen' },
  '43': { lf: 'washing,machine,white,appliance' },
  '44': { lf: 'blender,kitchen,appliance' },
  '45': { lf: 'steam,iron,appliance' },
  '46': { lf: 'electric,kettle,kitchen' },
  '47': { lf: 'desk,fan,appliance' },
  '48': { lf: 'vacuum,cleaner,home' },
}

const CATEGORIES = {
  frutas: 'fresh,fruit,market,colorful',
  padaria: 'bakery,bread,loaf,fresh',
  vinhos: 'wine,bottle,red,cheese,board',
  peixaria: 'fresh,fish,salmon,seafood',
  carnes: 'raw,meat,butcher,beef',
  bebidas: 'beverages,drinks,supermarket',
  higiene: 'shampoo,toiletries,shelf',
  mercearia: 'grocery,shelves,supermarket',
  electrodomesticos: 'kitchen,appliances,modern',
  verdura: 'vegetables,greens,fresh,market',
  brinquedos: 'toys,children,colorful,store',
  sanitarios: 'cleaning,toilet,paper,shelf',
}

const PROMOS = {
  'promo-frutas': 'fresh,fruit,market,colorful',
  'promo-padaria': 'bakery,bread,loaf,fresh',
  'promo-electro': 'kitchen,appliances,modern',
  'promo-wine': 'wine,bottle,red,cheese,plate',
  'promo-discount': 'cheese,slices,cheddar,plate,dairy',
  'promo-higiene': 'shampoo,toiletries,cleaning,shelf',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = 'BassulaImageBot/1.0 (https://bassula.vercel.app; product-images)'

function resolveUrl(base, loc) {
  if (!loc) return null
  if (loc.startsWith('http')) return loc
  const u = new URL(base)
  return `${u.protocol}//${u.host}${loc.startsWith('/') ? loc : `/${loc}`}`
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    const req = client.get(url, { headers: { 'User-Agent': UA }, timeout: 45000 }, (res) => {
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
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('timeout'))
    })
  })
}

function loremFlickr(tag, lock) {
  return `https://loremflickr.com/800/800/${tag}?lock=bassula-${LOCK_VER}-${lock}`
}

function matchesKeywords(name, keywords, min = 1) {
  const n = (name || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
  const hits = keywords.filter((k) => {
    const kw = k.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
    return n.includes(kw)
  }).length
  return hits >= min
}

async function offImageUrl(search, keywords) {
  const queries = [search, search.replace(/ã/g, 'a').replace(/ç/g, 'c')]
  for (const q of queries) {
    const api = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=30&lc=pt`
    const res = await fetch(api, { headers: { 'User-Agent': UA } })
    if (!res.ok) continue
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
  }
  return null
}

async function getUrl(id, meta) {
  if (!meta.fresh && meta.off) {
    try {
      const off = await offImageUrl(meta.off, meta.keywords || [])
      if (off) return off
    } catch {
      /* fallback lf */
    }
  }
  if (meta.lf) return loremFlickr(meta.lf, `prod-${id}`)
  return loremFlickr('grocery,supermarket', `prod-${id}`)
}

async function saveProduct(id, meta, attempt = 0) {
  const dest = path.join(outDir, `${id}.jpg`)
  try {
    const url = await getUrl(id, meta)
    await download(url, dest)
    const stat = fs.statSync(dest)
    if (stat.size < 1500) throw new Error('imagem demasiado pequena')
    return url
  } catch (e) {
    if (attempt < 2) {
      await sleep(400)
      const url = loremFlickr(meta.lf || 'grocery,product', `prod-${id}-r${attempt + 1}`)
      await download(url, dest)
      const stat = fs.statSync(dest)
      if (stat.size < 1500) throw new Error('retry small')
      return url
    }
    throw e
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  fs.mkdirSync(catDir, { recursive: true })
  fs.mkdirSync(promoDir, { recursive: true })

  let ok = 0
  let fail = 0
  const manifest = []

  console.log('A descarregar 48 produtos + categorias + promos...\n')

  for (const [id, meta] of Object.entries(PRODUCTS)) {
    try {
      const src = await saveProduct(id, meta)
      manifest.push({ id, fresh: !!meta.fresh, source: src.includes('openfoodfacts') ? 'off' : 'lf', src: src.slice(0, 100) })
      console.log(`OK produto ${id} (${manifest.at(-1).source})`)
      ok++
    } catch (e) {
      console.error(`FAIL produto ${id}:`, e.message)
      fail++
    }
    await sleep(600)
  }

  for (const [slug, tags] of Object.entries(CATEGORIES)) {
    const dest = path.join(catDir, `${slug}.jpg`)
    try {
      await download(loremFlickr(tags, `cat-${slug}`), dest)
      console.log(`OK categoria ${slug}`)
      ok++
    } catch (e) {
      console.error(`FAIL categoria ${slug}:`, e.message)
      fail++
    }
    await sleep(400)
  }

  for (const [name, tags] of Object.entries(PROMOS)) {
    const dest = path.join(promoDir, `${name}.jpg`)
    try {
      await download(loremFlickr(tags, `promo-${name}`), dest)
      console.log(`OK promo ${name}`)
      ok++
    } catch (e) {
      console.error(`FAIL promo ${name}:`, e.message)
      fail++
    }
    await sleep(400)
  }

  try {
    await download(loremFlickr('supermarket,grocery,africa,luanda', 'hero'), path.join(__dirname, '../public/images/hero.jpg'))
    console.log('OK hero')
    ok++
  } catch (e) {
    console.error('FAIL hero:', e.message)
    fail++
  }

  fs.writeFileSync(
    path.join(__dirname, '../public/images/manifest.json'),
    JSON.stringify(
      {
        generated: new Date().toISOString(),
        lockVersion: LOCK_VER,
        source: 'openfoodfacts+loremflickr',
        products: manifest,
      },
      null,
      2,
    ),
  )

  console.log(`\nConcluído: ${ok} OK, ${fail} falhas`)
  process.exit(fail > 5 ? 1 : 0)
}

main()
