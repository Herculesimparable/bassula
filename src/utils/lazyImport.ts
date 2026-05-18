import { lazy, type LazyExoticComponent } from 'react'
import type { ProductDetailPage } from '../pages/ProductDetailPage'

/** Recarrega a página uma vez se o chunk lazy falhar (cache antigo após deploy). */
export function lazyImport(
  loader: () => Promise<{ default: typeof ProductDetailPage }>,
): LazyExoticComponent<typeof ProductDetailPage> {
  return lazy(() =>
    loader().catch((err) => {
      const key = 'bassula-chunk-reload'
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1')
        window.location.reload()
      } else {
        sessionStorage.removeItem(key)
      }
      throw err
    }),
  )
}
