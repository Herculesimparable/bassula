import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'

export function Newsletter() {
  const { t } = useTranslation()
  const { subscribe, subscribed } = useApp()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (subscribed) return
    if (!subscribe(email)) {
      setError(t('newsletter.invalidEmail'))
      return
    }
    setError('')
    setEmail('')
  }

  return (
    <section className="newsletter" aria-label={t('aria.newsletter')}>
      <div className="newsletter-bg" />
      <div className="container">
        <h2>{t('newsletter.title')}</h2>
        <p>{t('newsletter.desc')}</p>
        {subscribed ? (
          <p style={{ fontWeight: 600 }}>{t('newsletter.subscribed')}</p>
        ) : (
          <form className="newsletter-form" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              aria-label="Email"
              required
            />
            <button type="submit" className="btn btn-primary">
              {t('newsletter.subscribe')}
            </button>
          </form>
        )}
        {error && <p style={{ color: '#ffb4b4', marginTop: 8 }}>{error}</p>}
        <p className="newsletter-privacy">
          {t('newsletter.privacyNote')}{' '}
          <Link to="/privacidade">{t('legal.privacy.link')}</Link>.
        </p>
      </div>
    </section>
  )
}
