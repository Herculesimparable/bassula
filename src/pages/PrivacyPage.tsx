import { Link } from 'react-router-dom'
import { LegalDocument } from '../components/LegalDocument'
import { SITE_URL } from '../config/site'
import { useTranslation } from '../context/LocaleContext'

export function PrivacyPage() {
  const { t } = useTranslation()
  const p = (k: string) => t(`legal.privacy.${k}` as 'legal.privacy.title')

  return (
    <LegalDocument
      title={p('title')}
      updated={p('updated')}
      intro={p('intro')}
      relatedTitle={t('legal.relatedTitle')}
      related={[
        { label: t('legal.security.link'), to: '/seguranca' },
        { label: t('legal.terms.link'), to: '/termos' },
      ]}
      sections={[
        {
          title: p('s1Title'),
          body: (
            <>
              <p>{p('s1p1')}</p>
              <p>
                <strong>{p('s1p2')}</strong>
              </p>
            </>
          ),
        },
        {
          title: p('s2Title'),
          body: (
            <ul>
              <li>{p('s2i1')}</li>
              <li>{p('s2i2')}</li>
              <li>{p('s2i3')}</li>
              <li>{p('s2i4')}</li>
              <li>{p('s2i5')}</li>
            </ul>
          ),
        },
        { title: p('s3Title'), body: <p>{p('s3p1')}</p> },
        {
          title: p('s4Title'),
          body: (
            <>
              <p id="cookies">{p('s4p1')}</p>
              <p>{p('s4p2')}</p>
            </>
          ),
        },
        {
          title: p('s5Title'),
          body: (
            <ul>
              <li>{p('s5i1')}</li>
              <li>{p('s5i2')}</li>
              <li>{p('s5i3')}</li>
            </ul>
          ),
        },
        {
          title: p('s6Title'),
          body: (
            <p>
              {p('s6p1')}{' '}
              <Link to="/contacto">{t('footer.support')}</Link> · {SITE_URL}
            </p>
          ),
        },
      ]}
    />
  )
}
