import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { getAllProductCategories } from '../utils/categories'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'

export function CatalogSidebar() {
  const { t } = useTranslation()
  const { activeCategory, setActiveCategory, priceMax, setPriceMax } = useApp()
  const [priceOpen, setPriceOpen] = useState(true)

  const priceOptions = useMemo(
    () => [
      { label: t('catalog.allPrices'), value: null as number | null },
      { label: t('catalog.upTo', { amount: '1.000' }), value: 1000 },
      { label: t('catalog.upTo', { amount: '2.500' }), value: 2500 },
      { label: t('catalog.upTo', { amount: '5.000' }), value: 5000 },
      { label: t('catalog.upTo', { amount: '10.000' }), value: 10000 },
      { label: t('catalog.upTo', { amount: '50.000' }), value: 50000 },
      { label: t('catalog.upTo', { amount: '200.000' }), value: 200000 },
    ],
    [t],
  )

  return (
    <aside className="catalog-sidebar" aria-label={t('catalog.filter')}>
      <h2>{t('catalog.filter')}</h2>
      <nav>
        <button
          type="button"
          className={`filter-link ${activeCategory === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveCategory('todos')}
        >
          {t('catalog.allCategories')}
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
          {t('catalog.price')}
          <ChevronDown size={18} style={{ transform: priceOpen ? 'rotate(180deg)' : undefined }} />
        </button>
        {priceOpen && (
          <div className="price-options">
            {priceOptions.map((opt) => (
              <button
                key={opt.value ?? 'all'}
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
