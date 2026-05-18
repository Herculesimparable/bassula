import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from './ui/Button'
import { HeroFuturisticVisual } from './HeroFuturisticVisual'
import { useTranslation } from '../context/LocaleContext'

export function Hero() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero hero--bassula hero--with-fx" aria-label={t('aria.hero')}>
      <div className="container hero-split">
        <motion.div
          className="hero-content hero-content--split"
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button to="/ofertas" variant="primary" animated className="btn-bassula-cta">
              {t('hero.ctaOffers')} <ArrowRight size={18} />
            </Button>
            <Button to="/mais-vendidos" variant="outline" className="hero-btn-outline">
              {t('hero.ctaTop')}
            </Button>
          </motion.div>
        </motion.div>

        <HeroFuturisticVisual />
      </div>
    </section>
  )
}
