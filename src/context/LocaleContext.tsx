import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  documentLangTag,
  resolveLocale,
  translate,
  type Locale,
  type LocalePreference,
} from '../i18n/translate'
import { loadLocalePreference, saveLocalePreference } from '../i18n/localeStorage'
import { refreshAutoLocale, syncI18nRuntime } from '../i18n/runtime'

interface LocaleState {
  preference: LocalePreference
  locale: Locale
  setPreference: (pref: LocalePreference) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleState | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<LocalePreference>(loadLocalePreference)
  const [locale, setLocale] = useState<Locale>(() => resolveLocale(loadLocalePreference()))

  useEffect(() => {
    syncI18nRuntime(preference)
    setLocale(resolveLocale(preference))
  }, [preference])

  useEffect(() => {
    document.documentElement.lang = documentLangTag(locale)
    document.title = translate(locale, 'meta.title')
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', translate(locale, 'meta.description'))
  }, [locale])

  useEffect(() => {
    if (preference !== 'auto') return
    const syncFromDevice = () => {
      refreshAutoLocale()
      setLocale(resolveLocale('auto'))
    }
    syncFromDevice()
    const onVisible = () => {
      if (document.visibilityState === 'visible') syncFromDevice()
    }
    window.addEventListener('languagechange', syncFromDevice)
    window.addEventListener('focus', syncFromDevice)
    window.addEventListener('pageshow', syncFromDevice)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('languagechange', syncFromDevice)
      window.removeEventListener('focus', syncFromDevice)
      window.removeEventListener('pageshow', syncFromDevice)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [preference])

  const setPreference = useCallback((pref: LocalePreference) => {
    setPreferenceState(pref)
    saveLocalePreference(pref)
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => translate(locale, key, params),
    [locale],
  )

  const value = useMemo(
    () => ({ preference, locale, setPreference, t }),
    [preference, locale, setPreference, t],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export function useTranslation() {
  const { t, locale, preference, setPreference } = useLocale()
  return { t, locale, preference, setPreference }
}
