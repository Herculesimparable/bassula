import { useApp } from '../context/AppContext'
import { HERO_IMAGE } from '../data/images'
import { useTranslation } from '../context/LocaleContext'
import { tr } from '../i18n/runtime'

export function AppPromo() {
  const { t } = useTranslation()
  const { showToast } = useApp()

  return (
    <section className="app-promo" aria-label="Aplicação móvel">
      <div className="app-promo-bg" />
      <div className="container app-promo-grid">
        <div className="phone-mockup">
          <img src={HERO_IMAGE} alt={t('appPromo.phoneAlt')} loading="lazy" />
        </div>
        <div>
          <h2>{t('appPromo.title')}</h2>
          <p>{t('appPromo.desc')}</p>
          <div className="app-badges">
            <button
              type="button"
              className="app-badge"
              onClick={() => showToast(tr('toast.appStoreSoon'), 'info')}
            >
              {t('appPromo.appStore')}
            </button>
            <button
              type="button"
              className="app-badge"
              onClick={() => showToast(tr('toast.googlePlaySoon'), 'info')}
            >
              {t('appPromo.googlePlay')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

