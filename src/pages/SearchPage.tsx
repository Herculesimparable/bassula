import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CatalogSidebar } from '../components/CatalogSidebar'
import { ProductGridCard } from '../components/ProductGridCard'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'
import { buildCatalogSearchParams, parseCatalogSearchParams } from '../utils/catalogUrl'
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
  }, [searchQuery, activeCategories, priceMax])

  const syncFiltersToUrl = (overrides?: {
    q?: string
    categories?: string[]
    priceMax?: number | null
  }) => {
    const next = buildCatalogSearchParams({
      q: overrides?.q ?? searchQuery,
      categories: overrides?.categories ?? activeCategories,
      priceMax: overrides?.priceMax !== undefined ? overrides.priceMax : priceMax,
    })
    setSearchParams(next, { replace: true })
  }

  const handleToggleCategory = (cat: string) => {
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
    () => filterProducts(products, searchQuery, activeCategories, priceMax),
    [searchQuery, activeCategories, priceMax],
  )

  const shown = filtered.slice(0, visible)
  const q = searchQuery.trim()

  return (
    <div className="catalog-page catalog-page--search">
      <div className="container">
        <h1 className="page-title">
          {q ? t('search.title', { query: q }) : t('search.allProducts')}
        </h1>
        {q && <p className="page-subtitle">{t('search.subtitle')}</p>}

        <button
          type="button"
          className="filter-mobile-btn"
          onClick={() => setFilterDrawerOpen(true)}
        >
          {t('catalog.filter')} ({filtered.length})
        </button>

        <div className="catalog-layout">
          <CatalogSidebar
            activeCategories={activeCategories}
            priceMax={priceMax}
            onToggleCategory={handleToggleCategory}
            onPriceChange={handlePriceChange}
            onClearAll={clearAllFilters}
          />
          <div className="catalog-main">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <p>{t('catalog.noProducts')}</p>
                <p>{t('search.tryOther')}</p>
              </div>
            ) : (
              <>
                <p className="catalog-results-count">
                  {t('catalog.productsFound', { count: filtered.length })}
                </p>
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
