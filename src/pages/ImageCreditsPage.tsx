import { Link } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import { useTranslation } from '../context/LocaleContext'

export function ImageCreditsPage() {
  const { t } = useTranslation()

  return (
    <main className="page-static">
      <div className="container container-narrow">
        <BackButton />
        <h1 className="page-title">{t('credits.title')}</h1>
        <p className="page-subtitle">{t('credits.subtitle')}</p>

        <section className="static-block">
          <h2>{t('credits.authTitle')}</h2>
          <p>{t('credits.authBody')}</p>
        </section>

        <section className="static-block">
          <h2>{t('credits.sourcesTitle')}</h2>
          <ul className="credits-list">
            <li>
              <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener noreferrer">
                Open Food Facts
              </a>{' '}
              {t('credits.offDesc')}
            </li>
            <li>
              <a href="https://loremflickr.com" target="_blank" rel="noopener noreferrer">
                LoremFlickr
              </a>{' '}
              {t('credits.loremDesc')}
            </li>
            <li>{t('credits.storesNote')}</li>
          </ul>
        </section>

        <section className="static-block">
          <h2>{t('credits.storageTitle')}</h2>
          <p>{t('credits.storageBody1')}</p>
          <p>{t('credits.storageBody2')}</p>
        </section>

        <p>
          <Link to="/sobre" className="btn-outline">
            {t('credits.backAbout')}
          </Link>
        </p>
      </div>
    </main>
  )
}
