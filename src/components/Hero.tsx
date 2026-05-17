import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from '../context/LocaleContext'

/** Hero só com texto — imagem Bassula fica no carrossel promocional */
export function Hero() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero hero--bassula hero--text-only" aria-label="Destaque principal">
      <motion.div
        className="container hero-content hero-content--solo"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="hero-tag hero-tag--bassula">{t('hero.tag')}</span>
        <h1>{t('hero.title')}</h1>
        <p className="hero-lead">{t('brand.tagline')}</p>
        <p>{t('hero.body')}</p>
        <div className="hero-actions">
          <Link to="/ofertas" className="btn btn-primary btn-bassula-cta">
            {t('hero.ctaOffers')} <ArrowRight size={18} />
          </Link>
          <Link to="/mais-vendidos" className="btn btn-outline hero-btn-outline">
            {t('hero.ctaTop')}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
