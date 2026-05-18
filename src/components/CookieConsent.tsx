import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from '../context/LocaleContext'

const CONSENT_KEY = 'bassula-cookie-consent'

export function CookieConsent() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) !== '1') setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-consent" role="dialog" aria-labelledby="cookie-consent-title">
      <div className="cookie-consent__inner container">
        <p id="cookie-consent-title" className="cookie-consent__title">
          {t('cookies.title')}
        </p>
        <p className="cookie-consent__body">{t('cookies.body')}</p>
        <div className="cookie-consent__actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={accept}>
            {t('cookies.accept')}
          </button>
          <button type="button" className="btn btn-outline btn-sm" onClick={accept}>
            {t('cookies.reject')}
          </button>
          <Link to="/privacidade" className="cookie-consent__link" onClick={accept}>
            {t('cookies.more')}
          </Link>
        </div>
      </div>
    </div>
  )
}
