import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export function SiteLayout () {
  return (
    <>
      <a className='skip-link' href='#contenido'>Saltar al contenido</a>
      <Header />
      <main id='contenido'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
