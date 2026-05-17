import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { BackButton } from '../components/BackButton'
import { CALL_CENTER, CALL_CENTER_DISPLAY, SUPPORT_EMAIL } from '../data/navigation'
import { useApp } from '../context/AppContext'

export function ContactPage() {
  const { showToast } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Preencha todos os campos', 'error')
      return
    }
    showToast('Mensagem enviada! Responderemos em breve.')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <main className="page-contact">
      <div className="container">
        <BackButton />
        <h1 className="page-title">Call center</h1>
        <p className="page-subtitle">Estamos disponíveis 24 horas para o ajudar em Angola e no estrangeiro.</p>

        <div className="contact-grid">
          <div className="contact-cards">
            <a href={`tel:${CALL_CENTER}`} className="contact-card contact-card-primary">
              <Phone size={32} />
              <h3>Ligar agora</h3>
              <p>{CALL_CENTER_DISPLAY}</p>
              <span className="contact-cta">Toque para ligar</span>
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="contact-card">
              <Mail size={28} />
              <h3>Email</h3>
              <p>{SUPPORT_EMAIL}</p>
            </a>
            <div className="contact-card">
              <Clock size={28} />
              <h3>Horário</h3>
              <p>Segunda a Domingo · 24/7</p>
            </div>
            <button
              type="button"
              className="contact-card"
              onClick={() => showToast('Chat ao vivo — um agente irá atendê-lo em instantes.', 'info')}
            >
              <MessageCircle size={28} />
              <h3>Chat ao vivo</h3>
              <p>Resposta média: 2 minutos</p>
            </button>
          </div>

          <form className="contact-form card-form" onSubmit={onSubmit}>
            <h2>Enviar mensagem</h2>
            <label>
              Nome
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Mensagem
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
            </label>
            <button type="submit" className="btn-primary btn-full">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
