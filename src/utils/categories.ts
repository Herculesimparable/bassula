import { products } from '../data/products'
import type { NavGroup } from '../types'

function sortPt(categories: Iterable<string>): string[] {
  return [...categories].sort((a, b) => a.localeCompare(b, 'pt'))
}

/** Todas as categorias de produto (fonte única para filtros e sidebar). */
export function getAllProductCategories(): string[] {
  const set = new Set<string>()
  for (const p of products) set.add(p.category)
  return sortPt(set)
}

export function getCategoriesForGroup(group: NavGroup): string[] {
  const set = new Set<string>()
  for (const p of products) {
    if (p.groups.includes(group)) set.add(p.category)
  }
  return sortPt(set)
}

export function categoryFilterHref(sectionPath: string, category: string): string {
  return `${sectionPath}?cat=${encodeURIComponent(category)}`
}

/** Destino ao clicar numa categoria da home — secção + filtro exacto em products.ts */
export interface HomeCategoryTarget {
  path: string
  category: string
  search?: string
}

export const HOME_CATEGORY_TARGETS: Record<string, HomeCategoryTarget> = {
  frutas: { path: '/alimentos', category: 'Frutas' },
  padaria: { path: '/alimentos', category: 'Padaria' },
  vinhos: { path: '/bebidas', category: 'todos', search: 'vinho' },
  peixaria: { path: '/alimentos', category: 'Peixes e frutos do mar' },
  carnes: { path: '/alimentos', category: 'Carnes e aves' },
  bebidas: { path: '/bebidas', category: 'Bebidas' },
  higiene: { path: '/higiene', category: 'todos' },
  mercearia: { path: '/alimentos', category: 'Mercearia' },
  electrodomesticos: { path: '/electrodomesticos', category: 'todos' },
  verdura: { path: '/alimentos', category: 'Verduras' },
  brinquedos: { path: '/ofertas', category: 'todos', search: 'brinquedo' },
  sanitarios: { path: '/higiene', category: 'Limpeza e higiene' },
}

export function homeCategoryHref(slug: string): string {
  const target = HOME_CATEGORY_TARGETS[slug]
  if (!target) return '/ofertas'
  const params = new URLSearchParams()
  if (target.category !== 'todos') params.set('cat', target.category)
  if (target.search) params.set('q', target.search)
  const qs = params.toString()
  return qs ? `${target.path}?${qs}` : target.path
}

export function applyHomeCategoryTarget(
  slug: string,
  setActiveCategory: (c: string) => void,
  setSearchQuery: (q: string) => void,
): void {
  const target = HOME_CATEGORY_TARGETS[slug]
  if (!target) return
  setActiveCategory(target.category)
  setSearchQuery(target.search ?? '')
}
