import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trainings } from '../../infrastructure/content/trainings'
import { siteMedia } from '../../infrastructure/content/siteMedia'
import { siteConfig } from '../../shared/config/siteConfig'
import { Faq } from '../components/Faq'
import { InstagramCarousel } from '../components/InstagramCarousel'
import { useGsapLandingMotion } from '../hooks/useGsapLandingMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import { useSectionNavigation } from '../hooks/useSectionNavigation'

export function HomePage () {
  usePageMeta('Nativas Roller Derby | Temuco', 'Nativas Roller Derby en Temuco: patinaje, comunidad, entrenamientos y postulación.')
  const motionScope = useGsapLandingMotion()
  const goToSection = useSectionNavigation()

  return (
    <div ref={motionScope}>
      <section id='inicio' className='hero'>
        <div className='hero__content'>
          <p className='eyebrow'>{siteConfig.location}</p>
          <h1>Patinaje, estrategia y fuerza colectiva desde el sur.</h1>
          <p className='lead'>Nativas Roller Derby reúne aprendizaje progresivo, comunicación y comunidad para vivir el roller derby con respeto, constancia y energía de equipo.</p>
          <div className='button-row'>
            <Link className='button button--primary' to='/postular'>Postula <ArrowRight size={18} aria-hidden='true' /></Link>
            <button className='button button--secondary' type='button' onClick={() => goToSection('nativas')}>Conoce a Nativas</button>
          </div>
          <p className='hero__meta'>Postulación desde {siteConfig.minimumAge} años. Experiencia previa no obligatoria.</p>
        </div>
        <div className='hero__stage' aria-label='Fotografía destacada de roller derby en Temuco'>
          <span className='hero__orb hero__orb--one' aria-hidden='true' />
          <span className='hero__orb hero__orb--two' aria-hidden='true' />
          <figure className='hero__media'>
            <img src={siteMedia.heroPhoto} alt='Tres deportistas de Temuco vinculados al roller derby representando a Chile en una publicación regional' width='1010' height='1267' />
          </figure>
        </div>
      </section>

      <section id='nativas' className='section split-section section-reveal'>
        <div>
          <p className='eyebrow'>Sobre Nativas</p>
          <h2>Un equipo de roller derby de Temuco con identidad comunitaria.</h2>
          <p>Nativas combina deporte, estrategia y comunidad. El crecimiento se construye de forma colectiva, con constancia, respeto, comunicación y trabajo en equipo.</p>
          <p>Quienes llegan pueden aprender progresivamente: desde habilidades de patinaje y seguridad hasta dinámicas de pack, roles y lectura táctica de la pista.</p>
        </div>
        <img src={siteMedia.aboutPhoto} alt='Integrantes de Nativas reunidas al aire libre con medallas' loading='lazy' decoding='async' width='1267' height='1199' />
      </section>

      <section id='roller-derby' className='section section-reveal'>
        <div className='section__header'>
          <p className='eyebrow'>Qué es el roller derby</p>
          <h2>Velocidad con cabeza, contacto reglamentado y juego colectivo.</h2>
          <p>Se practica sobre patines y enfrenta equipos que coordinan avance, bloqueo, apoyo y defensa. No es solo ir rápido: también es leer el pack, comunicarse y cuidar la seguridad.</p>
        </div>
        <div className='cards three'>
          <article className='card motion-card'><h3>Jammer</h3><p>Patinadora que busca superar al grupo y anotar puntos.</p></article>
          <article className='card motion-card'><h3>Blockers</h3><p>Integrantes que forman el pack, apoyan a su jammer y bloquean estratégicamente a la jammer rival.</p></article>
          <article className='card motion-card'><h3>Pivot</h3><p>Blocker con responsabilidades tácticas adicionales dentro del equipo.</p></article>
        </div>
      </section>

      <section className='section section--muted section-reveal'>
        <div className='section__header'>
          <p className='eyebrow'>Por qué entrenar</p>
          <h2>Técnica, seguridad y confianza en movimiento.</h2>
        </div>
        <div className='cards benefits'>
          {[
            ['Técnica de patinaje', 'Equilibrio, control, frenado y desplazamientos.'],
            ['Estrategia', 'Comunicación, lectura de juego y decisiones de equipo.'],
            ['Resistencia', 'Entrenamiento progresivo adaptado al proceso deportivo.'],
            ['Comunidad', 'Un entorno de aprendizaje colectivo y respeto.']
          ].map(([title, text]) => (
            <article className='card card--icon motion-card' key={title}>
              <CheckCircle2 aria-hidden='true' />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='section split-section section-reveal'>
        <div>
          <p className='eyebrow'>Antes de comenzar</p>
          <h2>Preparación simple, seguridad primero.</h2>
          <p>Trae ropa cómoda, hidratación, disposición para aprender y comunica tu experiencia previa. Antes de tu primera sesión, el equipo te indicará qué implementos necesitarás y cómo prepararte.</p>
        </div>
        <div className='notice-list'>
          <p><ShieldCheck aria-hidden='true' /> Sigue las instrucciones de seguridad del equipo.</p>
          <p><UsersRound aria-hidden='true' /> Avanza progresivamente junto a la comunidad.</p>
          <p><Sparkles aria-hidden='true' /> Consulta por patines y protecciones antes de asistir.</p>
        </div>
      </section>

      <section id='entrenamientos' className='section section-reveal'>
        <div className='section__header'>
          <p className='eyebrow'>Entrenamientos</p>
          <h2>Días y horarios</h2>
          <p>Los horarios pueden cambiar. Revisa el Instagram oficial antes de asistir.</p>
        </div>
        <div className='cards three'>
          {trainings.map((training) => (
            <article className='card schedule-card motion-card' key={training.id}>
              <h3>{training.day}</h3>
              <p>{training.time}</p>
              <strong>{training.place}</strong>
            </article>
          ))}
        </div>
      </section>

      <InstagramCarousel />

      <section className='section section-reveal'>
        <div className='section__header'>
          <p className='eyebrow'>Proceso de postulación</p>
          <h2>Claro, sin promesas falsas.</h2>
        </div>
        <ol className='process-list'>
          <li>Completa el formulario.</li>
          <li>Envía tus datos.</li>
          <li>Nativas revisará tu información.</li>
          <li>El equipo se pondrá en contacto.</li>
          <li>Se coordinarán los siguientes pasos.</li>
        </ol>
      </section>

      <section id='preguntas' className='section section--muted section-reveal'>
        <div className='section__header'>
          <p className='eyebrow'>Preguntas frecuentes</p>
          <h2>Lo importante antes de postular.</h2>
        </div>
        <Faq />
      </section>

      <section className='final-cta section-reveal'>
        <p className='eyebrow'>Postulación</p>
        <h2>¿Lista para acercarte a la pista?</h2>
        <p>Completa el formulario y Nativas coordinará los siguientes pasos según la información enviada.</p>
        <Link className='button button--primary' to='/postular'>Postula ahora</Link>
      </section>
    </div>
  )
}
