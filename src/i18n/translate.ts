import { en } from './locales/en'
import { pt, type Messages } from './locales/pt'

export type Locale = 'pt' | 'en'
export type LocalePreference = 'auto' | Locale

const dictionaries: Record<Locale, Messages> = { pt, en: en as Messages }

export function detectDeviceLocale(): Locale {
  if (typeof navigator === 'undefined') return 'pt'
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of langs) {
    const code = raw.split('-')[0]?.toLowerCase()
    if (code === 'en') return 'en'
    if (code === 'pt') return 'pt'
  }
  return 'pt'
}

export function resolveLocale(preference: LocalePreference): Locale {
  if (preference === 'auto') return detectDeviceLocale()
  return preference
}

function getByPath(tree: Messages, path: string): string | undefined {
  const parts = path.split('.')
  let node: unknown = tree
  for (const part of parts) {
    if (node == null || typeof node !== 'object') return undefined
    node = (node as Record<string, unknown>)[part]
  }
  return typeof node === 'string' ? node : undefined
}

export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>,
): string {
  const template =
    getByPath(dictionaries[locale], key) ?? getByPath(dictionaries.pt, key) ?? key
  if (!params) return template
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const value = params[name]
    return value != null ? String(value) : ''
  })
}
