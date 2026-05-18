import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { getAllProductCategories, getCategoriesForGroup } from '../utils/categories'
import { useTranslation } from '../context/LocaleContext'
import type { NavGroup } from '../types'

interface CatalogSidebarProps {
  group?: NavGroup
  activeCategories: string[]
  priceMax: number | null
  onToggleCategory: (cat: string) => void
  onPriceChange: (value: number | null) => void
  onClearAll: () => void
}

export function CatalogSidebar({
  group,
  activeCategories,
  priceMax,
  onToggleCategory,
  onPriceChange,
  onClearAll,
}: CatalogSidebarProps) {
  const { t } = useTranslation()
  const [priceOpen, setPriceOpen] = useState(true)

  const categories = useMemo(
    () => (group ? getCategoriesForGroup(group) : getAllProductCategories()),
    [group],
  )

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

  const allSelected = activeCategories.length === 0
  const hasActiveFilters = !allSelected || priceMax != null

  return (
    <aside className="catalog-sidebar" aria-label={t('catalog.filter')}>
      <div className="catalog-sidebar__head">
        <h2>{t('catalog.filter')}</h2>
        {hasActiveFilters && (
          <button type="button" className="link-reset catalog-sidebar__clear" onClick={onClearAll}>
            {t('catalog.clearAll')}
          </button>
        )}
      </div>
      <nav>
        <button
          type="button"
          className={`filter-link ${allSelected ? 'active' : ''}`}
          onClick={() => onToggleCategory('todos')}
        >
          {t('catalog.allCategories')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-link ${activeCategories.includes(cat) ? 'active' : ''}`}
            onClick={() => onToggleCategory(cat)}
            aria-pressed={activeCategories.includes(cat)}
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
                onClick={() => onPriceChange(opt.value)}
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
