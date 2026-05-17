import { ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { mainNav } from '../data/navigation'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'
import type { NavGroup } from '../types'

function NavItem({
  path,
  navKey,
  group,
}: {
  path: string
  navKey: string
  group: NavGroup | null
}) {
  const { t } = useTranslation()
  const label = t(navKey)
  const location = useLocation()
  const { setActiveCategory, openMegaNav, setOpenMegaNav } = useApp()
  const isSectionActive = location.pathname === path
  const isOpen = openMegaNav?.path === path
  const isActive = isSectionActive || isOpen

  const openPanel = () => {
    if (group) setOpenMegaNav({ path, navKey, group })
  }

  const goToSection = () => {
    setActiveCategory('todos')
    setOpenMegaNav(null)
  }

  if (!group) {
    return (
      <Link
        to={path}
        className={`nav-white-link ${isActive ? 'active' : ''}`}
        onClick={goToSection}
      >
        {label}
      </Link>
    )
  }

  return (
    <div
      className={`nav-mega-item ${isOpen ? 'open' : ''} ${isActive ? 'active' : ''}`}
      onMouseEnter={openPanel}
    >
      <Link
        to={path}
        className={`nav-white-link nav-mega-trigger ${isActive ? 'active' : ''}`}
        onClick={goToSection}
        onFocus={openPanel}
      >
        {label}
      </Link>
      <button
        type="button"
        className="nav-mega-toggle"
        aria-expanded={isOpen}
        aria-label={t('nav.categoriasDe', { name: label })}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (isOpen) setOpenMegaNav(null)
          else openPanel()
        }}
      >
        <ChevronDown size={16} className="nav-chevron" />
      </button>
    </div>
  )
}

export function NavMegaMenu() {
  return (
    <>
      {mainNav.map((item) => (
        <NavItem key={item.path} path={item.path} navKey={item.navKey} group={item.group} />
      ))}
    </>
  )
}
