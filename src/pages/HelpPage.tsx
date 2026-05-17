import { StaticPage } from './StaticPage'
import { useTranslation } from '../context/LocaleContext'

export function HelpPage() {
  const { t } = useTranslation()

  return (
    <StaticPage title={t('static.help.title')}>
      <h3>{t('static.help.shippingTitle')}</h3>
      <p>{t('static.help.shippingBody')}</p>
      <h3>{t('static.help.returnsTitle')}</h3>
      <p>{t('static.help.returnsBody')}</p>
      <h3>{t('static.help.paymentsTitle')}</h3>
      <p>{t('static.help.paymentsBody')}</p>
    </StaticPage>
  )
}
