import { parseCatalogSearchParams } from './catalogUrl'

/** Lê filtros da URL com prioridade — evita estado obsoleto do contexto no 1º render. */
export function getEffectiveCatalogFilters(
  searchParams: URLSearchParams,
  searchQuery: string,
  _activeCategories: string[],
  priceMax: number | null,
) {
  const parsed = parseCatalogSearchParams(searchParams)

  const query = searchParams.has('q') ? parsed.q : searchQuery.trim() || parsed.q
  const categories = searchParams.has('cat') ? parsed.categories : []
  const effectivePriceMax = searchParams.has('price')
    ? parsed.priceMax
    : (priceMax ?? parsed.priceMax)

  return {
    query: query.trim(),
    categories,
    priceMax: effectivePriceMax,
    hasCategoryFilter: categories.length > 0,
    hasQuery: query.trim().length > 0,
    hasAnyFilter:
      categories.length > 0 || query.trim().length > 0 || effectivePriceMax != null,
  }
}
