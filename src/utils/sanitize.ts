/** Limita e limpa entrada de pesquisa (reduz risco XSS / abuso). */
export function sanitizeSearchQuery(raw: string): string {
  return raw
    .trim()
    .slice(0, 120)
    .replace(/[<>]/g, '')
}

export function sanitizeEmail(raw: string): string {
  return raw.trim().toLowerCase().slice(0, 254)
}

export function sanitizeDisplayName(raw: string): string {
  return raw.trim().slice(0, 80).replace(/[<>]/g, '')
}
