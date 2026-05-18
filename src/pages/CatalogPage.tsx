import { Flame, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { CatalogSidebar } from '../components/CatalogSidebar'
import { ProductGridCard } from '../components/ProductGridCard'
import { CatalogEmptyState } from '../components/CatalogEmptyState'
import { ProductGridSkeleton } from '../components/ProductGridSkeleton'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'
import { useProducts } from '../hooks/useProducts'
import { buildCatalogSearchParams, parseCatalogSearchParams } from '../utils/catalogUrl'
import { getEffectiveCatalogFilters } from '../utils/effectiveCatalogFilters'
import { filterProducts } from '../utils/price'
import { useTranslation } from '../context/LocaleContext'
import type { NavGroup } from '../types'

const GROUP_TITLE_KEYS: Record<NavGroup, string> = {
  ofertas: 'nav.ofertas',
  alimentos: 'nav.alimentos',
  bebidas: 'nav.bebidas',
  higiene: 'nav.higiene',
  pets: 'nav.pets',
  electrodomesticos: 'nav.electrodomesticos',
  vendidos: 'nav.maisVendidos',
  novos: 'nav.novos',
}

interface Props {
  group: NavGroup
  title?: string
  defaultBadge?: string
}

const PAGE_SIZE = 12
const CATEGORY_PAGE_SIZE = 20

export function CatalogPage({ group, title, defaultBadge }: Props) {
  const { t } = useTranslation()
  const pageTitle = title ?? t(GROUP_TITLE_KEYS[group])
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    searchQuery,
    activeCategories,
    setActiveCategories,
    setSearchQuery,
    priceMax,
    setPriceMax,
    clearCatalogFilters,
    setFilterDrawerOpen,
    filterDrawerOpen,
  } = useApp()

  const effective = useMemo(
    () => getEffectiveCatalogFilters(searchParams, searchQuery, activeCategories, priceMax),
    [searchParams, searchQuery, activeCategories, priceMax],
  )

  const pageSize = effective.hasCategoryFilter ? CATEGORY_PAGE_SIZE : PAGE_SIZE
  const [visible, setVisible] = useState(pageSize)

  const { data: groupProducts = [], isLoading: loadingGroup, isError } = useProducts(group)
  const isTopSellers = group === 'vendidos'

  const base = useMemo(() => {
    if (effective.hasQuery) return products
    return groupProducts
  }, [effective.hasQuery, groupProducts])

  const isLoading = loadingGroup && !effective.hasQuery

  useEffect(() => {
    const parsed = parseCatalogSearchParams(searchParams)
    if (parsed.reset) {
      setActiveCategories([])
      setSearchQuery('')
      setPriceMax(null)
      if (searchParams.has('reset')) setSearchParams({}, { replace: true })
      return
    }
    setActiveCategories(parsed.categories)
    setSearchQuery(parsed.q)
    setPriceMax(parsed.priceMax)
  }, [location.pathname, searchParams, setActiveCategories, setSearchQuery, setPriceMax, setSearchParams])

  const syncFiltersToUrl = useCallback(
    (overrides?: { q?: string; categories?: string[]; priceMax?: number | null }) => {
      const next = buildCatalogSearchParams({
        q: overrides?.q ?? effective.query,
        categories: overrides?.categories ?? effective.categories,
        priceMax: overrides?.priceMax !== undefined ? overrides.priceMax : effective.priceMax,
      })
      setSearchParams(next, { replace: true })
    },
    [effective.query, effective.categories, effective.priceMax, setSearchParams],
  )

  const handleToggleCategory = useCallback(
    (cat: string) => {
      if (cat === 'todos') {
        setActiveCategories([])
        syncFiltersToUrl({ categories: [] })
        return
      }
      const next = effective.categories.includes(cat)
        ? effective.categories.filter((c) => c !== cat)
        : [...effective.categories, cat]
      setActiveCategories(next)
      syncFiltersToUrl({ categories: next })
    },
    [effective.categories, setActiveCategories, syncFiltersToUrl],
  )

  const handlePriceChange = useCallback(
    (value: number | null) => {
      setPriceMax(value)
      syncFiltersToUrl({ priceMax: value })
    },
    [setPriceMax, syncFiltersToUrl],
  )

  const clearAllFilters = useCallback(() => {
    clearCatalogFilters()
    setSearchParams({}, { replace: true })
  }, [clearCatalogFilters, setSearchParams])

  useEffect(() => {
    setVisible(pageSize)
  }, [location.pathname, location.search, effective.query, effective.categories, effective.priceMax, pageSize])

  const filtered = useMemo(
    () =>
      filterProducts(base, effective.query, effective.categories, effective.priceMax),
    [base, effective.query, effective.categories, effective.priceMax],
  )

  const shown = filtered.slice(0, visible)

  const applyFiltersMobile = () => {
    syncFiltersToUrl()
    setFilterDrawerOpen(false)
  }

  return (
    <div className={`catalog-page ${isTopSellers ? 'catalog-page--top' : ''}`}>
      <div className="container">
        {isTopSellers ? (
          <header className="catalog-hero-top">
            <div className="catalog-hero-top__icon" aria-hidden>
              <Flame size={28} />
            </div>
            <div>
              <h1>{pageTitle}</h1>
              <p>{t('catalog.topHero')}</p>
            </div>
          </header>
        ) : (
          <h1 className="page-title">{pageTitle}</h1>
        )}

        {effective.query && (
          <p className="catalog-filter-hint">
            {t('catalog.searching')}: <strong>{effective.query}</strong>
          </p>
        )}

        {effective.categories.length > 0 && (
          <div className="catalog-active-filters">
            {effective.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="filter-chip"
                onClick={() => handleToggleCategory(cat)}
                aria-label={t('catalog.removeFilter', { name: cat })}
              >
                {cat}
                <X size={14} aria-hidden />
              </button>
            ))}
          </div>
        )}

        {effective.hasAnyFilter && (
          <p className="catalog-filter-hint">
            {t('catalog.productsFound', { count: filtered.length })}
            <button type="button" className="link-reset" onClick={clearAllFilters}>
              {t('catalog.clearAll')}
            </button>
          </p>
        )}

        <button
          type="button"
          className="filter-mobile-btn"
          onClick={() => setFilterDrawerOpen(true)}
        >
          {t('catalog.filter')} ({filtered.length})
        </button>

        <div className="catalog-layout">
          <CatalogSidebar
            group={group}
            activeCategories={effective.categories}
            priceMax={effective.priceMax}
            onToggleCategory={handleToggleCategory}
            onPriceChange={handlePriceChange}
            onClearAll={clearAllFilters}
          />
          <div className="catalog-main">
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : isError ? (
              <div className="empty-state">
                <p>{t('catalog.loadError')}</p>
                <p>{t('catalog.reload')}</p>
              </div>
            ) : filtered.length === 0 ? (
              <CatalogEmptyState />
            ) : (
              <>
                <div className="catalog-toolbar">
                  <span className="catalog-results-badge">
                    {t('catalog.productsFound', { count: filtered.length })}
                  </span>
                  <span className="catalog-sort-hint">{t('catalog.sortHint')}</span>
                </div>
                <div className="product-grid">
                  {shown.map((p, index) => (
                    <ProductGridCard
                      key={p.id}
                      product={p}
                      badgeLabel={defaultBadge ?? p.badge}
                      rank={isTopSellers ? index + 1 : undefined}
                      topSeller={isTopSellers}
                    />
                  ))}
                </div>
                {visible < filtered.length && (
                  <div className="section-footer">
                    <button
                      type="button"
                      className="btn btn-primary btn-ver-mais"
                      onClick={() => setVisible((v) => v + pageSize)}
                    >
                      {t('catalog.loadMore')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {filterDrawerOpen && (
        <>
          <div className="overlay" onClick={() => setFilterDrawerOpen(false)} />
          <aside className="filter-drawer">
            <CatalogSidebar
              group={group}
              activeCategories={effective.categories}
              priceMax={effective.priceMax}
              onToggleCategory={handleToggleCategory}
              onPriceChange={handlePriceChange}
              onClearAll={clearAllFilters}
            />
            <button
              type="button"
              className="btn btn-primary btn-full"
              style={{ marginTop: 20 }}
              onClick={applyFiltersMobile}
            >
              {t('catalog.applyFilters')}
            </button>
          </aside>
        </>
      )}
    </div>
  )
}
