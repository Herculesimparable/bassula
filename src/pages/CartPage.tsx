import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { BackButton } from '../components/BackButton'
import { ProductImage } from '../components/ProductImage'
import { useApp } from '../context/AppContext'
import { formatPrice, getDisplayPrice } from '../utils/price'

export function CartPage() {
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
    const store = product.prices.find((p) => p.storeId === item.storeId)!
    return sum + getDisplayPrice(store, currency) * item.quantity
  }, 0)

  return (
    <main className="page-cart">
      <div className="container">
        <BackButton />
        <h1 className="page-title">O meu carrinho</h1>

        {items.length === 0 ? (
          <div className="empty-state card-empty">
            <p>O carrinho está vazio.</p>
            <Link to="/ofertas" className="btn-primary">
              Ver ofertas
            </Link>
          </div>
        ) : (
          <div className="cart-page-layout">
            <div className="cart-list">
              {items.map(({ item, product }) => {
                const store = product.prices.find((p) => p.storeId === item.storeId)!
                return (
                  <article key={item.productId} className="cart-page-item">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      productId={product.id}
                      category={product.category}
                    />
                    <div className="cart-page-info">
                      <h3>{product.name}</h3>
                      <p>{store.storeName} · {product.unit}</p>
                      <p className="price-current">
                        {formatPrice(getDisplayPrice(store, currency), currency)}
                      </p>
                      <div className="qty-controls">
                        <button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className="cart-page-actions">
                      <p className="item-total">
                        {formatPrice(getDisplayPrice(store, currency) * item.quantity, currency)}
                      </p>
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeFromCart(item.productId)}
                        aria-label="Remover"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            <aside className="cart-summary">
              <h2>Resumo</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
              <div className="summary-row">
                <span>Entrega</span>
                <span>Grátis acima de 15.000 Kz</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
              <button
                type="button"
                className="btn-primary btn-full"
                onClick={() => showToast('Pedido confirmado! Obrigado por comprar na Bassula.')}
              >
                Finalizar compra
              </button>
              <button type="button" className="btn-outline btn-full" onClick={clearCart}>
                Limpar carrinho
              </button>
              <Link to="/ofertas" className="link-continue">
                Continuar a comprar
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
