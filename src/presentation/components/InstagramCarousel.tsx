import { Pause, Play } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { FocusEvent } from 'react'
import { GetInstagramPosts } from '../../application/instagram-gallery/GetInstagramPosts'
import { instagramPostsRepository } from '../../infrastructure/content/instagramPostsRepository'
import { siteConfig } from '../../shared/config/siteConfig'
import { InstagramGlyph } from './InstagramGlyph'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(useGSAP)

const MARQUEE_SPEED_PX_PER_SECOND = 34

type InstagramPost = ReturnType<typeof instagramPostsRepository.getAll>[number]

function InstagramCard ({ post, clone, eager }: { post: InstagramPost, clone?: boolean, eager?: boolean }) {
  return (
    <a
      className='instagram-card'
      href={post.permalink}
      target='_blank'
      rel='noopener noreferrer'
      tabIndex={clone ? -1 : undefined}
      aria-label={`${post.title}. Abrir publicación en Instagram`}
    >
      <img src={post.image} alt={post.alt} loading={eager ? 'eager' : 'lazy'} decoding='async' width='640' height='480' />
      <span className='instagram-card__body'>
        <strong><InstagramGlyph size={18} /> {post.title}</strong>
        <span>{post.description}</span>
      </span>
    </a>
  )
}

export function InstagramCarousel () {
  const posts = useMemo(() => new GetInstagramPosts(instagramPostsRepository).execute(), [])
  const reducedMotion = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const firstGroupRef = useRef<HTMLDivElement | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [manualPaused, setManualPaused] = useState(false)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [focusPaused, setFocusPaused] = useState(false)
  const [hidden, setHidden] = useState(() => document.hidden)
  const canMove = posts.length > 1 && !reducedMotion
  const isPaused = manualPaused || hoverPaused || focusPaused || hidden || reducedMotion

  const applyPlayback = (paused: boolean, duration = 0.35) => {
    const tween = tweenRef.current
    if (!tween) return
    gsap.to(tween, { timeScale: paused ? 0 : 1, duration, ease: 'power2.out' })
  }

  const rebuildMarquee = () => {
    const track = trackRef.current
    const firstGroup = firstGroupRef.current
    if (!track || !firstGroup || !canMove) return

    tweenRef.current?.kill()
    gsap.set(track, { x: 0 })

    const distance = firstGroup.scrollWidth
    if (distance <= 0) return

    tweenRef.current = gsap.to(track, {
      x: -distance,
      duration: distance / MARQUEE_SPEED_PX_PER_SECOND,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => Number.parseFloat(x) % distance)
      }
    })

    tweenRef.current.timeScale(isPaused ? 0 : 1)
  }

  useGSAP(() => {
    if (!canMove) return
    rebuildMarquee()

    const onResize = () => rebuildMarquee()
    const observer = typeof ResizeObserver !== 'undefined' && firstGroupRef.current ? new ResizeObserver(onResize) : null
    if (observer && firstGroupRef.current) observer.observe(firstGroupRef.current)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', onResize)
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, { scope: rootRef, dependencies: [canMove, posts.length], revertOnUpdate: true })

  useEffect(() => {
    applyPlayback(isPaused)
  }, [isPaused])

  useEffect(() => {
    const onVisibility = () => {
      setHidden(document.hidden)
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const onFocusCapture = (event: FocusEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.instagram-card')) setFocusPaused(true)
  }

  const onBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as HTMLElement | null
    if (!nextTarget?.closest('.instagram-card')) setFocusPaused(false)
  }

  return (
    <section id='instagram' className='section section--accent' aria-labelledby='instagram-title'>
      <div className='section__header'>
        <p className='eyebrow'>Nativas en Instagram</p>
        <h2 id='instagram-title'>Comunidad en movimiento</h2>
        <p>Momentos, encuentros y comunidad compartidos por Nativas.</p>
      </div>

      <div
        className={`carousel carousel--marquee ${canMove ? 'is-moving' : 'carousel--static'}`}
        data-marquee-paused={isPaused || hidden || reducedMotion}
        data-marquee-speed={MARQUEE_SPEED_PX_PER_SECOND}
        ref={rootRef}
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocusCapture={onFocusCapture}
        onBlurCapture={onBlurCapture}
      >
        <div className='carousel__viewport' aria-label='Carrusel continuo de publicaciones de Instagram'>
          <div className='carousel__track' ref={trackRef} data-testid='instagram-marquee-track'>
            <div className='carousel__group' ref={firstGroupRef}>
              {posts.map((post, index) => (
                <div className='carousel__slide' key={post.id}>
                  <InstagramCard post={post} eager={index < 3} />
                </div>
              ))}
            </div>
            {canMove && (
              <div className='carousel__group' aria-hidden='true'>
                {posts.map((post) => (
                  <div className='carousel__slide' key={`clone-${post.id}`} aria-hidden='true'>
                    <InstagramCard post={post} clone />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {canMove && (
          <button
            className='carousel__pause'
            type='button'
            aria-pressed={manualPaused}
            onClick={() => setManualPaused((paused) => !paused)}
          >
            {manualPaused ? <Play size={16} aria-hidden='true' /> : <Pause size={16} aria-hidden='true' />}
            <span>{manualPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}</span>
          </button>
        )}
      </div>

      <div className='section__actions'>
        <a className='button button--secondary' href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer'>
          <InstagramGlyph size={18} /> Ver Instagram de Nativas
        </a>
      </div>
    </section>
  )
}
