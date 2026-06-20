import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FocusEvent, KeyboardEvent } from 'react'
import { GetInstagramPosts } from '../../application/instagram-gallery/GetInstagramPosts'
import { instagramPostsRepository } from '../../infrastructure/content/instagramPostsRepository'
import { siteConfig } from '../../shared/config/siteConfig'
import { InstagramGlyph } from './InstagramGlyph'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type RenderedPost = ReturnType<typeof instagramPostsRepository.getAll>[number] & { cloneId: string, sourceIndex: number, isClone: boolean }

function getVisibleCount () {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth < 620) return 1
  if (window.innerWidth < 980) return 2
  return 3
}

export function InstagramCarousel () {
  const posts = useMemo(() => new GetInstagramPosts(instagramPostsRepository).execute(), [])
  const [position, setPosition] = useState(posts.length)
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [stepWidth, setStepWidth] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(() => document.hidden)
  const [withTransition, setWithTransition] = useState(true)
  const reducedMotion = usePrefersReducedMotion()
  const touchStart = useRef<number | null>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const hasOverflow = posts.length > visibleCount
  const currentIndex = posts.length ? ((position % posts.length) + posts.length) % posts.length : 0

  const renderedPosts = useMemo<RenderedPost[]>(() => {
    if (!hasOverflow) {
      return posts.map((post, index) => ({ ...post, cloneId: `single-${post.id}`, sourceIndex: index, isClone: false }))
    }

    return [
      ...posts.map((post, index) => ({ ...post, cloneId: `before-${post.id}`, sourceIndex: index, isClone: true })),
      ...posts.map((post, index) => ({ ...post, cloneId: `main-${post.id}`, sourceIndex: index, isClone: false })),
      ...posts.map((post, index) => ({ ...post, cloneId: `after-${post.id}`, sourceIndex: index, isClone: true }))
    ]
  }, [hasOverflow, posts])

  const measure = () => {
    const viewport = viewportRef.current
    const track = trackRef.current
    const firstSlide = track?.querySelector<HTMLElement>('.carousel__slide')
    const styles = track ? window.getComputedStyle(track) : null
    const gap = styles ? Number.parseFloat(styles.columnGap || styles.gap || '0') || 0 : 0
    const width = firstSlide?.getBoundingClientRect().width || (viewport?.clientWidth ? viewport.clientWidth / visibleCount : 0)
    setStepWidth(width + gap)
  }

  useLayoutEffect(() => {
    const updateLayout = () => {
      setVisibleCount(getVisibleCount())
      window.requestAnimationFrame(measure)
    }

    updateLayout()

    const viewport = viewportRef.current
    const observer = typeof ResizeObserver !== 'undefined' && viewport ? new ResizeObserver(updateLayout) : null
    if (observer && viewport) observer.observe(viewport)
    window.addEventListener('resize', updateLayout, { passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateLayout)
    }
  }, [visibleCount])

  useEffect(() => {
    setWithTransition(false)
    setPosition(posts.length)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setWithTransition(true))
    })
  }, [posts.length, visibleCount])

  useEffect(() => {
    if (!hasOverflow || reducedMotion || paused || hidden || posts.length < 2) return
    const id = window.setInterval(() => setPosition((current) => current + 1), 5200)
    return () => window.clearInterval(id)
  }, [hasOverflow, hidden, paused, posts.length, reducedMotion])

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const jumpWithoutAnimation = (nextPosition: number) => {
    setWithTransition(false)
    setPosition(nextPosition)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setWithTransition(true))
    })
  }

  const onTransitionEnd = () => {
    if (!hasOverflow) return
    if (position >= posts.length * 2) jumpWithoutAnimation(position - posts.length)
    if (position < posts.length) jumpWithoutAnimation(position + posts.length)
  }

  const next = () => {
    if (hasOverflow) setPosition((current) => current + 1)
  }
  const previous = () => {
    if (hasOverflow) setPosition((current) => current - 1)
  }
  const goTo = (index: number) => {
    if (hasOverflow) setPosition(posts.length + index)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!hasOverflow) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      previous()
    }
  }

  const onFocusCapture = (event: FocusEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.instagram-card')) setPaused(true)
  }

  const onBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as HTMLElement | null
    if (!nextTarget?.closest('.instagram-card')) setPaused(false)
  }

  return (
    <section id='instagram' className='section section--accent' aria-labelledby='instagram-title'>
      <div className='section__header'>
        <p className='eyebrow'>Nativas en Instagram</p>
        <h2 id='instagram-title'>Comunidad en movimiento</h2>
        <p>Momentos, encuentros y comunidad compartidos por Nativas.</p>
      </div>

      <div
        className={`carousel ${hasOverflow ? '' : 'carousel--static'}`}
        data-carousel-index={currentIndex}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={onFocusCapture}
        onBlurCapture={onBlurCapture}
        onKeyDown={onKeyDown}
      >
        {hasOverflow && (
          <button className='icon-button carousel__control' type='button' onClick={previous} aria-label='Ver publicación anterior'>
            <ChevronLeft aria-hidden='true' />
          </button>
        )}

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
          style={{ '--carousel-visible': visibleCount } as CSSProperties & Record<'--carousel-visible', number>}
        >
          <div
            className={`carousel__track ${withTransition && !reducedMotion ? 'is-animated' : ''}`}
            ref={trackRef}
            onTransitionEnd={onTransitionEnd}
            style={{ transform: hasOverflow ? `translate3d(-${position * stepWidth}px, 0, 0)` : undefined }}
          >
            {renderedPosts.map((post, index) => (
              <div
                className='carousel__slide'
                key={post.cloneId}
                data-index={post.sourceIndex}
                aria-hidden={post.isClone ? 'true' : undefined}
              >
                <a
                  className='instagram-card'
                  href={post.permalink}
                  target='_blank'
                  rel='noopener noreferrer'
                  tabIndex={post.isClone ? -1 : undefined}
                  aria-label={`${post.title}. Abrir publicación en Instagram`}
                >
                  <img src={post.image} alt={post.alt} loading={index <= visibleCount ? 'eager' : 'lazy'} decoding='async' width='640' height='480' />
                  <span className='instagram-card__body'>
                    <strong><InstagramGlyph size={18} /> {post.title}</strong>
                    <span>{post.description}</span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {hasOverflow && (
          <button className='icon-button carousel__control' type='button' onClick={next} aria-label='Ver publicación siguiente'>
            <ChevronRight aria-hidden='true' />
          </button>
        )}
      </div>

      {hasOverflow && (
        <div className='carousel__dots' aria-label='Seleccionar publicación'>
          {posts.map((post, index) => (
            <button
              key={post.id}
              type='button'
              className={currentIndex === index ? 'is-active' : ''}
              onClick={() => goTo(index)}
              aria-label={`Ver publicación ${index + 1} de ${posts.length}`}
              aria-current={currentIndex === index}
            />
          ))}
        </div>
      )}

      <div className='section__actions'>
        <a className='button button--secondary' href={siteConfig.instagramUrl} target='_blank' rel='noopener noreferrer'>
          <InstagramGlyph size={18} /> Ver Instagram de Nativas
        </a>
      </div>
    </section>
  )
}
