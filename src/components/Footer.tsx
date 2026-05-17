import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { CALL_CENTER, CALL_CENTER_DISPLAY, SUPPORT_EMAIL } from '../data/navigation'
import {
  footerAccountLinks,
  footerCategoryLinks,
  footerInfoLinks,
  footerMenuLinks,
} from '../data/products'
import { useTranslation } from '../context/LocaleContext'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo variant="light" className="footer-logo" />
          <h4>{t('footer.help')}</h4>
          <p>
            <Link to="/contacto">{t('footer.customerCare')}</Link>
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
          <h4>{t('footer.menu')}</h4>
          {footerMenuLinks.map((link) => (
            <Link key={link.key} to={link.path}>
              {t(link.key)}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>{t('footer.categories')}</h4>
          {footerCategoryLinks.map((link) => (
            <Link key={link.key} to={link.path}>
              {t(link.key)}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>{t('footer.info')}</h4>
          {footerInfoLinks.map((link) => (
            <Link key={link.key} to={link.path}>
              {t(link.key)}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>{t('footer.account')}</h4>
          {footerAccountLinks.map((link) => (
            <Link key={link.key} to={link.path}>
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span>{t('footer.copyright', { year })}</span>
          <span>{t('footer.address')}</span>
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
