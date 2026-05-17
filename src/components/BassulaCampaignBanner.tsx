import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BassulaButton } from './BassulaButton'
import { BASSULA_TAGLINE } from '../data/brand'

export function BassulaCampaignBanner() {
  return (
    <section className="bassula-campaign-section" aria-label="Campanha Bassula nos Preços">
      <div className="container">
        <div className="bassula-campaign-card">
          <BassulaButton variant="hero" to="/ofertas" className="bassula-campaign-visual" />
          <div className="bassula-campaign-copy">
            <p className="bassula-campaign-eyebrow">Campanha oficial</p>
            <h2>Bassula nos Preços</h2>
            <p className="bassula-campaign-lead">{BASSULA_TAGLINE}</p>
            <p className="bassula-campaign-desc">
              Arroz, óleo, feijão, açúcar e milhares de produtos — compare Kero, Candando, Shoprite e
              mais. Quem faz Bassula derruba preços.
            </p>
            <div className="bassula-campaign-actions">
              <Link to="/ofertas" className="btn-primary">
                Ver ofertas em queda <ArrowRight size={18} />
              </Link>
              <Link to="/alimentos" className="btn-outline">
                Comparar alimentos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
