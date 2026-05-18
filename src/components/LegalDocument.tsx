import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { StaticPage } from '../pages/StaticPage'

export interface LegalSection {
  title: string
  body: ReactNode
}

interface Props {
  title: string
  updated: string
  intro: ReactNode
  sections: LegalSection[]
  related?: { label: string; to: string }[]
  relatedTitle?: string
}

export function LegalDocument({ title, updated, intro, sections, related, relatedTitle }: Props) {
  return (
    <StaticPage title={title}>
      <p className="legal-updated">{updated}</p>
      <div className="legal-intro">{intro}</div>
      {sections.map((s) => (
        <section key={s.title} className="legal-section">
          <h2>{s.title}</h2>
          <div>{s.body}</div>
        </section>
      ))}
      {related && related.length > 0 && (
        <nav className="legal-related" aria-label="Documentos relacionados">
          <h2>{relatedTitle ?? 'Documentos relacionados'}</h2>
          <ul>
            {related.map((r) => (
              <li key={r.to}>
                <Link to={r.to}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </StaticPage>
  )
}
