import type { ReactNode } from 'react'
import { BackButton } from '../components/BackButton'

interface Props {
  title: string
  children: ReactNode
}

export function StaticPage({ title, children }: Props) {
  return (
    <main className="page-static">
      <div className="container container-narrow">
        <BackButton />
        <h1 className="page-title">{title}</h1>
        <div className="static-content">{children}</div>
      </div>
    </main>
  )
}
