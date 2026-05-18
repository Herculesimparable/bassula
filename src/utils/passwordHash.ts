/** Hash de palavra-passe no browser (PBKDF2) — nunca guardar texto simples. */
export async function hashPassword(password: string, email: string): Promise<string> {
  const enc = new TextEncoder()
  const salt = enc.encode(`bassula-v1:${email.trim().toLowerCase()}`)
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 120_000, hash: 'SHA-256' },
    keyMaterial,
    256,
  )
  const bytes = new Uint8Array(bits)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!)
  return btoa(binary)
}

export async function verifyPassword(
  password: string,
  email: string,
  storedHash: string,
): Promise<boolean> {
  const next = await hashPassword(password, email)
  return next === storedHash
}
