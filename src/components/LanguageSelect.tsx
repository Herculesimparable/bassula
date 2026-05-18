import { Globe } from 'lucide-react'
import { useTranslation } from '../context/LocaleContext'
import type { LocalePreference } from '../i18n/translate'

interface Props {
  variant?: 'utility' | 'header' | 'drawer'
}

export function LanguageSelect({ variant = 'utility' }: Props) {
  const { t, preference, setPreference } = useTranslation()

  return (
    <label className={`lang-select lang-select--${variant}`}>
      <Globe size={14} className="lang-select__icon" aria-hidden />
      <select
        className="lang-select__field"
        value={preference}
        onChange={(e) => setPreference(e.target.value as LocalePreference)}
        aria-label={t('lang.label')}
        title={t('lang.label')}
      >
        <option value="auto">{t('lang.shortAuto')}</option>
        <option value="pt">PT</option>
        <option value="en">EN</option>
      </select>
    </label>
  )
}
