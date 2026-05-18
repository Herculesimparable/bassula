import { Link } from 'react-router-dom'
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
  const { searchQuery, activeCategories } = useApp()
  const filtered = filterProducts(products, searchQuery, activeCategories)
  const bySection = (section: string) => filtered.filter((p) => p.section === section)
  const topSellers = filterProducts(getProductsByGroup('vendidos'), searchQuery, activeCategories)

  return (
    <main>
      <Hero />
      <PromoSlideshow />
      <FeaturesBar />
      {searchQuery && (
        <div className="search-results-banner">
          <div className="container">
            {t('home.searchResults', { count: filtered.length, query: searchQuery })} —{' '}
            <Link to={`/ofertas?q=${encodeURIComponent(searchQuery.trim())}`}>
              {t('home.searchSeeAll')}
            </Link>
          </div>
        </div>
      )}
      <BassulaCampaignBanner />
      <ProductCarousel
        id="ofertas"
        title={t('home.bestOffers')}
        products={bySection('ofertas')}
      />
      <PromoBanners />
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
