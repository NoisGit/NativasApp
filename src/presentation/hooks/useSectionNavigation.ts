import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function prefersReducedMotion () {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSection (sectionId: string, attempts = 12) {
  window.requestAnimationFrame(() => {
    const section = document.getElementById(sectionId)

    if (!section) {
      if (attempts > 0) window.setTimeout(() => scrollToSection(sectionId, attempts - 1), 50)
      return
    }

    section.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    })
  })
}

export function useSectionNavigation () {
  const location = useLocation()
  const navigate = useNavigate()

  return useCallback((sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => scrollToSection(sectionId), 80)
      return
    }

    scrollToSection(sectionId)
  }, [location.pathname, navigate])
}
