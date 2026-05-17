import { useTranslation } from '../context/LocaleContext'
import type { LocalePreference } from '../i18n/translate'

const OPTIONS: { value: LocalePreference; labelKey: string }[] = [
  { value: 'auto', labelKey: 'lang.auto' },
  { value: 'pt', labelKey: 'lang.pt' },
  { value: 'en', labelKey: 'lang.en' },
]

export function LanguageSelect() {
  const { t, preference, setPreference } = useTranslation()

  return (
    <label className="language-select">
      <span className="sr-only">{t('lang.label')}</span>
      <select
        value={preference}
        onChange={(e) => setPreference(e.target.value as LocalePreference)}
        aria-label={t('lang.label')}
        title={t('lang.label')}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(opt.labelKey)}
          </option>
        ))}
      </select>
    </label>
  )
}
