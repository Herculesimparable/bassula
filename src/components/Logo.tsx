import { Link } from 'react-router-dom'
import { BASSULA_CAMPAIGN_IMAGE } from '../data/brand'
import { useTranslation } from '../context/LocaleContext'

interface Props {
  variant?: 'light' | 'dark'
  className?: string
}

export function Logo({ variant = 'dark', className = '' }: Props) {
  const { t } = useTranslation()

  return (
    <Link to="/" className={`logo-brand ${variant} ${className}`} aria-label={t('logo.home')}>
      <span className="logo-icon-wrap">
        <img
          src={BASSULA_CAMPAIGN_IMAGE}
          alt=""
          className="logo-icon logo-icon--campaign"
          width={48}
          height={48}
          decoding="async"
        />
      </span>
      <span className="logo-text">
        Bassula
        <small className="logo-sub">{t('logo.sub')}</small>
      </span>
    </Link>
  )
}
