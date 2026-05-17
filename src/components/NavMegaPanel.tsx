import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'
import { categoryFilterHref, getCategoriesForGroup } from '../utils/categories'

export function NavMegaPanel() {
  const { t } = useTranslation()
  const { openMegaNav, setOpenMegaNav, setActiveCategory } = useApp()

  if (!openMegaNav) return null

  const categories = getCategoriesForGroup(openMegaNav.group)
  const { path, navKey } = openMegaNav
  const label = t(navKey)

  const close = () => setOpenMegaNav(null)

  return (
    <div className="nav-mega-panel" role="region" aria-label={t('nav.categoriasDe', { name: label })}>
      <div className="container nav-mega-panel-inner">
        <header className="nav-mega-panel-head">
          <div>
            <h2 className="nav-mega-panel-title">
              {t('nav.categoriasDe', { name: label })}
            </h2>
          </div>
          <span className="nav-mega-panel-count" aria-hidden>
            {categories.length}
          </span>
        </header>

        <ul className="nav-mega-panel-grid">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                to={categoryFilterHref(path, cat)}
                className="nav-mega-panel-chip"
                onClick={() => {
                  setActiveCategory(cat)
                  close()
                }}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>

        <footer className="nav-mega-panel-footer">
          <Link
            to={path}
            className="nav-mega-panel-cta"
            onClick={() => {
              setActiveCategory('todos')
              close()
            }}
          >
            {t('nav.verSecao', { name: label })}
            <ArrowRight size={16} />
          </Link>
        </footer>
      </div>
    </div>
  )
}
