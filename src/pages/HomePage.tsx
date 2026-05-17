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
import { getProductsByGroup, products } from '../data/products'
import { filterProducts } from '../utils/price'

export function HomePage() {
  const { searchQuery, activeCategory } = useApp()
  const filtered = filterProducts(products, searchQuery, activeCategory)
  const bySection = (section: string) => filtered.filter((p) => p.section === section)
  const topSellers = filterProducts(getProductsByGroup('vendidos'), searchQuery, activeCategory)

  return (
    <main>
      <Hero />
      <PromoSlideshow />
      <FeaturesBar />
      {searchQuery && (
        <div className="search-results-banner">
          <div className="container">
            {filtered.length} resultado(s) para &quot;{searchQuery}&quot; —{' '}
            <Link to="/ofertas">Ver todos</Link>
          </div>
        </div>
      )}
      <BassulaCampaignBanner />
      <ProductCarousel id="ofertas" title="Melhores ofertas" products={bySection('ofertas')} />
      <PromoBanners />
      <ProductCarousel
        title="Encha o seu carrinho"
        products={bySection('carrinho')}
        centered
        moreLink="/alimentos"
        moreLabel="Ver mais alimentos"
      />
      <ProductCarousel
        id="mais-vendidos"
        title="Mais vendidos"
        products={topSellers}
        variant="top-sellers"
        moreLink="/mais-vendidos"
        moreLabel="Ver ranking completo"
      />
      <ProductCarousel title="Ofertas frescas" products={bySection('frescos')} />
      <CategoryGrid />
      <AppPromo />
      <Newsletter />
    </main>
  )
}
