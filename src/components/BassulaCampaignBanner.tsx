import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BassulaButton } from './BassulaButton'
import { useTranslation } from '../context/LocaleContext'

export function BassulaCampaignBanner() {
  const { t } = useTranslation()

  return (
    <section className="bassula-campaign-section" aria-label={t('campaign.aria')}>
      <div className="container">
        <div className="bassula-campaign-card">
          <BassulaButton variant="hero" to="/ofertas" className="bassula-campaign-visual" />
          <div className="bassula-campaign-copy">
            <p className="bassula-campaign-eyebrow">{t('campaign.eyebrow')}</p>
            <h2>{t('campaign.title')}</h2>
            <p className="bassula-campaign-lead">{t('brand.tagline')}</p>
            <p className="bassula-campaign-desc">{t('campaign.desc')}</p>
            <div className="bassula-campaign-actions">
              <Link to="/ofertas" className="btn-primary">
                {t('campaign.ctaOffers')} <ArrowRight size={18} />
              </Link>
              <Link to="/alimentos" className="btn-outline">
                {t('campaign.ctaFood')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
