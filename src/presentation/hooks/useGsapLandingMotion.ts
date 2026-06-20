import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useGsapLandingMotion () {
  const scope = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const intro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
    intro
      .from('.hero__content > *', { y: 28, autoAlpha: 0, stagger: 0.08 })
      .from('.hero__badge', { scale: 0.86, rotation: -4, autoAlpha: 0 }, '<0.1')
      .from('.hero__media', { y: 34, scale: 0.96, autoAlpha: 0 }, '<0.12')

    gsap.to('.hero__badge', {
      y: -14,
      rotation: 1.5,
      repeat: -1,
      yoyo: true,
      duration: 4.8,
      ease: 'sine.inOut'
    })

    gsap.to('.hero__media img', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((section) => {
      gsap.from(section, {
        y: 42,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    gsap.utils.toArray<HTMLElement>('.motion-card').forEach((card, index) => {
      gsap.from(card, {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        delay: (index % 4) * 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      })
    })
  }, { scope })

  return scope
}
