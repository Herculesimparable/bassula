import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { tr } from '../i18n/runtime'
import { Button } from './ui/Button'

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
    return { hasError: true, message: error.message || tr('error.unexpected') }
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
            <h1>{tr('error.title')}</h1>
            <p>{tr('error.body')}</p>
            {import.meta.env.DEV && this.state.message && (
              <pre className="error-boundary-detail">{this.state.message}</pre>
            )}
            <div className="error-boundary-actions">
              <Button type="button" variant="primary" animated onClick={this.handleRetry}>
                <RefreshCw size={18} />
                {tr('error.retry')}
              </Button>
              <Button to="/" variant="outline" onClick={this.handleRetry}>
                {tr('error.home')}
              </Button>
            </div>
          </article>
        </section>
      )
    }

    return this.props.children
  }
}
