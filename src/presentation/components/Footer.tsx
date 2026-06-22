import {
  ArrowUpRight,
  CalendarDays,
  CircleHelp,
  Dumbbell,
  Home,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteMedia } from '../../infrastructure/content/siteMedia'
import { siteConfig } from '../../shared/config/siteConfig'
import { InstagramGlyph } from './InstagramGlyph'
import { useSectionNavigation } from '../hooks/useSectionNavigation'

const footerSections = [
  { label: 'Inicio', hash: 'inicio', icon: Home },
  { label: 'Nativas', hash: 'nativas', icon: Sparkles },
  { label: 'Roller Derby', hash: 'roller-derby', icon: Dumbbell },
  { label: 'Entrenamientos', hash: 'entrenamientos', icon: CalendarDays },
  { label: 'Preguntas', hash: 'preguntas', icon: CircleHelp }
] satisfies Array<{ label: string, hash: string, icon: LucideIcon }>

export function Footer () {
  const goToSection = useSectionNavigation()

  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <div className='footer__brand'>
          <img src={siteMedia.logoFooter} alt='Nativas Roller Derby' width='640' height='180' />
          <p className='footer__tagline'>Reclutamiento, entrenamiento y comunidad roller derby.</p>
          <p className='footer__location'><MapPin size={16} aria-hidden='true' /> {siteConfig.location}</p>
          <p className='footer__copy'>© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>

        <div className='footer__links'>
          <nav className='footer__column' aria-label='Secciones del sitio'>
            <h3>Secciones</h3>
            <div className='footer__items footer__items--sections'>
              {footerSections.map((section) => {
                const Icon = section.icon
                return (
                  <button key={section.hash} type='button' onClick={() => goToSection(section.hash)}>
                    <span className='footer__icon'><Icon size={15} aria-hidden='true' /></span>
                    <span>{section.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          <nav className='footer__column' aria-label='Enlaces principales'>
            <h3>Conecta</h3>
            <div className='footer__items footer__items--connect'>
              <Link to='/postular'><span className='footer__icon'><Send size={15} aria-hidden='true' /></span><span>Postula</span></Link>
              <Link to='/privacidad'><span className='footer__icon'><ShieldCheck size={15} aria-hidden='true' /></span><span>Privacidad</span></Link>
              <a href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer'>
                <span className='footer__icon'><InstagramGlyph size={15} /></span>
                <span>Instagram</span>
                <ArrowUpRight className='footer__external' size={14} aria-hidden='true' />
              </a>
            </div>
          </nav>
        </div>

      </div>
    </footer>
  )
}
