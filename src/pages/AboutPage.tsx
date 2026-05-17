import { Link } from 'react-router-dom'
import { StaticPage } from './StaticPage'
import { useTranslation } from '../context/LocaleContext'

export function AboutPage() {
  const { t } = useTranslation()

  return (
    <StaticPage title={t('static.about.title')}>
      <p>{t('static.about.p1')}</p>
      <p>{t('static.about.p2')}</p>
      <p>
        {t('static.about.creditsBefore')}{' '}
        <Link to="/creditos-imagens">{t('static.about.creditsLink')}</Link> {t('static.about.creditsAfter')}
      </p>
    </StaticPage>
  )
}
