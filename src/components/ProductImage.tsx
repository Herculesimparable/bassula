import { useCallback, useEffect, useState } from 'react'
import {
  PLACEHOLDER_IMAGE,
  productImageFallbacks,
} from '../data/images'

interface Props {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  /** Para cadeia de fallback se a URL principal falhar */
  productId?: string
  category?: string
  /** URLs alternativas (ex.: categorias sem ficheiro local) */
  fallbacks?: string[]
}

export function ProductImage({
  src,
  alt,
  className,
  loading = 'lazy',
  productId,
  category,
  fallbacks: fallbacksProp,
}: Props) {
  const fallbacks = useCallback(() => {
    if (fallbacksProp?.length) {
      const chain = fallbacksProp
      return chain.includes(src) ? chain : [src, ...chain]
    }
    const chain =
      productId && category
        ? productImageFallbacks(productId, category, alt)
        : [src, PLACEHOLDER_IMAGE]
    if (!chain.includes(src)) return [src, ...chain]
    return chain
  }, [src, alt, productId, category, fallbacksProp])

  const [index, setIndex] = useState(0)
  const urls = fallbacks()
  const current = urls[Math.min(index, urls.length - 1)] ?? PLACEHOLDER_IMAGE

  useEffect(() => {
    setIndex(0)
  }, [src, productId, category])

  const handleError = () => {
    setIndex((i) => (i + 1 < urls.length ? i + 1 : i))
  }

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      draggable={false}
      width={400}
      height={400}
      onError={handleError}
    />
  )
}
