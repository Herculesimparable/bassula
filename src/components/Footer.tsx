import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { CALL_CENTER, CALL_CENTER_DISPLAY, SUPPORT_EMAIL } from '../data/navigation'
import { footerLinks } from '../data/products'

const menuRoutes: Record<string, string> = {
  Ofertas: '/ofertas',
  Alimentos: '/alimentos',
  Bebidas: '/bebidas',
  Electrodomésticos: '/electrodomesticos',
  'Mais vendidos': '/mais-vendidos',
  Favoritos: '/favoritos',
}

const infoRoutes: Record<string, string> = {
  FAQ: '/ajuda',
  Devoluções: '/ajuda',
  Atendimento: '/contacto',
  Lojas: '/mapa',
  Envios: '/ajuda',
  Termos: '/sobre',
  Pagamentos: '/ajuda',
  Cookies: '/sobre',
  'Créditos de imagens': '/creditos-imagens',
}

const contaRoutes: Record<string, string> = {
  Favoritos: '/favoritos',
  Carrinho: '/carrinho',
  'Os meus pedidos': '/carrinho',
  Definições: '/sobre',
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo variant="light" className="footer-logo" />
          <h4>Precisa de ajuda?</h4>
          <p>
            <Link to="/contacto">Atendimento ao cliente</Link>
          </p>
          <a href={`tel:${CALL_CENTER}`} className="footer-phone">
            {CALL_CENTER_DISPLAY}
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="footer-email">
            {SUPPORT_EMAIL}
          </a>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Menu</h4>
          {footerLinks.menu.map((label) => (
            <Link key={label} to={menuRoutes[label] ?? '/'}>
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Categorias</h4>
          {footerLinks.categorias.map((label) => (
            <Link key={label} to="/alimentos">
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Info</h4>
          {footerLinks.info.map((label) => (
            <Link key={label} to={infoRoutes[label] ?? '/ajuda'}>
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Minha escolha</h4>
          {footerLinks.conta.map((label) => (
            <Link key={label} to={contaRoutes[label] ?? '/carrinho'}>
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span>© {new Date().getFullYear()} Bassula — Comparação de preços em Angola</span>
          <span>Rua Rainha Ginga, Luanda · contacto@bassula.ao</span>
          <div className="payment-icons">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>Multicaixa</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
