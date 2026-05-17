export interface UserAccount {
  email: string
  password: string
  name: string
  createdAt: string
}

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

export function registerUser(name: string, email: string, password: string): { ok: boolean; error?: string } {
  const normalized = email.trim().toLowerCase()
  if (!name.trim()) return { ok: false, error: 'Indique o seu nome' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return { ok: false, error: 'Email inválido' }
  if (password.length < 6) return { ok: false, error: 'Palavra-passe: mínimo 6 caracteres' }

  const users = loadUsers()
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, error: 'Este email já está registado' }
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

export function loginUser(email: string, password: string): { ok: boolean; user?: UserAccount; error?: string } {
  const normalized = email.trim().toLowerCase()
  const user = loadUsers().find((u) => u.email === normalized)
  if (!user) return { ok: false, error: 'Conta não encontrada. Crie uma conta.' }
  if (user.password !== password) return { ok: false, error: 'Palavra-passe incorrecta' }
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
