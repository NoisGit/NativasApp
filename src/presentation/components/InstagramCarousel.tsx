import { Camera, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { GetInstagramPosts } from '../../application/instagram-gallery/GetInstagramPosts'
import { instagramPostsRepository } from '../../infrastructure/content/instagramPostsRepository'
import { siteConfig } from '../../shared/config/siteConfig'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function InstagramCarousel () {
  const posts = useMemo(() => new GetInstagramPosts(instagramPostsRepository).execute(), [])
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const touchStart = useRef<number | null>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const goTo = (index: number) => setActive((index + posts.length) % posts.length)
  const next = () => goTo(active + 1)
  const previous = () => goTo(active - 1)

  useEffect(() => {
    const element = viewportRef.current
    const activeCard = element?.querySelector<HTMLElement>(`[data-index="${active}"]`)
    activeCard?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'start' })
  }, [active, reducedMotion])

  useEffect(() => {
    if (reducedMotion || paused || document.hidden || posts.length < 2) return
    const id = window.setInterval(() => setActive((current) => (current + 1) % posts.length), 6500)
    return () => window.clearInterval(id)
  }, [paused, posts.length, reducedMotion])

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') next()
    if (event.key === 'ArrowLeft') previous()
  }

  return (
    <section id='instagram' className='section section--accent' aria-labelledby='instagram-title'>
      <div className='section__header'>
        <p className='eyebrow'>Nativas en Instagram</p>
        <h2 id='instagram-title'>Comunidad en movimiento</h2>
        <p>Una selección editorial local de publicaciones públicas vinculadas a Nativas. No es un feed en vivo.</p>
      </div>

      <div
        className='carousel'
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKeyDown}
      >
        <button className='icon-button carousel__control' type='button' onClick={previous} aria-label='Ver publicación anterior'>
          <ChevronLeft aria-hidden='true' />
        </button>

        <div
          className='carousel__viewport'
          ref={viewportRef}
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return
            const delta = touchStart.current - event.changedTouches[0].clientX
            if (Math.abs(delta) > 40) {
              if (delta > 0) next()
              else previous()
            }
            touchStart.current = null
          }}
          tabIndex={0}
          aria-label='Carrusel de publicaciones de Instagram'
        >
          {posts.map((post, index) => (
            <a
              className='instagram-card'
              data-index={index}
              key={post.id}
              href={post.permalink}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${post.title}. Abrir publicación en Instagram`}
            >
              <img src={post.image} alt={post.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding='async' width='640' height='480' />
              <span className='instagram-card__body'>
                <strong><Camera size={18} aria-hidden='true' /> {post.title}</strong>
                <span>{post.description}</span>
              </span>
            </a>
          ))}
        </div>

        <button className='icon-button carousel__control' type='button' onClick={next} aria-label='Ver publicación siguiente'>
          <ChevronRight aria-hidden='true' />
        </button>
      </div>

      <div className='carousel__dots' aria-label='Seleccionar publicación'>
        {posts.map((post, index) => (
          <button
            key={post.id}
            type='button'
            className={active === index ? 'is-active' : ''}
            onClick={() => goTo(index)}
            aria-label={`Ver publicación ${index + 1} de ${posts.length}`}
            aria-current={active === index}
          />
        ))}
      </div>

      <div className='section__actions'>
        <a className='button button--secondary' href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer'>
          <Camera size={18} aria-hidden='true' /> Ver Instagram de Nativas
        </a>
      </div>
    </section>
  )
}
