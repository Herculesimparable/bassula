import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

function scrollKey(pathname: string, search: string) {
  return `bassula-scroll:${pathname}${search}`
}

export function ScrollRestoration() {
  const { pathname, search } = useLocation()
  const navigationType = useNavigationType()
  const isPop = useRef(false)

  useLayoutEffect(() => {
    isPop.current = navigationType === 'POP'
  }, [navigationType])

  useLayoutEffect(() => {
    const key = scrollKey(pathname, search)

    if (navigationType === 'POP') {
      const saved = sessionStorage.getItem(key)
      if (saved != null) {
        const y = parseInt(saved, 10)
        requestAnimationFrame(() => window.scrollTo(0, y))
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, search, navigationType])

  useLayoutEffect(() => {
    const key = scrollKey(pathname, search)
    return () => {
      sessionStorage.setItem(key, String(window.scrollY))
    }
  }, [pathname, search])

  return null
}
