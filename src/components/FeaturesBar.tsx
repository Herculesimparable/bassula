import { Headphones, Scale, Shield, Truck } from 'lucide-react'
import { featureItems } from '../data/products'
import { useTranslation } from '../context/LocaleContext'

const icons = { truck: Truck, shield: Shield, scale: Scale, headphones: Headphones }

export function FeaturesBar() {
  const { t } = useTranslation()

  return (
    <section className="features-bar" aria-label={t('aria.features')}>
      <div className="container">
        <div className="features-grid">
          {featureItems.map((f) => {
            const Icon = icons[f.icon as keyof typeof icons]
            return (
              <article key={f.titleKey} className="feature-item">
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <div>
                  <h3>{t(f.titleKey)}</h3>
                  <p>{t(f.descKey)}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
