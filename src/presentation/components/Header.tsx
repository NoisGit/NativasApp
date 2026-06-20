import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteMedia } from '../../infrastructure/content/siteMedia'
import { siteConfig } from '../../shared/config/siteConfig'
import { useSectionNavigation } from '../hooks/useSectionNavigation'

export function Header () {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const menuId = useId()
  const location = useLocation()
  const goToSection = useSectionNavigation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      if (location.pathname !== '/') return

      const current = siteConfig.navigation
        .map((item) => document.getElementById(item.hash))
        .filter(Boolean)
        .reduce((closest, section) => {
          if (!section) return closest
          const distance = Math.abs(section.getBoundingClientRect().top - 120)
          if (!closest || distance < closest.distance) return { id: section.id, distance }
          return closest
        }, null as null | { id: string, distance: number })

      if (current) setActiveSection(current.id)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const goTo = (hash: string) => {
    setOpen(false)
    goToSection(hash)
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className='site-header__inner'>
        <button className='brand-link' onClick={() => goTo('inicio')} aria-label='Ir al inicio'>
          <img src={siteMedia.logoHeader} alt='Nativas Roller Derby' width='716' height='341' />
        </button>

        <nav className='desktop-nav' aria-label='Navegación principal'>
          {siteConfig.navigation.map((item) => (
            <button
              key={item.hash}
              className={activeSection === item.hash && location.pathname === '/' ? 'is-active' : ''}
              aria-current={activeSection === item.hash && location.pathname === '/' ? 'page' : undefined}
              onClick={() => goTo(item.hash)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Link className='button button--small button--primary desktop-cta' to='/postular'>Postula</Link>

        <button
          className='icon-button mobile-menu-button'
          type='button'
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden='true' /> : <Menu aria-hidden='true' />}
        </button>
      </div>

      <nav id={menuId} className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label='Navegación móvil'>
        {siteConfig.navigation.map((item) => (
          <button key={item.hash} onClick={() => goTo(item.hash)}>{item.label}</button>
        ))}
        <Link className='button button--primary' to='/postular' onClick={() => setOpen(false)}>Postula</Link>
      </nav>
    </header>
  )
}
