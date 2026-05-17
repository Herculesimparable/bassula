import { Flame } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { CatalogSidebar } from '../components/CatalogSidebar'
import { ProductGridCard } from '../components/ProductGridCard'
import { PageLoader } from '../components/PageLoader'
import { useApp } from '../context/AppContext'
import { useProducts } from '../hooks/useProducts'
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
  const [searchParams] = useSearchParams()
  const {
    searchQuery,
    activeCategory,
    setActiveCategory,
    setSearchQuery,
    priceMax,
    setFilterDrawerOpen,
    filterDrawerOpen,
  } = useApp()
  const [visible, setVisible] = useState(PAGE_SIZE)
  const { data: base = [], isLoading, isError } = useProducts(group)
  const isTopSellers = group === 'vendidos'

  useEffect(() => {
    const cat = searchParams.get('cat')
    const q = searchParams.get('q')
    setActiveCategory(cat ?? 'todos')
    setSearchQuery(q ?? '')
  }, [location.pathname, searchParams, setActiveCategory, setSearchQuery])

  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [location.pathname, location.search, searchQuery, activeCategory, priceMax])

  const filtered = useMemo(
    () => filterProducts(base, searchQuery, activeCategory, priceMax),
    [base, searchQuery, activeCategory, priceMax],
  )

  const shown = filtered.slice(0, visible)

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
        {activeCategory !== 'todos' && (
          <p className="catalog-filter-hint">
            {t('catalog.filtering')}: <strong>{activeCategory}</strong>
            <button type="button" className="link-reset" onClick={() => setActiveCategory('todos')}>
              {t('catalog.clear')}
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
          <CatalogSidebar />
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
                      Ver mais
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
            <CatalogSidebar />
            <button
              type="button"
              className="btn btn-primary btn-full"
              style={{ marginTop: 20 }}
              onClick={() => setFilterDrawerOpen(false)}
            >
              Aplicar filtros
            </button>
          </aside>
        </>
      )}
    </div>
  )
}
