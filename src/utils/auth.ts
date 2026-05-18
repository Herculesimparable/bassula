import { hashPassword, verifyPassword } from './passwordHash'
import { sanitizeDisplayName, sanitizeEmail } from './sanitize'

export interface UserAccount {
  email: string
  name: string
  createdAt: string
  passwordHash?: string
  /** Legado — migrado automaticamente no login */
  password?: string
}

export type AuthErrorKey =
  | 'nameRequired'
  | 'invalidEmail'
  | 'passwordMin'
  | 'passwordWeak'
  | 'emailRegistered'
  | 'accountNotFound'
  | 'wrongPassword'

const USERS_KEY = 'bassula-users'
const MIN_PASSWORD = 8

function loadUsers(): UserAccount[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as UserAccount[]
  } catch {
    return []
  }
}

function saveUsers(users: UserAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function isStrongEnough(password: string): boolean {
  return password.length >= MIN_PASSWORD && /[a-zA-Z]/.test(password) && /\d/.test(password)
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: AuthErrorKey }> {
  const normalized = sanitizeEmail(email)
  const displayName = sanitizeDisplayName(name)
  if (!displayName) return { ok: false, error: 'nameRequired' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return { ok: false, error: 'invalidEmail' }
  if (password.length < MIN_PASSWORD) return { ok: false, error: 'passwordMin' }
  if (!isStrongEnough(password)) return { ok: false, error: 'passwordWeak' }

  const users = loadUsers()
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, error: 'emailRegistered' }
  }

  const passwordHash = await hashPassword(password, normalized)
  users.push({
    name: displayName,
    email: normalized,
    passwordHash,
    createdAt: new Date().toISOString(),
  })
  saveUsers(users)
  return { ok: true }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ ok: true; user: UserAccount } | { ok: false; error: AuthErrorKey }> {
  const normalized = sanitizeEmail(email)
  const users = loadUsers()
  const idx = users.findIndex((u) => u.email === normalized)
  if (idx < 0) return { ok: false, error: 'accountNotFound' }

  const user = users[idx]!

  if (user.passwordHash) {
    const valid = await verifyPassword(password, normalized, user.passwordHash)
    if (!valid) return { ok: false, error: 'wrongPassword' }
    return { ok: true, user }
  }

  if (user.password) {
    if (user.password !== password) return { ok: false, error: 'wrongPassword' }
    user.passwordHash = await hashPassword(password, normalized)
    delete user.password
    users[idx] = user
    saveUsers(users)
    return { ok: true, user }
  }

  return { ok: false, error: 'wrongPassword' }
}

export function getSessionUser(): UserAccount | null {
  const email = localStorage.getItem('bassula-user')
  if (!email) return null
  return loadUsers().find((u) => u.email === email) ?? null
}

export function setSession(email: string) {
  localStorage.setItem('bassula-logged-in', 'true')
  localStorage.setItem('bassula-user', sanitizeEmail(email))
}

export function clearSession() {
  localStorage.removeItem('bassula-logged-in')
  localStorage.removeItem('bassula-user')
}

export function isLoggedIn(): boolean {
  return localStorage.getItem('bassula-logged-in') === 'true' && !!localStorage.getItem('bassula-user')
}
