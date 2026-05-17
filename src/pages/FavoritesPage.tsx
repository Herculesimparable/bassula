import { Link } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import { ProductGridCard } from '../components/ProductGridCard'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'
import { products } from '../data/products'

export function FavoritesPage() {
  const { wishlist } = useApp()
  const { t } = useTranslation()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <main className="page-favorites">
      <div className="container">
        <BackButton />
        <h1 className="page-title">{t('favorites.title')}</h1>
        <p className="page-subtitle">{t('favorites.subtitle')}</p>
        {items.length === 0 ? (
          <div className="empty-state card-empty">
            <p>{t('favorites.empty')}</p>
            <Link to="/ofertas" className="btn-primary">
              {t('favorites.explore')}
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((p) => (
              <ProductGridCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
