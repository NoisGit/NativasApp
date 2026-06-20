import logo from '../../assets/brand/nativas-logo-primary.webp'
import { ApplicationForm } from '../components/ApplicationForm'
import { usePageMeta } from '../hooks/usePageMeta'

export function ApplicationPage () {
  usePageMeta('Postula | Nativas Roller Derby', 'Formulario de postulación frontend para Nativas Roller Derby en Temuco.')

  return (
    <section className='application-page'>
      <aside className='application-aside'>
        <img src={logo} alt='Nativas Roller Derby' width='722' height='790' />
        <h2>Postulación sin base de datos propia.</h2>
        <p>El envío se realiza mediante un endpoint público configurable. Si no está configurado, el sitio no simula éxito.</p>
      </aside>
      <ApplicationForm />
    </section>
  )
}
