import { ChevronDown, Heart, LogIn, MapPin, Menu, Search, ShoppingCart, UserPlus, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { utilityLinks, mainNav } from '../data/navigation'
import { useApp } from '../context/AppContext'
import type { Currency } from '../types'
import { Logo } from './Logo'
import { NavMegaMenu } from './NavMegaMenu'
import { NavMegaPanel } from './NavMegaPanel'
import { categoryFilterHref, getCategoriesForGroup } from '../utils/categories'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
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
    setActiveCategory,
  } = useApp()
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const navCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    const path = location.pathname.startsWith('/ofertas') ? location.pathname : '/ofertas'
    navigate(path)
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
              {l.label}
            </Link>
          ))}
          <span className="utility-promo">Bassula nos Preços — a queda é nos preços!</span>
          <button type="button" className="utility-login" onClick={() => openAccount('login')}>
            <LogIn size={16} />
            Entrar
          </button>
          <button type="button" className="utility-register" onClick={() => openAccount('register')}>
            <UserPlus size={16} />
            Criar conta
          </button>
          <label className="currency-select">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label="Moeda"
            >
              <option value="AOA">AOA</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
        </div>
      </div>

      <header className="header-red">
        <div className="container header-red-inner">
          <Logo variant="light" />
          <form className="search-form search-light" onSubmit={onSearch} role="search">
            <input
              type="search"
              placeholder="Pesquisar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Pesquisar"
            />
            <button type="submit" aria-label="Pesquisar">
              <Search size={20} />
            </button>
          </form>
          <div className="header-actions header-actions-light">
            <Link to="/mapa" className="icon-btn icon-light" aria-label="Ver mapa" title="Mapa">
              <MapPin size={22} />
            </Link>
            <Link to="/favoritos" className="icon-btn icon-light" aria-label="Favoritos">
              <Heart size={22} />
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>
            <Link to="/carrinho" className="icon-btn icon-light" aria-label="Carrinho">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      <div
        className="nav-block"
        onMouseEnter={handleNavBlockEnter}
        onMouseLeave={handleNavBlockLeave}
      >
        <nav className="nav-white" aria-label="Menu principal">
          <div className="container nav-white-inner">
            <button
              type="button"
              className="nav-hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
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
            <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Fechar">
              <X size={22} />
            </button>
            <Link to="/" onClick={() => setMenuOpen(false)} className="drawer-link">
              Início
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
                      {item.label}
                    </Link>
                    {cats.length > 0 && (
                      <button
                        type="button"
                        className="drawer-expand-btn"
                        aria-expanded={expanded}
                        aria-label={`Categorias de ${item.label}`}
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
                          Ver toda a secção {item.label} →
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              )
            })}
            <Link to="/mapa" onClick={() => setMenuOpen(false)} className="drawer-link">
              Mapa de lojas
            </Link>
            <Link to="/contacto" onClick={() => setMenuOpen(false)} className="drawer-link">
              Call center
            </Link>
          </aside>
        </>
      )}
    </>
  )
}
