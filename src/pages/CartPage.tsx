import { Trash2 } from 'lucide-react'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/ui/Button'
import { ProductImage } from '../components/ProductImage'
import { useApp } from '../context/AppContext'
import { cartLineKeyFromItem } from '../utils/cart'
import { useTranslation } from '../context/LocaleContext'
import { formatPrice, getDisplayPrice } from '../utils/price'

export function CartPage() {
  const { t } = useTranslation()
  const {
    getCartProducts,
    updateQuantity,
    removeFromCart,
    clearCart,
    currency,
    showToast,
  } = useApp()

  const items = getCartProducts()

  const total = items.reduce((sum, { item, product }) => {
    const store = product.prices.find((p) => p.storeId === item.storeId)
    if (!store) return sum
    return sum + getDisplayPrice(store, currency) * item.quantity
  }, 0)

  return (
    <main className="page-cart">
      <div className="container">
        <BackButton />
        <h1 className="page-title">{t('cart.title')}</h1>

        {items.length === 0 ? (
          <div className="empty-state card-empty">
            <p>{t('cart.empty')}</p>
            <Button to="/ofertas" variant="primary" animated>
              {t('cart.seeOffers')}
            </Button>
          </div>
        ) : (
          <div className="cart-page-layout">
            <div className="cart-list">
              {items.map(({ item, product }) => {
                const store = product.prices.find((p) => p.storeId === item.storeId)
                if (!store) return null
                const lineKey = cartLineKeyFromItem(item)
                return (
                  <article key={lineKey} className="cart-page-item">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      productId={product.id}
                      category={product.category}
                    />
                    <div className="cart-page-info">
                      <span className="cart-store-badge" title={t('cart.storeOrigin')}>
                        {store.storeName}
                      </span>
                      <h3>{product.name}</h3>
                      <p className="cart-page-unit">{product.unit}</p>
                      <p className="price-current">
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
                      </div>
                    </div>
                    <div className="cart-page-actions">
                      <p className="item-total">
                        {formatPrice(getDisplayPrice(store, currency) * item.quantity, currency)}
                      </p>
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeFromCart(item.productId, item.storeId)}
                        aria-label={t('cart.remove')}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            <aside className="cart-summary">
              <h2>{t('cart.summary')}</h2>
              <div className="summary-row">
                <span>{t('cart.subtotal')}</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
              <div className="summary-row">
                <span>{t('cart.delivery')}</span>
                <span>{t('cart.deliveryFree')}</span>
              </div>
              <div className="summary-total">
                <span>{t('cart.total')}</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
              <Button
                type="button"
                variant="primary"
                fullWidth
                animated
                onClick={() => showToast(t('toast.orderConfirmed'))}
              >
                {t('cart.checkout')}
              </Button>
              <Button type="button" variant="outline" fullWidth onClick={clearCart}>
                {t('cart.clear')}
              </Button>
              <Button to="/ofertas" variant="ghost" className="link-continue">
                {t('cart.continue')}
              </Button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
