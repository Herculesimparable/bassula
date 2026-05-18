import { useApp } from '../context/AppContext'
import { HERO_IMAGE } from '../data/images'
import { useTranslation } from '../context/LocaleContext'
import { tr } from '../i18n/runtime'
import { publicAsset } from '../utils/publicAsset'

const APP_STORE_BADGE = publicAsset('images/badges/app-store.svg')
const GOOGLE_PLAY_BADGE = publicAsset('images/badges/google-play.svg')

export function AppPromo() {
  const { t } = useTranslation()
  const { showToast } = useApp()

  return (
    <section className="app-promo" aria-label={t('aria.mobileApp')}>
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
              className="app-badge app-badge--store"
              onClick={() => showToast(tr('toast.appStoreSoon'), 'info')}
              aria-label={t('appPromo.appStoreAria')}
            >
              <img
                src={APP_STORE_BADGE}
                alt=""
                width={156}
                height={52}
                className="app-badge-img"
                loading="lazy"
                draggable={false}
              />
            </button>
            <button
              type="button"
              className="app-badge app-badge--play"
              onClick={() => showToast(tr('toast.googlePlaySoon'), 'info')}
              aria-label={t('appPromo.googlePlayAria')}
            >
              <img
                src={GOOGLE_PLAY_BADGE}
                alt=""
                width={176}
                height={52}
                className="app-badge-img"
                loading="lazy"
                draggable={false}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
