import { Heart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { ProductImage } from './ProductImage'
import { useApp } from '../context/AppContext'
import type { Product } from '../types'
import { useTranslation } from '../context/LocaleContext'
import { formatPrice, getBestPrice, getDisplayPrice } from '../utils/price'

interface Props {
  product: Product
  rank?: number
  badgeVariant?: 'default' | 'top'
}

export function ProductCard({ product, rank, badgeVariant = 'default' }: Props) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { currency, addToCart, wishlist, toggleWishlist } = useApp()
  const best = getBestPrice(product.prices)
  const price = getDisplayPrice(best, currency)
  const badge = product.badge
  const badgeClass =
    badgeVariant === 'top' ? 'product-badge product-badge--top' : 'product-badge'

  return (
    <article className="product-card">
      <div className="product-card-image">
        {rank != null && (
          <span className={`rank-badge ${rank === 1 ? 'rank-badge--1' : ''}`} aria-hidden>
            {rank}
          </span>
        )}
        {badge && !rank && (
          <span className={badgeClass} aria-hidden>
            {badge}
          </span>
        )}
        {badge && rank && badgeVariant === 'top' && (
          <span className={badgeClass} style={{ top: '2.5rem' }}>
            {t('product.top')}
          </span>
        )}
        <button
          type="button"
          className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          aria-label="Adicionar aos favoritos"
        >
          <Heart size={16} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
        </button>
        <Link to={`/produto/${product.id}`} aria-label={product.name}>
          <ProductImage
            src={product.image}
            alt=""
            productId={product.id}
            category={product.category}
          />
        </Link>
      </div>
      <Link to={`/produto/${product.id}`} className="product-card-title-link">
        <h3>{product.name}</h3>
      </Link>
      <p className="product-unit">{product.unit}</p>
      <p className="product-price">{formatPrice(price, currency)}</p>
      <p className="product-store">{t('product.best', { store: best.storeName })}</p>
      <button
        type="button"
        className="compare-stores"
        onClick={() => navigate(`/produto/${product.id}`)}
      >
        {t('product.compareStores', { count: product.prices.length })}
      </button>
      <button
        type="button"
        className="btn btn-add"
        onClick={() => addToCart(product, 1, best.storeId)}
      >
        {t('product.add')}
      </button>
    </article>
  )
}
