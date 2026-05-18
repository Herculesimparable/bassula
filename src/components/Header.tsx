import { ChevronDown, Heart, LogIn, MapPin, Menu, Search, ShoppingCart, UserPlus, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { utilityLinks, mainNav } from '../data/navigation'
import { useApp } from '../context/AppContext'
import type { Currency } from '../types'
import { Logo } from './Logo'
import { NavMegaMenu } from './NavMegaMenu'
import { NavMegaPanel } from './NavMegaPanel'
import { categoryFilterHref, getCategoriesForGroup } from '../utils/categories'
import { useTranslation } from '../context/LocaleContext'
import { LanguageSelect } from './LanguageSelect'

export function Header() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    searchQuery,
    setSearchQuery,
    cartCount,
    wishlist,
    menuOpen,
    setMenuOpen,
    setAccountOpen,
    setAccountMode,
    setOpenMegaNav,
    currency,
    setCurrency,
    setActiveCategories,
    setActiveCategory,
    setPriceMax,
  } = useApp()
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const clearNavCloseTimer = () => {
    if (navCloseTimer.current) {
      clearTimeout(navCloseTimer.current)
      navCloseTimer.current = null
    }
  }

  const handleNavBlockEnter = () => clearNavCloseTimer()

  const handleNavBlockLeave = () => {
    clearNavCloseTimer()
    navCloseTimer.current = setTimeout(() => setOpenMegaNav(null), 250)
  }

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    setActiveCategories([])
    setPriceMax(null)
    const qs = params.toString()
    navigate(qs ? `/pesquisa?${qs}` : '/pesquisa?reset=1')
  }

  const openAccount = (mode: 'login' | 'register') => {
    setAccountMode(mode)
    setAccountOpen(true)
  }

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          {utilityLinks.map((l) => (
            <Link key={l.path} to={l.path}>
              {t(l.navKey)}
            </Link>
          ))}
          <span className="utility-promo">{t('brand.promo')}</span>
          <button type="button" className="utility-login" onClick={() => openAccount('login')}>
            <LogIn size={16} />
            {t('header.login')}
          </button>
          <button type="button" className="utility-register" onClick={() => openAccount('register')}>
            <UserPlus size={16} />
            {t('header.register')}
          </button>
          <LanguageSelect variant="utility" />
          <label className="currency-select">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label={t('header.currency')}
            >
              <option value="AOA">AOA</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
        </div>
      </div>

      <header className={`header-red ${scrolled ? 'header-red--scrolled' : ''}`}>
        <div className="container header-red-inner">
          <Logo variant="light" />
          <form className="search-form search-light" onSubmit={onSearch} role="search">
            <input
              type="search"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('header.search')}
            />
            <button type="submit" aria-label={t('header.search')}>
              <Search size={20} />
            </button>
          </form>
          <div className="header-actions header-actions-light">
            <LanguageSelect variant="header" />
            <Link to="/mapa" className="icon-btn icon-light" aria-label={t('header.map')} title={t('header.map')}>
              <MapPin size={22} />
            </Link>
            <Link to="/favoritos" className="icon-btn icon-light" aria-label={t('header.favorites')}>
              <Heart size={22} />
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>
            <Link to="/carrinho" className="icon-btn icon-light" aria-label={t('header.cart')}>
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      <div
        className={`nav-block ${scrolled ? 'nav-block--scrolled' : ''}`}
        onMouseEnter={handleNavBlockEnter}
        onMouseLeave={handleNavBlockLeave}
      >
        <nav className="nav-white" aria-label={t('aria.mainNav')}>
          <div className="container nav-white-inner">
            <button
              type="button"
              className="nav-hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label={t('header.menu')}
            >
              <Menu size={22} />
            </button>
            <div className="nav-desktop-mega">
              <NavMegaMenu />
            </div>
          </div>
        </nav>
        <NavMegaPanel />
      </div>

      {menuOpen && (
        <>
          <div className="overlay" onClick={() => setMenuOpen(false)} />
          <aside className="mobile-drawer">
            <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label={t('header.close')}>
              <X size={22} />
            </button>
            <Link to="/" onClick={() => setMenuOpen(false)} className="drawer-link">
              {t('nav.home')}
            </Link>
            {mainNav.map((item) => {
              const cats = item.group ? getCategoriesForGroup(item.group) : []
              const expanded = expandedMobile === item.path
              return (
                <div key={item.path} className="drawer-section">
                  <div className="drawer-section-row">
                    <Link
                      to={item.path}
                      className="drawer-link drawer-section-main"
                      onClick={() => {
                        setActiveCategory('todos')
                        setOpenMegaNav(null)
                        setMenuOpen(false)
                      }}
                    >
                      {t(item.navKey)}
                    </Link>
                    {cats.length > 0 && (
                      <button
                        type="button"
                        className="drawer-expand-btn"
                        aria-expanded={expanded}
                        aria-label={t('nav.categoriasDe', { name: t(item.navKey) })}
                        onClick={() => setExpandedMobile(expanded ? null : item.path)}
                      >
                        <ChevronDown size={18} style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />
                      </button>
                    )}
                  </div>
                  {expanded && cats.length > 0 && (
                    <ul className="drawer-sublist">
                      {cats.map((cat) => (
                        <li key={cat}>
                          <Link
                            to={categoryFilterHref(item.path, cat)}
                            className="drawer-sublink"
                            onClick={() => {
                              setActiveCategory(cat)
                              setMenuOpen(false)
                            }}
                          >
                            {cat}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          to={item.path}
                          className="drawer-sublink drawer-sublink-all"
                          onClick={() => {
                            setActiveCategory('todos')
                            setMenuOpen(false)
                          }}
                        >
                          {t('nav.verSecao', { name: t(item.navKey) })}
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              )
            })}
            <Link to="/mapa" onClick={() => setMenuOpen(false)} className="drawer-link">
              {t('nav.mapa')}
            </Link>
            <Link to="/contacto" onClick={() => setMenuOpen(false)} className="drawer-link">
              {t('nav.contacto')}
            </Link>
            <div className="drawer-lang">
              <LanguageSelect variant="drawer" />
            </div>
          </aside>
        </>
      )}
    </>
  )
}
