import { Link } from 'react-router-dom'
import logo from '../../assets/brand/nativas-logo-primary.png'
import { siteConfig } from '../../shared/config/siteConfig'
import { usePageMeta } from '../hooks/usePageMeta'

export function PrivacyPage () {
  usePageMeta('Privacidad | Nativas Roller Derby', 'Política de privacidad para el formulario de postulación de Nativas Roller Derby.')

  return (
    <section className='legal-page'>
      <img src={logo} alt='Nativas Roller Derby' width='300' height='70' />
      <h1>Privacidad</h1>
      <p>Este sitio solicita datos para gestionar una postulación a Nativas Roller Derby: nombre, correo, teléfono, fecha de nacimiento, ciudad o comuna opcional, pronombres opcionales, experiencia, disponibilidad, preferencia de contacto y motivación.</p>
      <p>La landing funciona como frontend estático y no mantiene una base de datos propia. El formulario se envía a un proveedor externo configurable mediante un endpoint público.</p>
      <p>No envíes datos sensibles innecesarios. Enviar el formulario no garantiza incorporación ni cupo.</p>
      <p>Para solicitar corrección o eliminación de información enviada, utiliza el canal oficial configurado por el equipo. El Instagram público de referencia es <a href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer'>@nativas_rollerderby</a>.</p>
      <div className='button-row'>
        <Link className='button button--primary' to='/postular'>Volver al formulario</Link>
        <Link className='button button--secondary' to='/'>Ir al inicio</Link>
      </div>
    </section>
  )
}
