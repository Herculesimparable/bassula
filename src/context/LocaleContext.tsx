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
import { refreshAutoLocale, syncI18nRuntime } from '../i18n/runtime'

const STORAGE_KEY = 'bassula-locale'

interface LocaleState {
  preference: LocalePreference
  locale: Locale
  setPreference: (pref: LocalePreference) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleState | null>(null)

function loadPreference(): LocalePreference {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'auto' || saved === 'pt' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  return 'auto'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<LocalePreference>(loadPreference)
  const [locale, setLocale] = useState<Locale>(() => resolveLocale(loadPreference()))

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
    window.addEventListener('languagechange', syncFromDevice)
    return () => window.removeEventListener('languagechange', syncFromDevice)
  }, [preference])

  const setPreference = useCallback((pref: LocalePreference) => {
    setPreferenceState(pref)
    localStorage.setItem(STORAGE_KEY, pref)
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
