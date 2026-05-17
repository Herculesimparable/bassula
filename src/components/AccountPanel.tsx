import { X } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useApp } from '../context/AppContext'
import {
  clearSession,
  getSessionUser,
  isLoggedIn,
  loginUser,
  registerUser,
  setSession,
} from '../utils/auth'

export function AccountPanel() {
  const {
    accountOpen,
    setAccountOpen,
    accountMode,
    setAccountMode,
    showToast,
    wishlist,
  } = useApp()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loggedIn, setLoggedIn] = useState(isLoggedIn)
  const [userName, setUserName] = useState(() => getSessionUser()?.name ?? '')

  if (!accountOpen) return null

  const refreshSession = () => {
    const u = getSessionUser()
    setLoggedIn(isLoggedIn())
    setUserName(u?.name ?? '')
  }

  const onRegister = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      showToast('As palavras-passe não coincidem', 'error')
      return
    }
    const result = registerUser(name, email, password)
    if (!result.ok) {
      showToast(result.error ?? 'Erro ao criar conta', 'error')
      return
    }
    setSession(email.trim().toLowerCase())
    refreshSession()
    showToast(`Conta criada! Bem-vindo, ${name.split(' ')[0]}!`)
    setPassword('')
    setConfirm('')
  }

  const onLogin = (e: FormEvent) => {
    e.preventDefault()
    const result = loginUser(email, password)
    if (!result.ok) {
      showToast(result.error ?? 'Erro ao entrar', 'error')
      return
    }
    setSession(result.user!.email)
    refreshSession()
    showToast(`Bem-vindo, ${result.user!.name.split(' ')[0]}!`)
  }

  const onLogout = () => {
    clearSession()
    setLoggedIn(false)
    setUserName('')
    showToast('Sessão terminada')
    setAccountOpen(false)
  }

  const inputStyle = {
    width: '100%',
    marginTop: 6,
    padding: 12,
    border: '1px solid var(--border)',
    borderRadius: 8,
  } as const

  return (
    <aside className="side-panel account-panel" role="dialog" aria-label="Conta">
      <div className="panel-header">
        <h2>{loggedIn ? 'A minha conta' : accountMode === 'register' ? 'Criar conta' : 'Entrar'}</h2>
        <button type="button" className="icon-btn" onClick={() => setAccountOpen(false)} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>
      <div className="panel-body">
        {loggedIn ? (
          <div>
            <p style={{ marginBottom: 8 }}>
              Olá, <strong>{userName}</strong>
            </p>
            <p style={{ marginBottom: 16, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {localStorage.getItem('bassula-user')}
            </p>
            <p style={{ marginBottom: 16, color: 'var(--text-muted)' }}>
              Favoritos: {wishlist.length}
            </p>
            <button type="button" className="btn-outline btn-full" onClick={onLogout}>
              Terminar sessão
            </button>
          </div>
        ) : (
          <>
            <div className="account-tabs">
              <button
                type="button"
                className={accountMode === 'login' ? 'active' : ''}
                onClick={() => setAccountMode('login')}
              >
                Entrar
              </button>
              <button
                type="button"
                className={accountMode === 'register' ? 'active' : ''}
                onClick={() => setAccountMode('register')}
              >
                Criar conta
              </button>
            </div>

            {accountMode === 'register' ? (
              <form onSubmit={onRegister}>
                <label style={{ display: 'block', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Nome completo</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    required
                    placeholder="O seu nome"
                  />
                </label>
                <label style={{ display: 'block', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                    placeholder="seu@email.com"
                  />
                </label>
                <label style={{ display: 'block', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Palavra-passe</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                    minLength={6}
                    placeholder="Mín. 6 caracteres"
                  />
                </label>
                <label style={{ display: 'block', marginBottom: 20 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Confirmar palavra-passe</span>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    style={inputStyle}
                    required
                    minLength={6}
                  />
                </label>
                <button type="submit" className="btn-primary btn-full">
                  Criar conta
                </button>
              </form>
            ) : (
              <form onSubmit={onLogin}>
                <label style={{ display: 'block', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </label>
                <label style={{ display: 'block', marginBottom: 20 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Palavra-passe</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                    minLength={6}
                  />
                </label>
                <button type="submit" className="btn-primary btn-full">
                  Entrar
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
