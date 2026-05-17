import { useApp } from '../context/AppContext'
import { HERO_IMAGE } from '../data/images'

export function AppPromo() {
  const { showToast } = useApp()

  return (
    <section className="app-promo" aria-label="Aplicação móvel">
      <div className="app-promo-bg" />
      <div className="container app-promo-grid">
        <div className="phone-mockup">
          <img
            src={HERO_IMAGE}
            alt="Aplicação Bassula no telemóvel"
            loading="lazy"
          />
        </div>
        <div>
          <h2>Compre onde estiver</h2>
          <p>Baixe a nossa aplicação e compare preços em tempo real, em Angola e no estrangeiro.</p>
          <div className="app-badges">
            <button
              type="button"
              className="app-badge"
              onClick={() => showToast('App Store — em breve disponível', 'info')}
            >
              App Store
            </button>
            <button
              type="button"
              className="app-badge"
              onClick={() => showToast('Google Play — em breve disponível', 'info')}
            >
              Google Play
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
