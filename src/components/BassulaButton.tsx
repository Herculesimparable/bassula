import { Link } from 'react-router-dom'
import { BASSULA_CAMPAIGN_IMAGE } from '../data/brand'
import { useTranslation } from '../context/LocaleContext'

type Variant = 'icon' | 'pill' | 'card' | 'hero'

interface Props {
  to?: string
  variant?: Variant
  className?: string
  showTagline?: boolean
}

export function BassulaButton({
  to = '/ofertas',
  variant = 'pill',
  className = '',
  showTagline = false,
}: Props) {
  const { t } = useTranslation()
  const tagline = t('brand.tagline')

  return (
    <Link
      to={to}
      className={`bassula-btn bassula-btn--${variant} ${className}`.trim()}
      aria-label={t('logo.aria', { tagline })}
      title={tagline}
    >
      <img
        src={BASSULA_CAMPAIGN_IMAGE}
        alt={t('logo.bassulaAlt')}
        className="bassula-btn__img"
        loading={variant === 'hero' ? 'eager' : 'lazy'}
        decoding="async"
      />
      {showTagline && variant !== 'icon' && <span className="bassula-btn__tagline">{tagline}</span>}
    </Link>
  )
}
