import { Link } from 'react-router-dom'
import { LegalDocument } from '../components/LegalDocument'
import { useTranslation } from '../context/LocaleContext'

export function SecurityPage() {
  const { t } = useTranslation()
  const s = (k: string) => t(`legal.security.${k}` as 'legal.security.title')

  return (
    <LegalDocument
      title={s('title')}
      updated={s('updated')}
      intro={s('intro')}
      relatedTitle={t('legal.relatedTitle')}
      related={[
        { label: t('legal.privacy.link'), to: '/privacidade' },
        { label: t('legal.terms.link'), to: '/termos' },
      ]}
      sections={[
        {
          title: s('s1Title'),
          body: (
            <ul>
              <li>{s('s1i1')}</li>
              <li>{s('s1i2')}</li>
              <li>{s('s1i3')}</li>
              <li>{s('s1i4')}</li>
            </ul>
          ),
        },
        { title: s('s2Title'), body: <p>{s('s2p1')}</p> },
        {
          title: s('s3Title'),
          body: (
            <ul>
              <li>{s('s3i1')}</li>
              <li>{s('s3i2')}</li>
              <li>{s('s3i3')}</li>
            </ul>
          ),
        },
        {
          title: s('s4Title'),
          body: (
            <p>
              {s('s4p1')}{' '}
              <a href="mailto:contacto@bassula.ao">contacto@bassula.ao</a>
            </p>
          ),
        },
        {
          title: s('s5Title'),
          body: (
            <p>
              <Link to="/privacidade">{t('legal.privacy.link')}</Link>
            </p>
          ),
        },
      ]}
    />
  )
}
