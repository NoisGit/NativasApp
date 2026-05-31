import { useEffect } from 'react'

export function useCinematicLanding (scopeRef) {
  useEffect(() => {
    const root = scopeRef.current
    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger

    if (!root || !gsap || !ScrollTrigger) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.05 } })

      gsap.set('[data-animate]', { autoAlpha: 0, y: 36, filter: 'blur(14px)' })
      gsap.set('[data-hero-visual]', { autoAlpha: 0, scale: 0.94, rotate: -2, filter: 'blur(10px)' })
      gsap.set('[data-float]', { y: 0 })

      heroTimeline
        .to('[data-animate]', {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.08
        })
        .to('[data-hero-visual]', {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
          duration: 1.25
        }, '-=0.7')

      gsap.to('[data-float]', {
        y: -18,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.4
      })

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(element,
          {
            autoAlpha: 0,
            y: 58,
            filter: 'blur(12px)'
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 84%',
              once: true
            }
          }
        )
      })

      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        const children = group.querySelectorAll('[data-stagger-item]')

        gsap.fromTo(children,
          {
            autoAlpha: 0,
            y: 42,
            scale: 0.96
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
              once: true
            }
          }
        )
      })

      gsap.utils.toArray('[data-parallax]').forEach((layer) => {
        const speed = Number(layer.dataset.speed) || 16

        gsap.to(layer, {
          yPercent: -speed,
          ease: 'none',
          scrollTrigger: {
            trigger: layer.closest('section') || root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })

      gsap.utils.toArray('[data-track-fill]').forEach((fill) => {
        gsap.fromTo(fill,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: fill.closest('section'),
              start: 'top 70%',
              end: 'bottom 45%',
              scrub: true
            }
          }
        )
      })

      gsap.to('[data-marquee]', {
        xPercent: -50,
        duration: 24,
        ease: 'none',
        repeat: -1
      })
    }, root)

    return () => ctx.revert()
  }, [scopeRef])
}
