import { useState } from 'react'
import type { FormEvent } from 'react'
import { useApp } from '../context/AppContext'

export function Newsletter() {
  const { subscribe, subscribed } = useApp()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (subscribed) return
    if (!subscribe(email)) {
      setError('Introduza um email válido')
      return
    }
    setError('')
    setEmail('')
  }

  return (
    <section className="newsletter" aria-label="Newsletter">
      <div className="newsletter-bg" />
      <div className="container">
        <h2>20% de desconto na sua primeira compra</h2>
        <p>Subscreva a newsletter e receba alertas das melhores promoções em Angola.</p>
        {subscribed ? (
          <p style={{ fontWeight: 600 }}>✓ Já está subscrito. Obrigado!</p>
        ) : (
          <form className="newsletter-form" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="O seu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              aria-label="Email"
              required
            />
            <button type="submit">Subscrever</button>
          </form>
        )}
        {error && <p style={{ color: '#ffb4b4', marginTop: 8 }}>{error}</p>}
      </div>
    </section>
  )
}
