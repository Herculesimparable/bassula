import { Link } from 'react-router-dom'
import { BASSULA_CAMPAIGN_IMAGE, BASSULA_TAGLINE } from '../data/brand'

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
  return (
    <Link
      to={to}
      className={`bassula-btn bassula-btn--${variant} ${className}`.trim()}
      aria-label={`Bassula nos preços — ${BASSULA_TAGLINE}`}
      title={BASSULA_TAGLINE}
    >
      <img
        src={BASSULA_CAMPAIGN_IMAGE}
        alt="Bassula nos Preços — quem faz Bassula derruba preços"
        className="bassula-btn__img"
        loading={variant === 'hero' ? 'eager' : 'lazy'}
        decoding="async"
      />
      {showTagline && variant !== 'icon' && (
        <span className="bassula-btn__tagline">{BASSULA_TAGLINE}</span>
      )}
    </Link>
  )
}
