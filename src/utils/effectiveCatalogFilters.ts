import { parseCatalogSearchParams } from './catalogUrl'

/** Lê filtros da URL + contexto — evita 1º render vazio antes do useEffect. */
export function getEffectiveCatalogFilters(
  searchParams: URLSearchParams,
  searchQuery: string,
  activeCategories: string[],
  priceMax: number | null,
) {
  const parsed = parseCatalogSearchParams(searchParams)
  const query = (searchQuery.trim() || parsed.q).trim()
  const categories =
    activeCategories.length > 0 ? activeCategories : parsed.categories
  const effectivePriceMax = priceMax ?? parsed.priceMax

  return {
    query,
    categories,
    priceMax: effectivePriceMax,
    hasCategoryFilter: categories.length > 0,
    hasQuery: query.length > 0,
    hasAnyFilter: categories.length > 0 || query.length > 0 || effectivePriceMax != null,
  }
}
