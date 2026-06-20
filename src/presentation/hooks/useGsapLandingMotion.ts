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
      .from('.hero__content > *', { y: 34, autoAlpha: 0, stagger: 0.08, clearProps: 'transform,opacity,visibility' })
      .from('.hero__media', {
        clipPath: 'inset(14% 14% 14% 14%)',
        scale: 0.94,
        autoAlpha: 0,
        clearProps: 'clipPath,transform,opacity,visibility'
      }, '<0.08')
      .from('.hero__media img', { scale: 1.12, duration: 1.15, clearProps: 'transform' }, '<')

    gsap.to('.hero__orb', {
      x: 'random(-16, 16)',
      y: 'random(-22, 22)',
      scale: 'random(0.94, 1.05)',
      repeat: -1,
      yoyo: true,
      duration: 5.5,
      stagger: 0.35,
      ease: 'sine.inOut'
    })

    gsap.to('.hero__media img', {
      yPercent: -6,
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
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true
        }
      })
    })

    ScrollTrigger.batch('.motion-card', {
      start: 'top 88%',
      once: true,
      onEnter: (cards) => {
        gsap.from(cards, {
          y: 28,
          autoAlpha: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility'
        })
      }
    })

    gsap.from('.process-list li', {
      y: 30,
      autoAlpha: 0,
      duration: 0.72,
      stagger: 0.09,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: {
        trigger: '.process-list',
        start: 'top 84%',
        once: true
      }
    })

    gsap.from('.instagram-card', {
      x: 34,
      autoAlpha: 0,
      duration: 0.78,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: {
        trigger: '#instagram',
        start: 'top 78%',
        once: true
      }
    })

    gsap.from('.final-cta > *', {
      y: 30,
      autoAlpha: 0,
      duration: 0.82,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: {
        trigger: '.final-cta',
        start: 'top 86%',
        once: true
      }
    })

    gsap.utils.toArray<HTMLElement>('.split-section img').forEach((image) => {
      gsap.from(image, {
        y: 24,
        scale: 0.98,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: {
          trigger: image,
          start: 'top 86%',
          once: true
        }
      })
    })
  }, { scope })

  return scope
}
