import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'
import { shouldShowBassulaFab } from '../utils/bassulaFabRoutes'
import { BassulaButton } from './BassulaButton'

/** Botão flutuante — início, catálogo, produto e carrinho */
export function BassulaFab() {
  const { pathname } = useLocation()
  const { cartOpen, accountOpen } = useApp()
  const { t } = useTranslation()

  if (!shouldShowBassulaFab(pathname)) return null
  if (cartOpen || accountOpen) return null

  const onCart = pathname === '/carrinho'

  return (
    <aside
      className={`bassula-fab ${onCart ? 'bassula-fab--cart' : ''}`}
      aria-label={t('aria.campaignFab')}
    >
      <BassulaButton variant="icon" to="/ofertas" />
    </aside>
  )
}
