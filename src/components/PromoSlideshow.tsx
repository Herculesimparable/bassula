import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { publicAsset } from '../utils/publicAsset'

const INTERVAL_MS = 3_000

const SLIDES = [
  {
    id: 'frutas',
    image: publicAsset('promo/promo-frutas.jpg?v=1'),
    bgPosition: 'center center',
    headline: 'Alimentos',
    subline: 'Frutas frescas — compare preços em todas as lojas',
    href: '/alimentos',
    alt: 'Frutas frescas variadas',
    variant: 'frutas',
  },
  {
    id: 'padaria',
    image: publicAsset('promo/promo-padaria.jpg?v=1'),
    bgPosition: 'center 45%',
    headline: 'Padaria',
    subline: 'Pão, bolos e muito mais — o melhor preço perto de si',
    href: '/alimentos?cat=Padaria',
    alt: 'Pão fresco e padaria',
    variant: 'padaria',
  },
  {
    id: 'electro',
    image: publicAsset('promo/promo-electro.jpg?v=1'),
    bgPosition: 'center 35%',
    headline: 'Electrodomésticos',
    subline: 'Cozinha e lar — compare Kero, Candando, Shoprite',
    href: '/electrodomesticos',
    alt: 'Electrodomésticos para casa',
    variant: 'electro',
  },
] as const

export function PromoSlideshow() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion])

  const slide = SLIDES[index]

  return (
    <section
      className="promo-slideshow-section"
      aria-label="Promoções Bassula"
      aria-roledescription="carrossel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <motion.div
        className="promo-slideshow"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="promo-slideshow__viewport" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              className="promo-slideshow__slide"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: 'easeInOut' }}
            >
              <Link
                to={slide.href}
                className={`promo-slideshow__link promo-slideshow__link--${slide.variant}`}
                aria-label={`${slide.headline}. ${slide.subline}`}
              >
                <span
                  className="promo-slideshow__bg"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: slide.bgPosition,
                  }}
                  aria-hidden
                />
                <span className="promo-slideshow__overlay" aria-hidden />
                <span className="promo-slideshow__copy">
                  <span className="promo-slideshow__eyebrow">Bassula</span>
                  <span className="promo-slideshow__headline">{slide.headline}</span>
                  <span className="promo-slideshow__subline">{slide.subline}</span>
                  <span className="promo-slideshow__cta">Ver agora →</span>
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="promo-slideshow__nav promo-slideshow__nav--prev"
          onClick={() => goTo(index - 1)}
          aria-label="Promoção anterior"
        >
          <ChevronLeft size={22} aria-hidden />
        </button>
        <button
          type="button"
          className="promo-slideshow__nav promo-slideshow__nav--next"
          onClick={() => goTo(index + 1)}
          aria-label="Promoção seguinte"
        >
          <ChevronRight size={22} aria-hidden />
        </button>

        <div className="promo-slideshow__dots" role="tablist" aria-label="Selecionar promoção">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              className={`promo-slideshow__dot${i === index ? ' is-active' : ''}`}
              aria-selected={i === index}
              aria-label={`${s.headline}, promoção ${i + 1} de ${SLIDES.length}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <span className="sr-only" aria-live="polite">
          Promoção {index + 1} de {SLIDES.length}: {slide.alt}
        </span>
      </motion.div>
    </section>
  )
}
