import type { LocalePreference } from './translate'

const PREF_KEY = 'bassula-locale'
const MANUAL_KEY = 'bassula-locale-manual'

/** Preferência guardada: só pt/en fixos se o utilizador escolheu manualmente; caso contrário auto. */
export function loadLocalePreference(): LocalePreference {
  try {
    const manual = localStorage.getItem(MANUAL_KEY) === '1'
    const saved = localStorage.getItem(PREF_KEY)
    if (manual && (saved === 'pt' || saved === 'en')) return saved
  } catch {
    /* ignore */
  }
  return 'auto'
}

export function saveLocalePreference(pref: LocalePreference): void {
  try {
    localStorage.setItem(PREF_KEY, pref)
    if (pref === 'auto') localStorage.removeItem(MANUAL_KEY)
    else localStorage.setItem(MANUAL_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function isManualLocaleChoice(): boolean {
  try {
    return localStorage.getItem(MANUAL_KEY) === '1'
  } catch {
    return false
  }
}
