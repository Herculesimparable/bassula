import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from './ui/Button'
import { useTranslation } from '../context/LocaleContext'
import { publicAsset } from '../utils/publicAsset'

const HERO_PADARIA_IMAGE = publicAsset('images/hero/padaria-hero.png')

export function Hero() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero hero--bassula" aria-label={t('aria.hero')}>
      <motion.div
        className="container hero-grid hero-grid--bassula"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="hero-content"
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-tag hero-tag--bassula">{t('hero.tag')}</span>
          <h1>{t('hero.title')}</h1>
          <p className="hero-lead">{t('brand.tagline')}</p>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <p>{t('hero.body')}</p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button to="/ofertas" variant="primary" animated className="btn-bassula-cta">
              {t('hero.ctaOffers')} <ArrowRight size={18} />
            </Button>
            <Button to="/mais-vendidos" variant="outline" className="hero-btn-outline">
              {t('hero.ctaTop')}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-bassula-visual"
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero-image"
            initial={reduceMotion ? false : { scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={HERO_PADARIA_IMAGE}
              alt={t('hero.imageAlt')}
              width={560}
              height={420}
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
