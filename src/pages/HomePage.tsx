import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProductGridCard } from '../components/ProductGridCard'
import { Hero } from '../components/Hero'
import { PromoSlideshow } from '../components/PromoSlideshow'
import { BassulaCampaignBanner } from '../components/BassulaCampaignBanner'
import { FeaturesBar } from '../components/FeaturesBar'
import { ProductCarousel } from '../components/ProductCarousel'
import { PromoBanners } from '../components/PromoBanners'
import { CategoryGrid } from '../components/CategoryGrid'
import { AppPromo } from '../components/AppPromo'
import { Newsletter } from '../components/Newsletter'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'
import { getProductsByGroup, products } from '../data/products'
import { filterProducts } from '../utils/price'

export function HomePage() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const { searchQuery, activeCategories } = useApp()
  const filtered = filterProducts(products, searchQuery, activeCategories)
  const bySection = (section: string) => filtered.filter((p) => p.section === section)
  const topSellers = filterProducts(getProductsByGroup('vendidos'), searchQuery, activeCategories)

  return (
    <main>
      <Hero />
      <PromoSlideshow />
      <FeaturesBar />
      {searchQuery.trim() && (
        <motion.section
          className="section search-results-section"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="container">
            <div className="section-header">
              <h2>{t('home.searchResults', { count: filtered.length, query: searchQuery })}</h2>
              <Link
                to={`/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`}
                className="btn btn-outline btn-sm"
              >
                {t('home.searchSeeAll')}
              </Link>
            </div>
            {filtered.length === 0 ? (
              <div className="empty-state empty-state--catalog">
                <p>{t('catalog.noProducts')}</p>
                <Link to="/ofertas" className="btn btn-primary empty-state__cta">
                  {t('catalog.seeAllOffers')}
                </Link>
              </div>
            ) : (
              <div className="product-grid search-results-grid">
                {filtered.slice(0, 12).map((p) => (
                  <ProductGridCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}
      <BassulaCampaignBanner />
      <ProductCarousel
        id="ofertas"
        title={t('home.bestOffers')}
        products={bySection('ofertas')}
      />
      <PromoBanners />
      <ProductCarousel
        title={t('home.fillCart')}
        products={bySection('carrinho')}
        centered
        moreLink="/alimentos?reset=1"
        moreLabel={t('home.seeMoreFood')}
      />
      <ProductCarousel
        id="mais-vendidos"
        title={t('home.topSellers')}
        products={topSellers}
        variant="top-sellers"
        moreLink="/mais-vendidos"
        moreLabel={t('home.rankingMore')}
      />
      <ProductCarousel title={t('home.freshOffers')} products={bySection('frescos')} />
      <CategoryGrid />
      <AppPromo />
      <Newsletter />
    </main>
  )
}
