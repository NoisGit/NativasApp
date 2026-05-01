import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop () {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const section = params.get('section')

    if (section) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(section)

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })

      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search])

  return null
}
