import { sanitizeSearchQuery } from './sanitize'

export interface CatalogUrlState {
  q: string
  categories: string[]
  priceMax: number | null
  reset: boolean
}

export function parseCatalogSearchParams(params: URLSearchParams): CatalogUrlState {
  if (params.get('reset') === '1') {
    return { q: '', categories: [], priceMax: null, reset: true }
  }

  const q = sanitizeSearchQuery(params.get('q') ?? '')
  const rawCats = params.getAll('cat')
  const categories =
    rawCats.length > 0
      ? rawCats.flatMap((c) => c.split(',')).map((c) => c.trim()).filter(Boolean)
      : []

  const priceRaw = params.get('price')
  const priceMax = priceRaw ? Number(priceRaw) : null

  return {
    q,
    categories,
    priceMax: priceMax != null && !Number.isNaN(priceMax) ? priceMax : null,
    reset: false,
  }
}

export function buildCatalogSearchParams(state: {
  q?: string
  categories?: string[]
  priceMax?: number | null
}): URLSearchParams {
  const next = new URLSearchParams()
  const q = state.q?.trim()
  if (q) next.set('q', q)
  for (const cat of state.categories ?? []) {
    if (cat && cat !== 'todos') next.append('cat', cat)
  }
  if (state.priceMax != null) next.set('price', String(state.priceMax))
  return next
}
