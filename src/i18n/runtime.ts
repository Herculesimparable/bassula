import { detectDeviceLocale, resolveLocale, translate, type Locale, type LocalePreference } from './translate'

let effectiveLocale: Locale = 'pt'
let preference: LocalePreference = 'auto'

export function syncI18nRuntime(pref: LocalePreference) {
  preference = pref
  effectiveLocale = resolveLocale(pref)
}

export function getEffectiveLocale(): Locale {
  return effectiveLocale
}

export function getLocalePreference(): LocalePreference {
  return preference
}

export function tr(key: string, params?: Record<string, string | number>): string {
  return translate(effectiveLocale, key, params)
}

/** Re-detect when preference is auto (e.g. on mount). */
export function refreshAutoLocale() {
  if (preference === 'auto') {
    effectiveLocale = detectDeviceLocale()
  }
}
