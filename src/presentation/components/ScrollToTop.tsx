import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop () {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}
