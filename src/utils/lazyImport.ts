import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

/** Recarrega a página uma vez se um chunk lazy falhar (cache antigo após deploy). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
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
