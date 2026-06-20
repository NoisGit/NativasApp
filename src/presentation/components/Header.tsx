import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/brand/nativas-logo-symbol.webp'
import { siteConfig } from '../../shared/config/siteConfig'

function scrollToSection (hash: string) {
  window.requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

export function Header () {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const goTo = (hash: string) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => scrollToSection(hash), 80)
      return
    }
    scrollToSection(hash)
  }

  return (
    <header className='site-header'>
      <div className='site-header__inner'>
        <button className='brand-link' onClick={() => goTo('inicio')} aria-label='Ir al inicio'>
          <img src={logo} alt='Nativas Roller Derby' width='620' height='655' />
        </button>

        <nav className='desktop-nav' aria-label='Navegación principal'>
          {siteConfig.navigation.map((item) => (
            <button key={item.hash} onClick={() => goTo(item.hash)}>{item.label}</button>
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
