import { Camera } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../shared/config/siteConfig'

export function Footer () {
  return (
    <footer className='footer'>
      <div className='footer__brand'>
        <h2>{siteConfig.name}</h2>
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
      <p className='footer__copy'>© {new Date().getFullYear()} {siteConfig.name}. Temuco, Chile.</p>
    </footer>
  )
}
