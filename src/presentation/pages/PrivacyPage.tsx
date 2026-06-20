import { Link } from 'react-router-dom'
import { siteConfig } from '../../shared/config/siteConfig'
import { usePageMeta } from '../hooks/usePageMeta'

export function PrivacyPage () {
  usePageMeta('Privacidad | Nativas Roller Derby', 'Política de privacidad para el formulario de postulación de Nativas Roller Derby.')

  return (
    <section className='legal-page'>
      <h1>Privacidad</h1>
      <p>Este sitio solicita datos para gestionar una postulación a Nativas Roller Derby: nombre, correo, teléfono, fecha de nacimiento, ciudad o comuna opcional, pronombres opcionales, experiencia, disponibilidad y motivación.</p>
      <p>La información se utiliza para revisar tu interés, entender tu disponibilidad y coordinar los siguientes pasos con el equipo.</p>
      <p>No envíes datos sensibles innecesarios. Enviar el formulario no garantiza incorporación ni cupo.</p>
      <p>Para solicitar corrección o eliminación de información enviada, utiliza el canal oficial indicado por el equipo. El Instagram público de referencia es <a href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer'>@nativas_rollerderby</a>.</p>
      <div className='button-row'>
        <Link className='button button--primary' to='/postular'>Volver al formulario</Link>
        <Link className='button button--secondary' to='/'>Ir al inicio</Link>
      </div>
    </section>
  )
}
