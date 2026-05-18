import { Link } from 'react-router-dom'
import { BassulaButton } from './BassulaButton'
import { useTranslation } from '../context/LocaleContext'
import { PROMO_WINE_IMAGE, PROMO_DISCOUNT_IMAGE, categoryImageAlt } from '../data/images'

export function PromoBanners() {
  const { t } = useTranslation()

  return (
    <section className="section promo-section" aria-label={t('aria.promos')}>
      <div className="container">
        <div className="promo-bassula-strip">
          <BassulaButton variant="card" to="/ofertas?reset=1" className="promo-bassula-strip__img" />
          <div className="promo-bassula-strip__text">
            <strong>{t('promo.stripTitle')}</strong>
            <span>{t('promo.stripDesc')}</span>
            <Link to="/ofertas?reset=1" className="promo-bassula-strip__link">
              {t('promo.stripLink')}
            </Link>
          </div>
        </div>
        <div className="promo-row">
          <article className="promo-banner wine promo-banner--split">
            <div className="promo-banner__content">
              <h3>{t('promo.wines')}</h3>
              <p>{t('promo.winesDesc')}</p>
              <Link to="/bebidas?q=vinho" className="btn btn-primary btn-sm">
                {t('promo.seeOffers')}
              </Link>
            </div>
            <img
              src={PROMO_WINE_IMAGE}
              alt={categoryImageAlt('vinhos', t('promo.wines'))}
              className="promo-banner__photo"
              loading="lazy"
            />
          </article>
          <article className="promo-banner cheese promo-banner--split">
            <div className="promo-banner__content">
              <p className="promo-discount">40%</p>
              <h3>{t('promo.discount')}</h3>
              <p>{t('promo.dairy')}</p>
              <Link to="/ofertas?reset=1" className="btn btn-primary btn-sm">
                {t('promo.enjoy')}
              </Link>
            </div>
            <img
              src={PROMO_DISCOUNT_IMAGE}
              alt={t('promo.dairyAlt')}
              className="promo-banner__photo"
              loading="lazy"
            />
          </article>
        </div>
      </div>
    </section>
  )
}
