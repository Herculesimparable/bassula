import { Headphones, Scale, Shield, Truck, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { featureItems } from '../data/products'
import { useTranslation } from '../context/LocaleContext'

const icons = { truck: Truck, shield: Shield, scale: Scale, headphones: Headphones }

const DETAIL_KEYS: Record<string, { titleKey: string; bodyKey: string; bulletsKey: string }> = {
  'features.fast.title': {
    titleKey: 'features.fast.title',
    bodyKey: 'features.fast.detail',
    bulletsKey: 'features.fast.bullets',
  },
  'features.quality.title': {
    titleKey: 'features.quality.title',
    bodyKey: 'features.quality.detail',
    bulletsKey: 'features.quality.bullets',
  },
  'features.fair.title': {
    titleKey: 'features.fair.title',
    bodyKey: 'features.fair.detail',
    bulletsKey: 'features.fair.bullets',
  },
  'features.support.title': {
    titleKey: 'features.support.title',
    bodyKey: 'features.support.detail',
    bulletsKey: 'features.support.bullets',
  },
}

export function FeaturesBar() {
  const { t } = useTranslation()
  const [openKey, setOpenKey] = useState<string | null>(null)

  const detail = openKey ? DETAIL_KEYS[openKey] : null

  useEffect(() => {
    if (!openKey) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [openKey])

  return (
    <>
      <section className="features-bar" aria-label={t('aria.features')}>
        <div className="container">
          <div className="features-grid">
            {featureItems.map((f) => {
              const Icon = icons[f.icon as keyof typeof icons]
              return (
                <button
                  key={f.titleKey}
                  type="button"
                  className="feature-item feature-item--btn"
                  onClick={() => setOpenKey(f.titleKey)}
                  aria-haspopup="dialog"
                  aria-expanded={openKey === f.titleKey}
                >
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3>{t(f.titleKey)}</h3>
                    <p>{t(f.descKey)}</p>
                    <span className="feature-item__more">{t('features.learnMore')}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {detail && (
        <div className="feature-modal-layer" role="presentation">
          <button
            type="button"
            className="overlay feature-modal-overlay"
            aria-label={t('common.close')}
            onClick={() => setOpenKey(null)}
          />
          <div
            className="feature-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-modal-title"
          >
            <button
              type="button"
              className="icon-btn feature-modal__close"
              onClick={() => setOpenKey(null)}
              aria-label={t('common.close')}
            >
              <X size={22} />
            </button>
            <h2 id="feature-modal-title">{t(detail.titleKey)}</h2>
            <p className="feature-modal__lead">{t(detail.bodyKey)}</p>
            <ul className="feature-modal__list">
              {t(detail.bulletsKey)
                .split('|')
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => (
                  <li key={line}>{line}</li>
                ))}
            </ul>
            <div className="feature-modal__actions">
              <Link to="/ajuda" className="btn btn-outline" onClick={() => setOpenKey(null)}>
                {t('features.helpLink')}
              </Link>
              <button type="button" className="btn btn-primary" onClick={() => setOpenKey(null)}>
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
