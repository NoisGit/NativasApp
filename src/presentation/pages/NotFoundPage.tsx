import { Link } from 'react-router-dom'

export function NotFoundPage () {
  return (
    <section className='legal-page'>
      <h1>Página no encontrada</h1>
      <p>La ruta solicitada no existe en esta landing pública.</p>
      <Link className='button button--primary' to='/'>Volver al inicio</Link>
    </section>
  )
}
