import { Link } from 'react-router-dom'
import { LegalDocument } from '../components/LegalDocument'
import { useTranslation } from '../context/LocaleContext'

export function TermsPage() {
  const { t } = useTranslation()
  const L = (k: string) => t(`legal.terms.${k}` as 'legal.terms.title')

  return (
    <LegalDocument
      title={L('title')}
      updated={L('updated')}
      intro={L('intro')}
      relatedTitle={t('legal.relatedTitle')}
      related={[
        { label: t('legal.privacy.link'), to: '/privacidade' },
        { label: t('legal.security.link'), to: '/seguranca' },
      ]}
      sections={[
        { title: L('s1Title'), body: <p>{L('s1p1')}</p> },
        { title: L('s2Title'), body: <p>{L('s2p1')}</p> },
        { title: L('s3Title'), body: <p>{L('s3p1')}</p> },
        {
          title: L('s4Title'),
          body: (
            <p>
              {L('s4p1')}{' '}
              <Link to="/privacidade">{t('legal.privacy.link')}</Link>.
            </p>
          ),
        },
        { title: L('s5Title'), body: <p>{L('s5p1')}</p> },
      ]}
    />
  )
}
