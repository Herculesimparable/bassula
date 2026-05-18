import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

function scrollKey(pathname: string, search: string) {
  return `bassula-scroll:${pathname}${search}`
}

export function ScrollRestoration() {
  const { pathname, search } = useLocation()
  const navigationType = useNavigationType()
  const savedOnLeave = useRef(false)

  useLayoutEffect(() => {
    const key = scrollKey(pathname, search)

    if (navigationType === 'POP') {
      const saved = sessionStorage.getItem(key)
      if (saved != null) {
        const y = parseInt(saved, 10)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => window.scrollTo(0, y))
        })
      }
    } else {
      window.scrollTo(0, 0)
    }
    savedOnLeave.current = false
  }, [pathname, search, navigationType])

  useLayoutEffect(() => {
    const key = scrollKey(pathname, search)

    const save = () => {
      sessionStorage.setItem(key, String(window.scrollY))
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (anchor.target === '_blank') return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:'))
        return
      try {
        const url = new URL(anchor.href, window.location.origin)
        if (url.origin !== window.location.origin) return
        if (url.pathname === pathname && url.search === search) return
        save()
      } catch {
        /* ignore */
      }
    }

    window.addEventListener('scroll', save, { passive: true })
    document.addEventListener('click', onClick, true)

    return () => {
      save()
      window.removeEventListener('scroll', save)
      document.removeEventListener('click', onClick, true)
    }
  }, [pathname, search])

  return null
}
