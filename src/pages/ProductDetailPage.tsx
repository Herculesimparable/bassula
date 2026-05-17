import { Check, MapPin, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import { ProductImage } from '../components/ProductImage'
import { useApp } from '../context/AppContext'
import { getProductById } from '../data/products'
import { formatPrice, getDisplayPrice } from '../utils/price'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { currency, addToCart } = useApp()
  const [qty, setQty] = useState(1)

  const product = id ? getProductById(id) : undefined

  if (!product) {
    return (
      <main className="page-product-detail">
        <div className="container">
          <BackButton />
          <div className="empty-state card-empty">
            <p>Produto não encontrado.</p>
            <Link to="/ofertas" className="btn-primary">
              Ver ofertas
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const sorted = [...product.prices].sort(
    (a, b) => (a.promo ?? a.price) - (b.promo ?? b.price),
  )
  const best = sorted[0]

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
              <span className="best-label">Melhor preço</span>
              <span className="best-price">{formatPrice(getDisplayPrice(best, currency), currency)}</span>
              <span className="best-store">
                <MapPin size={16} />
                {best.storeName}
              </span>
            </div>

            <div className="qty-row qty-row-lg">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>

            <button
              type="button"
              className="btn-primary btn-full"
              onClick={() => addToCart(product, qty, best.storeId)}
            >
              <ShoppingCart size={20} />
              Adicionar ao carrinho
            </button>
          </div>
        </div>

        <section className="stores-compare" aria-labelledby="compare-title">
          <h2 id="compare-title">Comparar preços em todas as lojas</h2>
          <p className="stores-compare-desc">
            {sorted.length} loja(s) vendem este produto. O mais barato está destacado.
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
                        Mais barato
                      </span>
                    )}
                    <strong>{store.storeName}</strong>
                  </div>
                  <div className="store-compare-prices">
                    {oldPrice != null && <span className="price-old">{formatPrice(oldPrice, currency)}</span>}
                    <span className="price-current">{formatPrice(price, currency)}</span>
                  </div>
                  <button
                    type="button"
                    className={isBest ? 'btn-primary btn-sm' : 'btn-outline btn-sm'}
                    onClick={() => addToCart(product, qty, store.storeId)}
                  >
                    Adicionar
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
