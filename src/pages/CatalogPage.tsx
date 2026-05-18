import { Flame, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { CatalogSidebar } from '../components/CatalogSidebar'
import { ProductGridCard } from '../components/ProductGridCard'
import { PageLoader } from '../components/PageLoader'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'
import { useProducts } from '../hooks/useProducts'
import { buildCatalogSearchParams, parseCatalogSearchParams } from '../utils/catalogUrl'
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
  novos: 'nav.ofertas',
}

interface Props {
  group: NavGroup
  title?: string
  defaultBadge?: string
}

const PAGE_SIZE = 12

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
  const [visible, setVisible] = useState(PAGE_SIZE)
  const { data: groupProducts = [], isLoading: loadingGroup, isError } = useProducts(group)
  const isTopSellers = group === 'vendidos'
  const qFromUrl = searchParams.get('q')?.trim() ?? ''
  const isGlobalSearch = !!(qFromUrl || searchQuery.trim())

  const base = useMemo(() => {
    if (isGlobalSearch) return products
    return groupProducts
  }, [isGlobalSearch, groupProducts])

  const isLoading = loadingGroup && !isGlobalSearch

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
        q: overrides?.q ?? searchQuery,
        categories: overrides?.categories ?? activeCategories,
        priceMax: overrides?.priceMax !== undefined ? overrides.priceMax : priceMax,
      })
      setSearchParams(next, { replace: true })
    },
    [searchQuery, activeCategories, priceMax, setSearchParams],
  )

  const handleToggleCategory = useCallback(
    (cat: string) => {
      if (cat === 'todos') {
        setActiveCategories([])
        syncFiltersToUrl({ categories: [] })
        return
      }
      const next = activeCategories.includes(cat)
        ? activeCategories.filter((c) => c !== cat)
        : [...activeCategories, cat]
      setActiveCategories(next)
      syncFiltersToUrl({ categories: next })
    },
    [activeCategories, setActiveCategories, syncFiltersToUrl],
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
    setVisible(PAGE_SIZE)
  }, [location.pathname, location.search, searchQuery, activeCategories, priceMax])

  const filtered = useMemo(
    () => filterProducts(base, searchQuery, activeCategories, priceMax),
    [base, searchQuery, activeCategories, priceMax],
  )

  const shown = filtered.slice(0, visible)

  const hasActiveFilters =
    activeCategories.length > 0 || !!searchQuery.trim() || priceMax != null

  const applyFiltersMobile = () => {
    syncFiltersToUrl()
    setFilterDrawerOpen(false)
  }

  if (isLoading) return <PageLoader />

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

        {searchQuery.trim() && (
          <p className="catalog-filter-hint">
            {t('catalog.searching')}: <strong>{searchQuery}</strong>
          </p>
        )}

        {activeCategories.length > 0 && (
          <div className="catalog-active-filters">
            {activeCategories.map((cat) => (
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

        {hasActiveFilters && (
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
            activeCategories={activeCategories}
            priceMax={priceMax}
            onToggleCategory={handleToggleCategory}
            onPriceChange={handlePriceChange}
            onClearAll={clearAllFilters}
          />
          <div className="catalog-main">
            {isError ? (
              <div className="empty-state">
                <p>{t('catalog.loadError')}</p>
                <p>{t('catalog.reload')}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <p>{t('catalog.noProducts')}</p>
                <p>{t('catalog.tryOther')}</p>
              </div>
            ) : (
              <>
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
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
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
              activeCategories={activeCategories}
              priceMax={priceMax}
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
