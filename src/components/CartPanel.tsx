import { Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductImage } from './ProductImage'
import { useApp } from '../context/AppContext'
import { cartLineKeyFromItem } from '../utils/cart'
import { useTranslation } from '../context/LocaleContext'
import { formatPrice, getDisplayPrice } from '../utils/price'

export function CartPanel() {
  const { t } = useTranslation()
  const {
    getCartProducts,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    currency,
  } = useApp()

  if (!cartOpen) return null

  const items = getCartProducts()
  const total = items.reduce((sum, { item, product }) => {
    const store = product.prices.find((p) => p.storeId === item.storeId)
    if (!store) return sum
    return sum + getDisplayPrice(store, currency) * item.quantity
  }, 0)

  return (
    <aside className="side-panel" role="dialog" aria-label={t('cart.title')}>
      <div className="panel-header">
        <h2>{t('cart.panelTitle', { count: items.length })}</h2>
        <button type="button" className="icon-btn" onClick={() => setCartOpen(false)} aria-label={t('header.close')}>
          <X size={22} />
        </button>
      </div>
      <div className="panel-body">
        {items.length === 0 ? (
          <div className="empty-state">
            <p>{t('cart.panelEmpty')}</p>
            <Link to="/ofertas" className="btn-primary" onClick={() => setCartOpen(false)}>
              {t('cart.seeOffers')}
            </Link>
          </div>
        ) : (
          items.map(({ item, product }) => {
            const store = product.prices.find((p) => p.storeId === item.storeId)
            if (!store) return null
            const lineKey = cartLineKeyFromItem(item)
            return (
              <div key={lineKey} className="cart-item">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  productId={product.id}
                  category={product.category}
                />
                <div className="cart-item-info">
                  <h4>{product.name}</h4>
                  <span className="cart-store-badge cart-store-badge--sm">{store.storeName}</span>
                  <p className="cart-item-price">
                    {formatPrice(getDisplayPrice(store, currency), currency)}
                  </p>
                  <div className="qty-controls">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.storeId, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.storeId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId, item.storeId)}
                      style={{ marginLeft: 'auto', color: 'var(--red)' }}
                      aria-label={t('cart.remove')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
      {items.length > 0 && (
        <div className="panel-footer">
          <div className="cart-total">
            <span>{t('cart.total')}</span>
            <span>{formatPrice(total, currency)}</span>
          </div>
          <Link to="/carrinho" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setCartOpen(false)}>
            {t('cart.goToCart')}
          </Link>
        </div>
      )}
    </aside>
  )
}
