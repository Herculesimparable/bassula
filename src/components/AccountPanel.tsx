import { X } from 'lucide-react'
import { Button } from './ui/Button'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/LocaleContext'
import type { AuthErrorKey } from '../utils/auth'
import { loginUser, registerUser, setSession } from '../utils/auth'

export function AccountPanel() {
  const {
    accountOpen,
    setAccountOpen,
    accountMode,
    setAccountMode,
    showToast,
    wishlist,
    sessionUser,
    refreshSession,
    logout,
  } = useApp()
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  if (!accountOpen) return null

  const loggedIn = !!sessionUser
  const authError = (key: AuthErrorKey) => t(`auth.${key}`)

  const onRegister = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      showToast(t('account.passwordMismatch'), 'error')
      return
    }
    const result = await registerUser(name, email, password)
    if (!result.ok) {
      showToast(authError(result.error), 'error')
      return
    }
    setSession(email.trim().toLowerCase())
    refreshSession()
    showToast(t('account.welcomeNew', { name: name.split(' ')[0] }))
    setPassword('')
    setConfirm('')
  }

  const onLogin = async (e: FormEvent) => {
    e.preventDefault()
    const result = await loginUser(email, password)
    if (!result.ok) {
      showToast(authError(result.error), 'error')
      return
    }
    setSession(result.user.email)
    refreshSession()
    showToast(t('account.welcomeBack', { name: result.user.name.split(' ')[0] }))
    setPassword('')
  }

  const inputStyle = {
    width: '100%',
    marginTop: 6,
    padding: 12,
    border: '1px solid var(--border)',
    borderRadius: 8,
  } as const

  const panelTitle = loggedIn
    ? t('account.myAccount')
    : accountMode === 'register'
      ? t('account.createAccount')
      : t('account.signIn')

  return (
    <aside className="side-panel account-panel" role="dialog" aria-label={t('account.dialog')}>
      <div className="panel-header">
        <h2>{panelTitle}</h2>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setAccountOpen(false)}
          aria-label={t('account.close')}
        >
          <X size={22} />
        </button>
      </div>
      <div className="panel-body">
        {loggedIn && sessionUser ? (
          <div className="account-session">
            <div className="account-session-badge" role="status">
              <span className="account-session-dot" aria-hidden />
              {t('header.connected')}
            </div>
            <p className="account-session-greeting">
              {t('account.helloPrefix')} <strong>{sessionUser.name}</strong>
            </p>
            <p className="account-session-email">{sessionUser.email}</p>
            <p className="account-session-meta">
              {t('account.favoritesCount', { count: wishlist.length })}
            </p>
            <Button type="button" variant="outline" fullWidth onClick={logout}>
              {t('account.signOut')}
            </Button>
          </div>
        ) : (
          <>
            <div className="account-tabs">
              <button
                type="button"
                className={accountMode === 'login' ? 'active' : ''}
                onClick={() => setAccountMode('login')}
              >
                {t('account.signIn')}
              </button>
              <button
                type="button"
                className={accountMode === 'register' ? 'active' : ''}
                onClick={() => setAccountMode('register')}
              >
                {t('account.createAccount')}
              </button>
            </div>

            {accountMode === 'register' ? (
              <form onSubmit={onRegister}>
                <label style={{ display: 'block', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('account.fullName')}</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    required
                    placeholder={t('account.namePlaceholder')}
                  />
                </label>
                <label style={{ display: 'block', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('account.email')}</span>
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
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('account.password')}</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                    minLength={6}
                    placeholder={t('account.passwordPlaceholder')}
                  />
                </label>
                <label style={{ display: 'block', marginBottom: 20 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('account.confirmPassword')}</span>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    style={inputStyle}
                    required
                    minLength={6}
                  />
                </label>
                <Button type="submit" variant="primary" fullWidth animated>
                  {t('account.createAccount')}
                </Button>
              </form>
            ) : (
              <form onSubmit={onLogin}>
                <label style={{ display: 'block', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('account.email')}</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </label>
                <label style={{ display: 'block', marginBottom: 20 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t('account.password')}</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                    minLength={6}
                  />
                </label>
                <Button type="submit" variant="primary" fullWidth animated>
                  {t('account.signIn')}
                </Button>
              </form>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
