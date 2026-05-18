import { Headphones, Scale, Shield, Truck, X } from 'lucide-react'
import { useState } from 'react'
import { featureItems } from '../data/products'
import { useTranslation } from '../context/LocaleContext'

const icons = { truck: Truck, shield: Shield, scale: Scale, headphones: Headphones }

const DETAIL_KEYS: Record<string, { titleKey: string; bodyKey: string }> = {
  'features.fast.title': { titleKey: 'features.fast.title', bodyKey: 'features.fast.detail' },
  'features.quality.title': {
    titleKey: 'features.quality.title',
    bodyKey: 'features.quality.detail',
  },
  'features.fair.title': { titleKey: 'features.fair.title', bodyKey: 'features.fair.detail' },
  'features.support.title': {
    titleKey: 'features.support.title',
    bodyKey: 'features.support.detail',
  },
}

export function FeaturesBar() {
  const { t } = useTranslation()
  const [openKey, setOpenKey] = useState<string | null>(null)

  const detail = openKey ? DETAIL_KEYS[openKey] : null

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
        <>
          <div className="overlay" onClick={() => setOpenKey(null)} />
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
            <p>{t(detail.bodyKey)}</p>
            <button type="button" className="btn btn-primary" onClick={() => setOpenKey(null)}>
              {t('common.close')}
            </button>
          </div>
        </>
      )}
    </>
  )
}
