import { useTranslation } from '../context/LocaleContext'

export function PageLoader() {
  const { t } = useTranslation()

  return (
    <section className="page-loader" aria-live="polite" aria-busy="true">
      <div className="page-loader-orbit" />
      <p>{t('loader.text')}</p>
    </section>
  )
}
