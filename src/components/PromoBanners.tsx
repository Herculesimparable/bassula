import { Link } from 'react-router-dom'
import { BassulaButton } from './BassulaButton'
import { useTranslation } from '../context/LocaleContext'

export function PromoBanners() {
  const { t } = useTranslation()

  return (
    <section className="section promo-section" aria-label="Promoções">
      <div className="container">
        <div className="promo-bassula-strip">
          <BassulaButton variant="card" to="/ofertas" className="promo-bassula-strip__img" />
          <div className="promo-bassula-strip__text">
            <strong>{t('promo.stripTitle')}</strong>
            <span>{t('promo.stripDesc')}</span>
            <Link to="/ofertas" className="promo-bassula-strip__link">
              {t('promo.stripLink')}
            </Link>
          </div>
        </div>
        <div className="promo-row">
          <article className="promo-banner wine">
            <h3>{t('promo.wines')}</h3>
            <p>{t('promo.winesDesc')}</p>
            <Link to="/bebidas" className="btn btn-primary btn-sm">
              {t('promo.seeOffers')}
            </Link>
          </article>
          <article className="promo-banner cheese">
            <p className="promo-discount">40%</p>
            <h3>{t('promo.discount')}</h3>
            <p>{t('promo.dairy')}</p>
            <Link to="/ofertas" className="btn btn-primary btn-sm">
              {t('promo.enjoy')}
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
