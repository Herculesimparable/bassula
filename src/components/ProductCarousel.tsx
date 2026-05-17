import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'

interface Props {
  title: string
  products: Product[]
  id?: string
  variant?: 'default' | 'top-sellers'
  moreLink?: string
  moreLabel?: string
  centered?: boolean
}

export function ProductCarousel({
  title,
  products,
  id,
  variant = 'default',
  moreLink = '/ofertas',
  moreLabel = 'Ver mais ofertas',
  centered = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const isTop = variant === 'top-sellers'

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
    }
  }, [products.length, updateScrollState])

  const scroll = useCallback((dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.product-card')
    const gap = 16
    const step = card ? card.offsetWidth + gap : 216
    const max = Math.max(0, el.scrollWidth - el.clientWidth)
    const next = Math.max(0, Math.min(max, el.scrollLeft + (dir === 'left' ? -step : step)))
    el.scrollTo({ left: next, behavior: 'smooth' })
  }, [])

  if (products.length === 0) return null

  return (
    <section
      className={`section ${isTop ? 'section--top-sellers' : ''} ${centered ? 'section--carousel-centered' : ''}`}
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="container container--carousel">
        <div
          className={`section-header ${isTop ? 'section-header--top' : ''} ${centered ? 'section-header--centered' : ''}`}
        >
          <h2 id={id ? `${id}-title` : undefined}>
            {isTop && <Flame className="section-icon" size={22} aria-hidden />}
            {title}
          </h2>
          {isTop && (
            <p>Os produtos mais procurados em Luanda — compare preços antes de comprar.</p>
          )}
          {isTop && (
            <Link to={moreLink} className="btn btn-outline btn-sm">
              Ver todos
            </Link>
          )}
        </div>
        <div
          className={`carousel-wrap ${isTop ? 'carousel-wrap--top' : ''} ${centered ? 'carousel-wrap--centered' : ''}`}
          role="region"
          aria-label={`Produtos: ${title}`}
        >
          <button
            type="button"
            className="carousel-btn prev"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              scroll('left')
            }}
            disabled={!canPrev}
            aria-label="Ver produtos anteriores"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <div className="carousel-track" ref={trackRef}>
            {products.map((p, index) => (
              <ProductCard
                key={p.id}
                product={p}
                rank={isTop ? index + 1 : undefined}
                badgeVariant={isTop ? 'top' : 'default'}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel-btn next"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              scroll('right')
            }}
            disabled={!canNext}
            aria-label="Ver mais produtos"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
        {!isTop && (
          <div className={`section-footer ${centered ? 'section-footer--centered' : ''}`}>
            <Link to={moreLink} className="btn btn-primary">
              {moreLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
