import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../context/LocaleContext'

export function BackButton({ label }: { label?: string }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const text = label ?? t('common.back')

  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
      aria-label={text}
    >
      <ArrowLeft size={18} />
      {text}
    </button>
  )
}
