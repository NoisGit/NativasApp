import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../shared/config/siteConfig'
import { InstagramGlyph } from './InstagramGlyph'
import { useSectionNavigation } from '../hooks/useSectionNavigation'

const footerSections = [
  { label: 'Inicio', hash: 'inicio' },
  { label: 'Nativas', hash: 'nativas' },
  { label: 'Roller Derby', hash: 'roller-derby' },
  { label: 'Entrenamientos', hash: 'entrenamientos' },
  { label: 'Preguntas', hash: 'preguntas' }
]

export function Footer () {
  const goToSection = useSectionNavigation()

  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <div className='footer__brand'>
          <h2>{siteConfig.name}</h2>
          <p>Roller derby, patinaje, estrategia y comunidad desde el sur de Chile.</p>
          <p className='footer__location'><MapPin size={18} aria-hidden='true' /> {siteConfig.location}</p>
        </div>

        <nav className='footer__column' aria-label='Secciones del sitio'>
          <h3>Secciones</h3>
          {footerSections.map((section) => (
            <button key={section.hash} type='button' onClick={() => goToSection(section.hash)}>
              {section.label}
            </button>
          ))}
        </nav>

        <nav className='footer__column' aria-label='Enlaces principales'>
          <h3>Conecta</h3>
          <Link to='/postular'>Postula</Link>
          <Link to='/privacidad'>Privacidad</Link>
          <a href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer'>
            <InstagramGlyph size={18} /> Instagram <ArrowUpRight size={16} aria-hidden='true' />
          </a>
        </nav>

        <p className='footer__copy'>© {new Date().getFullYear()} {siteConfig.name}. Temuco, Chile.</p>
      </div>
    </footer>
  )
}
