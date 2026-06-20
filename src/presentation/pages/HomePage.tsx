import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/brand/nativas-logo-primary.png'
import heroImage from '../../assets/gallery/nativas-hero.jpg'
import trainingImage from '../../assets/gallery/nativas-training.jpg'
import { trainings } from '../../infrastructure/content/trainings'
import { siteConfig } from '../../shared/config/siteConfig'
import { Faq } from '../components/Faq'
import { InstagramCarousel } from '../components/InstagramCarousel'
import { usePageMeta } from '../hooks/usePageMeta'

export function HomePage () {
  usePageMeta('Nativas Roller Derby | Temuco', 'Landing oficial de Nativas Roller Derby en Temuco: patinaje, comunidad, entrenamientos y postulación.')

  return (
    <>
      <section id='inicio' className='hero'>
        <div className='hero__content'>
          <img className='hero__logo' src={logo} alt='Nativas Roller Derby' width='300' height='70' />
          <p className='eyebrow'>{siteConfig.location}</p>
          <h1>Patinaje, estrategia y fuerza colectiva desde el sur.</h1>
          <p className='lead'>Nativas Roller Derby reúne aprendizaje progresivo, comunicación y comunidad para vivir el roller derby con respeto, constancia y energía de equipo.</p>
          <div className='button-row'>
            <Link className='button button--primary' to='/postular'>Postula <ArrowRight size={18} aria-hidden='true' /></Link>
            <a className='button button--secondary' href='#nativas'>Conoce a Nativas</a>
          </div>
          <p className='hero__meta'>Postulación desde {siteConfig.minimumAge} años. Experiencia previa no obligatoria.</p>
        </div>
        <figure className='hero__media'>
          <img src={heroImage} alt='Equipo de roller derby patinando en una pista' width='1400' height='927' />
        </figure>
      </section>

      <section id='nativas' className='section split-section'>
        <div>
          <p className='eyebrow'>Sobre Nativas</p>
          <h2>Un equipo de roller derby de Temuco con identidad comunitaria.</h2>
          <p>Nativas combina deporte, estrategia y comunidad. El crecimiento se construye de forma colectiva, con constancia, respeto, comunicación y trabajo en equipo.</p>
          <p>Quienes llegan pueden aprender progresivamente: desde habilidades de patinaje y seguridad hasta dinámicas de pack, roles y lectura táctica de la pista.</p>
        </div>
        <img src={trainingImage} alt='Patinadora de roller derby entrenando' loading='lazy' decoding='async' width='1200' height='801' />
      </section>

      <section id='roller-derby' className='section'>
        <div className='section__header'>
          <p className='eyebrow'>Qué es el roller derby</p>
          <h2>Velocidad con cabeza, contacto reglamentado y juego colectivo.</h2>
          <p>Se practica sobre patines y enfrenta equipos que coordinan avance, bloqueo, apoyo y defensa. No es solo ir rápido: también es leer el pack, comunicarse y cuidar la seguridad.</p>
        </div>
        <div className='cards three'>
          <article className='card'><h3>Jammer</h3><p>Patinadora que busca superar al grupo y anotar puntos.</p></article>
          <article className='card'><h3>Blockers</h3><p>Integrantes que forman el pack, apoyan a su jammer y bloquean estratégicamente a la jammer rival.</p></article>
          <article className='card'><h3>Pivot</h3><p>Blocker con responsabilidades tácticas adicionales dentro del equipo.</p></article>
        </div>
      </section>

      <section className='section section--muted'>
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
            <article className='card card--icon' key={title}>
              <CheckCircle2 aria-hidden='true' />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='section split-section'>
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

      <section id='entrenamientos' className='section'>
        <div className='section__header'>
          <p className='eyebrow'>Entrenamientos</p>
          <h2>Horarios publicados</h2>
          <p>Datos conservados desde el repositorio. Los horarios pueden cambiar; revisa Instagram para información actualizada.</p>
        </div>
        <div className='cards three'>
          {trainings.map((training) => (
            <article className='card schedule-card' key={training.id}>
              <span>{training.tag}</span>
              <h3>{training.day}</h3>
              <p>{training.time}</p>
              <strong>{training.place}</strong>
            </article>
          ))}
        </div>
      </section>

      <InstagramCarousel />

      <section className='section'>
        <div className='section__header'>
          <p className='eyebrow'>Proceso de postulación</p>
          <h2>Claro, sin promesas falsas.</h2>
        </div>
        <ol className='process-list'>
          <li>Completa el formulario.</li>
          <li>Envía tus datos al proveedor externo configurado.</li>
          <li>Nativas revisará tu información.</li>
          <li>El equipo se pondrá en contacto.</li>
          <li>Se coordinarán los siguientes pasos.</li>
        </ol>
      </section>

      <section id='preguntas' className='section section--muted'>
        <div className='section__header'>
          <p className='eyebrow'>Preguntas frecuentes</p>
          <h2>Lo importante antes de postular.</h2>
        </div>
        <Faq />
      </section>

      <section className='final-cta'>
        <p className='eyebrow'>Postulación</p>
        <h2>¿Lista para acercarte a la pista?</h2>
        <p>Completa el formulario y Nativas coordinará los siguientes pasos según la información enviada.</p>
        <Link className='button button--primary' to='/postular'>Postula ahora</Link>
      </section>
    </>
  )
}
