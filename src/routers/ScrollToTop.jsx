import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop () {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(hash)

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })

      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [hash, pathname])

  return null
}
