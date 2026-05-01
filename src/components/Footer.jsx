import { FaInstagram } from 'react-icons/fa'

const instagramUrl = 'https://www.instagram.com/nativas_rollerderby?igsh=MW84Mm5nbm5tN2ZvcA=='

export const Footer = () => {
  return (
    <footer className='border-t border-nativas-border bg-nativas-night px-4 py-10 text-nativas-mist sm:px-6 lg:px-8'>
      <div className='mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.3em] text-nativas-turquoise'>Nativas Roller Derby</p>
          <p className='mt-4 max-w-2xl leading-7'>
            Equipo de roller derby de Temuco. Entrenamos con fortaleza, concentración y conexión, construyendo comunidad dentro y fuera de la pista.
          </p>
        </div>

        <div className='flex flex-col gap-5 md:items-end'>
          <nav className='flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold'>
            <a href='#about' className='transition hover:text-white'>Equipo</a>
            <a href='#training' className='transition hover:text-white'>Entrenamientos</a>
            <a href='#faq' className='transition hover:text-white'>FAQ</a>
            <a href='#apply' className='transition hover:text-white'>Postulación</a>
          </nav>

          <a
            href={instagramUrl}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-3 rounded-full border border-nativas-turquoise/40 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-nativas-turquoise/10 hover:text-nativas-turquoise'
            aria-label='Abrir Instagram de Nativas Roller Derby'
          >
            <FaInstagram className='text-xl' />
            Instagram
          </a>
        </div>
      </div>

      <div className='mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-nativas-border pt-6 text-xs text-nativas-mist/80 sm:flex-row sm:items-center sm:justify-between'>
        <p>© {new Date().getFullYear()} Nativas Roller Derby.</p>
        <p>Landing MVP desarrollada para reclutamiento y comunidad.</p>
      </div>
    </footer>
  )
}
