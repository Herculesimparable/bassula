import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Erro inesperado' }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Bassula]', error, info.componentStack)
  }

  handleRetry = () => {
    this.setState({ hasError: false, message: '' })
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary" role="alert">
          <article className="error-boundary-card">
            <AlertTriangle size={48} className="error-boundary-icon" aria-hidden />
            <h1>Algo correu mal</h1>
            <p>A Bassula recuperou-se. Pode tentar de novo ou voltar ao inicio.</p>
            {import.meta.env.DEV && this.state.message && (
              <pre className="error-boundary-detail">{this.state.message}</pre>
            )}
            <div className="error-boundary-actions">
              <button type="button" className="btn-primary" onClick={this.handleRetry}>
                <RefreshCw size={18} />
                Tentar novamente
              </button>
              <Link to="/" className="btn-outline" onClick={this.handleRetry}>
                Ir ao inicio
              </Link>
            </div>
          </article>
        </section>
      )
    }

    return this.props.children
  }
}
