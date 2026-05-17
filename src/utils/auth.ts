export interface UserAccount {
  email: string
  password: string
  name: string
  createdAt: string
}

export type AuthErrorKey =
  | 'nameRequired'
  | 'invalidEmail'
  | 'passwordMin'
  | 'emailRegistered'
  | 'accountNotFound'
  | 'wrongPassword'

const USERS_KEY = 'bassula-users'

function loadUsers(): UserAccount[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveUsers(users: UserAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser(
  name: string,
  email: string,
  password: string,
): { ok: true } | { ok: false; error: AuthErrorKey } {
  const normalized = email.trim().toLowerCase()
  if (!name.trim()) return { ok: false, error: 'nameRequired' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return { ok: false, error: 'invalidEmail' }
  if (password.length < 6) return { ok: false, error: 'passwordMin' }

  const users = loadUsers()
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, error: 'emailRegistered' }
  }

  users.push({
    name: name.trim(),
    email: normalized,
    password,
    createdAt: new Date().toISOString(),
  })
  saveUsers(users)
  return { ok: true }
}

export function loginUser(
  email: string,
  password: string,
): { ok: true; user: UserAccount } | { ok: false; error: AuthErrorKey } {
  const normalized = email.trim().toLowerCase()
  const user = loadUsers().find((u) => u.email === normalized)
  if (!user) return { ok: false, error: 'accountNotFound' }
  if (user.password !== password) return { ok: false, error: 'wrongPassword' }
  return { ok: true, user }
}

export function getSessionUser(): UserAccount | null {
  const email = localStorage.getItem('bassula-user')
  if (!email) return null
  return loadUsers().find((u) => u.email === email) ?? null
}

export function setSession(email: string) {
  localStorage.setItem('bassula-logged-in', 'true')
  localStorage.setItem('bassula-user', email)
}

export function clearSession() {
  localStorage.removeItem('bassula-logged-in')
  localStorage.removeItem('bassula-user')
}

export function isLoggedIn(): boolean {
  return localStorage.getItem('bassula-logged-in') === 'true' && !!localStorage.getItem('bassula-user')
}
