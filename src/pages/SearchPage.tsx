import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CatalogSidebar } from '../components/CatalogSidebar'
import { ProductGridCard } from '../components/ProductGridCard'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'
import { buildCatalogSearchParams, parseCatalogSearchParams } from '../utils/catalogUrl'
import { getEffectiveCatalogFilters } from '../utils/effectiveCatalogFilters'
import { filterProducts } from '../utils/price'
import { useTranslation } from '../context/LocaleContext'

const PAGE_SIZE = 24

export function SearchPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    searchQuery,
    setSearchQuery,
    activeCategories,
    setActiveCategories,
    priceMax,
    setPriceMax,
    clearCatalogFilters,
    setFilterDrawerOpen,
    filterDrawerOpen,
  } = useApp()
  const [visible, setVisible] = useState(PAGE_SIZE)

  const effective = useMemo(
    () => getEffectiveCatalogFilters(searchParams, searchQuery, activeCategories, priceMax),
    [searchParams, searchQuery, activeCategories, priceMax],
  )

  useEffect(() => {
    const parsed = parseCatalogSearchParams(searchParams)
    if (parsed.reset) {
      clearCatalogFilters()
      if (searchParams.has('reset')) setSearchParams({}, { replace: true })
      return
    }
    setSearchQuery(parsed.q)
    setActiveCategories(parsed.categories)
    setPriceMax(parsed.priceMax)
  }, [searchParams, setSearchQuery, setActiveCategories, setPriceMax, clearCatalogFilters, setSearchParams])

  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [effective.query, effective.categories, effective.priceMax])

  const syncFiltersToUrl = (overrides?: {
    q?: string
    categories?: string[]
    priceMax?: number | null
  }) => {
    const next = buildCatalogSearchParams({
      q: overrides?.q ?? effective.query,
      categories: overrides?.categories ?? effective.categories,
      priceMax: overrides?.priceMax !== undefined ? overrides.priceMax : effective.priceMax,
    })
    setSearchParams(next, { replace: true })
  }

  const handleToggleCategory = (cat: string) => {
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
  }

  const handlePriceChange = (value: number | null) => {
    setPriceMax(value)
    syncFiltersToUrl({ priceMax: value })
  }

  const clearAllFilters = () => {
    clearCatalogFilters()
    setSearchParams({}, { replace: true })
  }

  const filtered = useMemo(
    () =>
      filterProducts(products, effective.query, effective.categories, effective.priceMax),
    [effective.query, effective.categories, effective.priceMax],
  )

  const shown = filtered.slice(0, visible)

  return (
    <div className="catalog-page catalog-page--search">
      <div className="container">
        <h1 className="page-title">
          {effective.query ? t('search.title', { query: effective.query }) : t('search.allProducts')}
        </h1>
        {effective.query && <p className="page-subtitle">{t('search.subtitle')}</p>}

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
            activeCategories={effective.categories}
            priceMax={effective.priceMax}
            onToggleCategory={handleToggleCategory}
            onPriceChange={handlePriceChange}
            onClearAll={clearAllFilters}
          />
          <div className="catalog-main">
            {filtered.length === 0 ? (
              <div className="empty-state empty-state--catalog">
                <p className="empty-state__title">{t('catalog.noProducts')}</p>
                <p>{t('search.tryOther')}</p>
                <button type="button" className="btn btn-primary empty-state__cta" onClick={clearAllFilters}>
                  {t('catalog.clearAll')}
                </button>
              </div>
            ) : (
              <>
                <div className="catalog-toolbar">
                  <span className="catalog-results-badge">
                    {t('catalog.productsFound', { count: filtered.length })}
                  </span>
                  <span className="catalog-sort-hint">{t('catalog.sortHint')}</span>
                </div>
                <div className="product-grid">
                  {shown.map((p) => (
                    <ProductGridCard key={p.id} product={p} />
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
              onClick={() => {
                syncFiltersToUrl()
                setFilterDrawerOpen(false)
              }}
            >
              {t('catalog.applyFilters')}
            </button>
          </aside>
        </>
      )}
    </div>
  )
}
