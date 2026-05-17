import { Heart, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductImage } from './ProductImage'
import { useApp } from '../context/AppContext'
import type { Product } from '../types'
import { formatPrice, getBestPrice, getDisplayPrice } from '../utils/price'

interface Props {
  product: Product
  badgeLabel?: string
  rank?: number
  topSeller?: boolean
}

export function ProductGridCard({ product, badgeLabel, rank, topSeller }: Props) {
  const { currency, addToCart, wishlist, toggleWishlist } = useApp()
  const [qty, setQty] = useState(1)
  const best = getBestPrice(product.prices)
  const current = getDisplayPrice(best, currency)
  const original = best.promo ? getDisplayPrice({ ...best, promo: undefined }, currency) : null
  const isWishlisted = wishlist.includes(product.id)
  const badge = badgeLabel ?? product.badge
  const badgeClass = topSeller ? 'grid-card-badge grid-card-badge--top' : 'grid-card-badge'

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, qty, best.storeId)
  }

  return (
    <article className={`grid-card ${topSeller ? 'grid-card--top' : ''}`}>
      <div className="grid-card-top">
        <div className="grid-card-badges">
          {rank != null && (
            <span className={`grid-card-rank rank-badge ${rank <= 3 ? `rank-badge--${rank}` : ''}`}>
              #{rank}
            </span>
          )}
          {badge && <span className={badgeClass}>{badge}</span>}
        </div>
        <button
          type="button"
          className={`grid-wishlist ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          aria-label="Adicionar aos favoritos"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>
      <Link to={`/produto/${product.id}`} className="grid-card-link">
        <div className="grid-card-img">
          <ProductImage
            src={product.image}
            alt=""
            productId={product.id}
            category={product.category}
          />
        </div>
        <h3>{product.name}</h3>
        <div className="grid-prices">
          {original != null && (
            <span className="price-old">{formatPrice(original, currency)}</span>
          )}
          <span className="price-current">{formatPrice(current, currency)}</span>
        </div>
        <p className="grid-store">Melhor: {best.storeName} · comparar lojas</p>
      </Link>
      <div className="qty-row" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="btn btn-icon" aria-label="Menos" onClick={() => setQty((q) => Math.max(1, q - 1))}>
          <Minus size={14} />
        </button>
        <span>{qty}</span>
        <button type="button" className="btn btn-icon" aria-label="Mais" onClick={() => setQty((q) => q + 1)}>
          <Plus size={14} />
        </button>
      </div>
      <button type="button" className="btn btn-add-grid" onClick={handleAdd}>
        Adicionar
      </button>
    </article>
  )
}
