import { Check, Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../context/LocaleContext'
import type { LocalePreference } from '../i18n/translate'

const OPTIONS: { value: LocalePreference; labelKey: string }[] = [
  { value: 'auto', labelKey: 'lang.auto' },
  { value: 'pt', labelKey: 'lang.pt' },
  { value: 'en', labelKey: 'lang.en' },
]

interface Props {
  /** Barra superior escura ou cabeçalho vermelho / menu móvel */
  variant?: 'utility' | 'header' | 'drawer'
}

export function LanguageSelect({ variant = 'utility' }: Props) {
  const { t, preference, setPreference } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const shortLabel =
    preference === 'auto' ? t('lang.shortAuto') : preference === 'pt' ? 'PT' : 'EN'

  const pick = (value: LocalePreference) => {
    setPreference(value)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`lang-btn-wrap lang-btn-wrap--${variant}`}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('lang.label')}
        title={t('lang.label')}
      >
        <Globe size={variant === 'drawer' ? 20 : 16} aria-hidden />
        <span className="lang-btn__label">{t('lang.button')}</span>
        <span className="lang-btn__code" aria-hidden>
          {shortLabel}
        </span>
      </button>
      {open && (
        <ul className="lang-btn-menu" role="listbox" aria-label={t('lang.label')}>
          {OPTIONS.map((opt) => {
            const active = preference === opt.value
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`lang-btn-menu__item${active ? ' is-active' : ''}`}
                  onClick={() => pick(opt.value)}
                >
                  <span className="lang-btn-menu__check" aria-hidden>
                    {active ? <Check size={16} strokeWidth={2.5} /> : null}
                  </span>
                  <span>{t(opt.labelKey)}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
