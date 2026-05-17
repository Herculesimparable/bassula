import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BASSULA_TAGLINE } from '../data/brand'

/** Hero só com texto — imagem Bassula fica no carrossel promocional */
export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero hero--bassula hero--text-only" aria-label="Destaque principal">
      <motion.div
        className="container hero-content hero-content--solo"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="hero-tag hero-tag--bassula">Bassula nos Preços</span>
        <h1>Quem faz Bassula derruba preços</h1>
        <p className="hero-lead">{BASSULA_TAGLINE}</p>
        <p>
          Compare Kero, Candando, Shoprite e mais. Arroz, óleo, feijão e tudo o que precisa — o mais
          barato em cada loja.
        </p>
        <div className="hero-actions">
          <Link to="/ofertas" className="btn btn-primary btn-bassula-cta">
            Ver preços em queda <ArrowRight size={18} />
          </Link>
          <Link to="/mais-vendidos" className="btn btn-outline hero-btn-outline">
            Mais vendidos
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
