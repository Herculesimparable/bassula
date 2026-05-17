import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../context/LocaleContext'
import { publicAsset } from '../utils/publicAsset'

const INTERVAL_MS = 3_000

const SLIDE_CONFIG = [
  {
    id: 'frutas',
    image: publicAsset('promo/promo-frutas.jpg?v=1'),
    bgPosition: 'center center',
    headlineKey: 'promo.frutas.headline',
    sublineKey: 'promo.frutas.subline',
    altKey: 'promo.frutas.subline',
    href: '/alimentos',
    variant: 'frutas',
  },
  {
    id: 'padaria',
    image: publicAsset('promo/promo-padaria.jpg?v=1'),
    bgPosition: 'center 45%',
    headlineKey: 'promo.padaria.headline',
    sublineKey: 'promo.padaria.subline',
    altKey: 'promo.padaria.subline',
    href: '/alimentos?cat=Padaria',
    variant: 'padaria',
  },
  {
    id: 'electro',
    image: publicAsset('promo/promo-electro.jpg?v=1'),
    bgPosition: 'center 35%',
    headlineKey: 'promo.electro.headline',
    sublineKey: 'promo.electro.subline',
    altKey: 'promo.electro.subline',
    href: '/electrodomesticos',
    variant: 'electro',
  },
] as const

export function PromoSlideshow() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  const slides = useMemo(
    () =>
      SLIDE_CONFIG.map((s) => ({
        ...s,
        headline: t(s.headlineKey),
        subline: t(s.sublineKey),
        alt: t(s.altKey),
      })),
    [t],
  )

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slides.length) + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, slides.length])

  const slide = slides[index]

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
                  <span className="promo-slideshow__eyebrow">{t('promo.eyebrow')}</span>
                  <span className="promo-slideshow__headline">{slide.headline}</span>
                  <span className="promo-slideshow__subline">{slide.subline}</span>
                  <span className="promo-slideshow__cta">{t('promo.cta')}</span>
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="promo-slideshow__nav promo-slideshow__nav--prev"
          onClick={() => goTo(index - 1)}
          aria-label={t('promo.prev')}
        >
          <ChevronLeft size={22} aria-hidden />
        </button>
        <button
          type="button"
          className="promo-slideshow__nav promo-slideshow__nav--next"
          onClick={() => goTo(index + 1)}
          aria-label={t('promo.next')}
        >
          <ChevronRight size={22} aria-hidden />
        </button>

        <div className="promo-slideshow__dots" role="tablist" aria-label={t('promo.select')}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              className={`promo-slideshow__dot${i === index ? ' is-active' : ''}`}
              aria-selected={i === index}
              aria-label={t('promo.slideOf', {
                current: i + 1,
                total: slides.length,
                alt: s.headline,
              })}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <span className="sr-only" aria-live="polite">
          {t('promo.slideOf', {
            current: index + 1,
            total: slides.length,
            alt: slide.alt,
          })}
        </span>
      </motion.div>
    </section>
  )
}
