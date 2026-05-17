import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function BackButton({ label = 'Voltar' }: { label?: string }) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
      aria-label={label}
    >
      <ArrowLeft size={18} />
      {label}
    </button>
  )
}
