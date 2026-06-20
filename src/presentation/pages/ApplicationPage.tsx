import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ApplicationForm } from '../components/ApplicationForm'
import { usePageMeta } from '../hooks/usePageMeta'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(useGSAP)

export function ApplicationPage () {
  usePageMeta('Postula | Nativas Roller Derby', 'Formulario de postulación para Nativas Roller Derby en Temuco.')
  const scope = useRef<HTMLElement | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return

    gsap.from('.application-aside', {
      x: -28,
      autoAlpha: 0,
      duration: 0.75,
      ease: 'power3.out',
      clearProps: 'transform,opacity,visibility'
    })

    gsap.from('.form-panel', {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'transform,opacity,visibility'
    })

    gsap.from('.form-panel__intro, .field, .checkbox-group, .privacy-check, .form-submit, .form-note', {
      y: 18,
      autoAlpha: 0,
      duration: 0.55,
      stagger: 0.045,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
      delay: 0.12
    })
  }, { scope, dependencies: [reducedMotion] })

  return (
    <section className='application-page' ref={scope}>
      <aside className='application-aside'>
        <p className='eyebrow'>Postulación</p>
        <p className='aside-title'>Acércate a la pista con calma y claridad.</p>
        <p>Cuéntanos un poco sobre ti, tu experiencia y tu disponibilidad. El equipo revisará tu información para coordinar los siguientes pasos.</p>
      </aside>
      <ApplicationForm />
    </section>
  )
}
