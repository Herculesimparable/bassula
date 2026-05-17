import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { getAllProductCategories } from '../utils/categories'
import { useApp } from '../context/AppContext'

export function CatalogSidebar() {
  const { activeCategory, setActiveCategory, priceMax, setPriceMax } = useApp()
  const [priceOpen, setPriceOpen] = useState(true)

  const priceOptions = [
    { label: 'Todos os preços', value: null },
    { label: 'Até 1.000 Kz', value: 1000 },
    { label: 'Até 2.500 Kz', value: 2500 },
    { label: 'Até 5.000 Kz', value: 5000 },
    { label: 'Até 10.000 Kz', value: 10000 },
    { label: 'Até 50.000 Kz', value: 50000 },
    { label: 'Até 200.000 Kz', value: 200000 },
  ]

  return (
    <aside className="catalog-sidebar" aria-label="Filtros">
      <h2>Filtrar</h2>
      <nav>
        <button
          type="button"
          className={`filter-link ${activeCategory === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveCategory('todos')}
        >
          Todas as categorias
        </button>
        {getAllProductCategories().map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-link ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>
      <div className="price-filter">
        <button
          type="button"
          className="price-filter-toggle"
          onClick={() => setPriceOpen(!priceOpen)}
        >
          Preço
          <ChevronDown size={18} style={{ transform: priceOpen ? 'rotate(180deg)' : undefined }} />
        </button>
        {priceOpen && (
          <div className="price-options">
            {priceOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`filter-link ${priceMax === opt.value ? 'active' : ''}`}
                onClick={() => setPriceMax(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
