import { Check, MapPin, ShoppingCart } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/ui/Button'
import { ProductImage } from '../components/ProductImage'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'
import { getProductById } from '../data/products'
import { formatPrice, getBestPrice, getDisplayPrice } from '../utils/price'

export function ProductDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const { currency, addToCart } = useApp()
  const [qty, setQty] = useState(1)

  const product = id ? getProductById(id) : undefined

  const sorted = useMemo(
    () =>
      product?.prices?.length
        ? [...product.prices].sort(
            (a, b) => (a.promo ?? a.price) - (b.promo ?? b.price),
          )
        : [],
    [product],
  )

  const best = sorted.length ? getBestPrice(sorted) : null

  if (!product || !best) {
    return (
      <main className="page-product-detail">
        <div className="container">
          <BackButton />
          <div className="empty-state card-empty">
            <p>{t('detail.notFound')}</p>
            <Link to="/ofertas" className="btn-primary">
              {t('cart.seeOffers')}
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="page-product-detail">
      <div className="container">
        <BackButton />

        <div className="product-detail-layout">
          <div className="product-detail-visual">
            <ProductImage
              src={product.image}
              alt={product.name}
              loading="eager"
              productId={product.id}
              category={product.category}
            />
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-unit">{product.unit}</p>
            <p className="product-detail-category">{product.category}</p>

            <div className="product-detail-best">
              <span className="best-label">{t('detail.bestPrice')}</span>
              <span className="best-price">
                {formatPrice(getDisplayPrice(best, currency), currency)}
              </span>
              <span className="best-store">
                <MapPin size={16} />
                {best.storeName}
              </span>
            </div>

            <div className="qty-row qty-row-lg">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>

            <Button
              type="button"
              variant="primary"
              fullWidth
              onClick={() => addToCart(product, qty, best.storeId)}
            >
              <ShoppingCart size={20} />
              {t('detail.addToCart')}
            </Button>
          </div>
        </div>

        <section className="stores-compare" aria-labelledby="compare-title">
          <h2 id="compare-title">{t('detail.compareTitle')}</h2>
          <p className="stores-compare-desc">
            {t('detail.compareDesc', { count: sorted.length })}
          </p>
          <ul className="stores-compare-list">
            {sorted.map((store, i) => {
              const price = getDisplayPrice(store, currency)
              const oldPrice = store.promo
                ? getDisplayPrice({ ...store, promo: undefined }, currency)
                : null
              const isBest = i === 0
              return (
                <li key={store.storeId} className={`store-compare-row ${isBest ? 'is-best' : ''}`}>
                  <div className="store-compare-name">
                    {isBest && (
                      <span className="store-best-badge">
                        <Check size={14} />
                        {t('detail.cheapest')}
                      </span>
                    )}
                    <strong>{store.storeName}</strong>
                  </div>
                  <div className="store-compare-prices">
                    {oldPrice != null && (
                      <span className="price-old">{formatPrice(oldPrice, currency)}</span>
                    )}
                    <span className="price-current">{formatPrice(price, currency)}</span>
                  </div>
                  <Button
                    type="button"
                    variant={isBest ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => addToCart(product, qty, store.storeId)}
                  >
                    {t('product.add')}
                  </Button>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
