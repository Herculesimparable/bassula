/** Remove accents for matching "agua" ↔ "Água". */
export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function searchTerms(query: string): string[] {
  return normalizeSearchText(query).split(/\s+/).filter(Boolean)
}

export function textMatchesQuery(text: string, query: string): boolean {
  const terms = searchTerms(query)
  if (!terms.length) return true
  const normalized = normalizeSearchText(text)
  return terms.every((term) => normalized.includes(term))
}
