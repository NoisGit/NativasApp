import { Link } from 'react-router-dom'
import { FaInstagram } from 'react-icons/fa'

const instagramUrl = 'https://www.instagram.com/nativas_rollerderby?igsh=MW84Mm5nbm5tN2ZvcA=='

export const Footer = () => {
  return (
    <footer className='border-t border-nativas-border bg-nativas-night px-4 py-7 text-nativas-mist sm:px-6 lg:px-8'>
      <div className='mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.28em] text-nativas-turquoise'>Nativas Roller Derby</p>
          <p className='mt-2 max-w-xl text-sm leading-6'>
            Equipo de roller derby de Temuco. Fortaleza, concentración y conexión dentro y fuera de la pista.
          </p>
        </div>

        <div className='flex flex-col gap-4 md:items-end'>
          <nav className='flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold'>
            <Link to='/#about' className='transition hover:text-white'>Equipo</Link>
            <Link to='/#training' className='transition hover:text-white'>Entrenamientos</Link>
            <Link to='/#faq' className='transition hover:text-white'>FAQ</Link>
            <Link to='/#apply' className='transition hover:text-white'>Postulación</Link>
          </nav>

          <a
            href={instagramUrl}
            target='_blank'
            rel='noreferrer'
            className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-nativas-turquoise/40 bg-white/5 text-white transition hover:bg-nativas-turquoise/10 hover:text-nativas-turquoise'
            aria-label='Abrir Instagram de Nativas Roller Derby'
          >
            <FaInstagram className='text-lg' />
          </a>
        </div>
      </div>

      <div className='mx-auto mt-5 flex max-w-7xl flex-col gap-2 border-t border-nativas-border pt-4 text-xs text-nativas-mist/70 sm:flex-row sm:items-center sm:justify-between'>
        <p>© {new Date().getFullYear()} Nativas Roller Derby.</p>
        <p>Landing MVP para reclutamiento y comunidad.</p>
      </div>
    </footer>
  )
}
