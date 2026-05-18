import { Link } from 'react-router-dom'
import { useTranslation } from '../context/LocaleContext'

interface Props {
  showCta?: boolean
}

export function CatalogEmptyState({ showCta = true }: Props) {
  const { t } = useTranslation()

  return (
    <div className="empty-state empty-state--catalog">
      <p className="empty-state__title">{t('catalog.noProducts')}</p>
      <p>{t('catalog.tryOther')}</p>
      {showCta && (
        <Link to="/ofertas" className="btn btn-primary empty-state__cta">
          {t('catalog.seeAllOffers')}
        </Link>
      )}
    </div>
  )
}
