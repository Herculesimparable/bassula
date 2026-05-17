import { en } from './locales/en'
import { pt, type Messages } from './locales/pt'

export type Locale = 'pt' | 'en'
export type LocalePreference = 'auto' | Locale

const dictionaries: Record<Locale, Messages> = { pt, en: en as Messages }

/** Primary language codes from the browser (pt before en = Portuguese device wins). */
function browserLanguageCodes(): string[] {
  if (typeof navigator === 'undefined') return ['pt']
  const raw =
    navigator.languages?.length > 0
      ? navigator.languages
      : [navigator.language || 'pt']
  return raw
    .map((tag) => tag?.split('-')[0]?.toLowerCase())
    .filter((code): code is string => !!code)
}

export function detectDeviceLocale(): Locale {
  const codes = browserLanguageCodes()
  if (codes.some((code) => code === 'pt')) return 'pt'
  if (codes.some((code) => code === 'en')) return 'en'
  // Other device languages (es, fr, …): English UI is closer than Portuguese
  return 'en'
}

export function documentLangTag(locale: Locale): string {
  return locale === 'pt' ? 'pt-AO' : 'en'
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
