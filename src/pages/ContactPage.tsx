import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/ui/Button'
import { CALL_CENTER, CALL_CENTER_DISPLAY, SUPPORT_EMAIL } from '../data/navigation'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'
import { tr } from '../i18n/runtime'

export function ContactPage() {
  const { t } = useTranslation()
  const { showToast } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast(tr('toast.fillFields'), 'error')
      return
    }
    showToast(tr('toast.messageSent'))
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <main className="page-contact">
      <div className="container">
        <BackButton />
        <h1 className="page-title">{t('contact.title')}</h1>
        <p className="page-subtitle">{t('contact.subtitle')}</p>

        <div className="contact-grid">
          <div className="contact-cards">
            <a href={`tel:${CALL_CENTER}`} className="contact-card contact-card-primary">
              <Phone size={32} />
              <h3>{t('contact.callNow')}</h3>
              <p>{CALL_CENTER_DISPLAY}</p>
              <span className="contact-cta">{t('contact.tapToCall')}</span>
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="contact-card">
              <Mail size={28} />
              <h3>{t('contact.email')}</h3>
              <p>{SUPPORT_EMAIL}</p>
            </a>
            <div className="contact-card">
              <Clock size={28} />
              <h3>{t('contact.hours')}</h3>
              <p>{t('contact.hoursValue')}</p>
            </div>
            <button
              type="button"
              className="contact-card"
              onClick={() => showToast(tr('toast.liveChatSoon'), 'info')}
            >
              <MessageCircle size={28} />
              <h3>{t('contact.liveChat')}</h3>
              <p>{t('contact.chatResponse')}</p>
            </button>
          </div>

          <form className="contact-form card-form" onSubmit={onSubmit}>
            <h2>{t('contact.sendMessage')}</h2>
            <label>
              {t('contact.name')}
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              {t('contact.email')}
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              {t('contact.message')}
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
            </label>
            <Button type="submit" variant="primary" fullWidth animated>
              {t('contact.send')}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
