import { Link } from 'react-router-dom'
import { BASSULA_CAMPAIGN_IMAGE } from '../data/brand'

interface Props {
  variant?: 'light' | 'dark'
  className?: string
}

export function Logo({ variant = 'dark', className = '' }: Props) {
  return (
    <Link to="/" className={`logo-brand ${variant} ${className}`} aria-label="Bassula início">
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
        <small className="logo-sub">nos preços</small>
      </span>
    </Link>
  )
}
