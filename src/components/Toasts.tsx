import { useApp } from '../context/AppContext'

export function Toasts() {
  const { toasts } = useApp()

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`} role="status">
          {t.message}
        </div>
      ))}
    </div>
  )
}
