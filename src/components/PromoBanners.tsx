import { Link } from 'react-router-dom'
import { BassulaButton } from './BassulaButton'

export function PromoBanners() {
  return (
    <section className="section promo-section" aria-label="Promoções">
      <div className="container">
        <div className="promo-bassula-strip">
          <BassulaButton variant="card" to="/ofertas" className="promo-bassula-strip__img" />
          <div className="promo-bassula-strip__text">
            <strong>Bassula nos Preços</strong>
            <span>Arroz, óleo, feijão e açúcar — clique na imagem para ver ofertas</span>
            <Link to="/ofertas" className="promo-bassula-strip__link">
              Ver preços em queda →
            </Link>
          </div>
        </div>
        <div className="promo-row">
          <article className="promo-banner wine">
            <h3>Seleção de vinhos</h3>
            <p>Compare preços em todas as lojas</p>
            <Link to="/bebidas" className="btn btn-primary btn-sm">
              Ver ofertas
            </Link>
          </article>
          <article className="promo-banner cheese">
            <p className="promo-discount">40%</p>
            <h3>de desconto</h3>
            <p>Em lacticínios selecionados</p>
            <Link to="/ofertas" className="btn btn-primary btn-sm">
              Aproveitar
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
