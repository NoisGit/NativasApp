import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop () {
  const { pathname, state } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (state?.section) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(state.section)

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })

      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, state])

  return null
}
