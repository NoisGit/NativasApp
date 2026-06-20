import { Camera } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/brand/nativas-logo-primary.png'
import { siteConfig } from '../../shared/config/siteConfig'

export function Footer () {
  return (
    <footer className='footer'>
      <div className='footer__brand'>
        <img src={logo} alt='Nativas Roller Derby' width='300' height='70' />
        <p>{siteConfig.location}. Roller derby, patinaje, estrategia y comunidad.</p>
      </div>
      <nav aria-label='Enlaces del footer' className='footer__links'>
        <Link to='/'>Inicio</Link>
        <Link to='/postular'>Postula</Link>
        <Link to='/privacidad'>Privacidad</Link>
        <a href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer'>
          <Camera size={18} aria-hidden='true' /> Instagram
        </a>
      </nav>
      <p className='footer__copy'>© {new Date().getFullYear()} {siteConfig.name}. Sitio frontend estático para portfolio.</p>
    </footer>
  )
}
