import { Link } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import { ProductGridCard } from '../components/ProductGridCard'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'

export function FavoritesPage() {
  const { wishlist } = useApp()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <main className="page-favorites">
      <div className="container">
        <BackButton />
        <h1 className="page-title">Favoritos</h1>
        <p className="page-subtitle">
          Produtos que guardou com o ícone de coração — não é uma secção de loja, é a sua lista pessoal.
        </p>
        {items.length === 0 ? (
          <div className="empty-state card-empty">
            <p>Ainda não tem favoritos.</p>
            <Link to="/ofertas" className="btn-primary">
              Explorar ofertas
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
