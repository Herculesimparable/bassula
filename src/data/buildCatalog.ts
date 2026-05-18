import type { NavGroup, Product, StorePrice } from '../types'
import { productImage } from './images'
import { CATALOG_SPECS } from './catalogSpecs'

const STORES = [
  { storeId: 'kero', storeName: 'Kero', factor: 1 },
  { storeId: 'candando', storeName: 'Candando', factor: 1.04 },
  { storeId: 'shoprite', storeName: 'Shoprite', factor: 0.97 },
  { storeId: 'alimenta', storeName: 'Alimenta Angola', factor: 1.02 },
] as const

const TARGET_PER_CATEGORY = 20

function makePrices(base: number, index: number): StorePrice[] {
  const promoIndex = index % STORES.length
  return STORES.map((s, i) => {
    const price = Math.round(base * s.factor * (1 + (i % 3) * 0.03))
    const promo =
      i === promoIndex ? Math.round(price * (0.78 + (index % 5) * 0.02)) : undefined
    return {
      storeId: s.storeId,
      storeName: s.storeName,
      price,
      promo: promo && promo < price ? promo : undefined,
    }
  })
}

function imageForId(id: string, category: string): string {
  const n = Number.parseInt(id, 10)
  const pool = Number.isFinite(n) && n > 0 ? ((n - 1) % 48) + 1 : 1
  return productImage(String(pool), category)
}

function makeProduct(
  id: string,
  name: string,
  category: string,
  unit: string,
  section: Product['section'],
  groups: NavGroup[],
  basePrice: number,
  index: number,
): Product {
  return {
    id,
    name,
    category,
    image: imageForId(id, category),
    unit,
    section,
    groups: [...new Set<NavGroup>([...groups, 'ofertas'])],
    prices: makePrices(basePrice + index * Math.round(basePrice * 0.08), index),
    badge: 'Oferta',
  }
}

function nextNumericId(products: Product[]): number {
  let max = 0
  for (const p of products) {
    const n = Number.parseInt(p.id, 10)
    if (Number.isFinite(n) && n > max) max = n
  }
  return max + 1
}

/**
 * Garante 20 produtos por categoria de filtro, com promo (desconto) e várias lojas (comparação).
 */
export function buildFullCatalog(baseProducts: Product[]): Product[] {
  const result: Product[] = [...baseProducts]
  let nextId = nextNumericId(result)

  for (const spec of CATALOG_SPECS) {
    const inCategory = result.filter((p) => p.category === spec.category)
    const usedNames = new Set(inCategory.map((p) => p.name))
    let added = 0

    for (const [name, unit] of spec.items) {
      if (inCategory.length + added >= TARGET_PER_CATEGORY) break
      if (usedNames.has(name)) continue

      const id = String(nextId++)
      result.push(
        makeProduct(
          id,
          name,
          spec.category,
          unit,
          spec.section,
          spec.groups,
          spec.basePrice,
          added,
        ),
      )
      usedNames.add(name)
      added++
    }

    let extra = 1
    while (inCategory.length + added < TARGET_PER_CATEGORY) {
      const name = `${spec.category} — Seleção ${extra}`
      if (usedNames.has(name)) {
        extra++
        continue
      }
      const id = String(nextId++)
      result.push(
        makeProduct(
          id,
          name,
          spec.category,
          '1 un',
          spec.section,
          spec.groups,
          spec.basePrice,
          added + extra,
        ),
      )
      usedNames.add(name)
      added++
      extra++
    }
  }

  return result
}

export function countByCategory(products: Product[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const p of products) {
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }
  return counts
}
