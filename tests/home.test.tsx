import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { App } from '../src/App'

describe('home interactions', () => {
  it('renders the official logo only in the header, navigation, CTA and footer Instagram link', () => {
    render(<App />)
    expect(screen.getAllByAltText('Nativas Roller Derby')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: /Patinaje, estrategia/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Postula/i })[0]).toHaveAttribute('href', '#/postular')

    const mainNav = screen.getByRole('navigation', { name: /Navegación principal/i })
    expect(within(mainNav).queryByRole('button', { name: /Instagram/i })).not.toBeInTheDocument()

    const instagramLinks = screen.getAllByRole('link', { name: /Instagram/i })
    const footerInstagram = instagramLinks[instagramLinks.length - 1]
    expect(footerInstagram).toHaveAttribute('href', 'https://www.instagram.com/nativas_rollerderby/')
    expect(footerInstagram).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link', { name: /Privacidad/i })).toHaveAttribute('href', '#/privacidad')
  })

  it('uses route-safe section navigation for Conoce a Nativas', async () => {
    const user = userEvent.setup()
    const scrollIntoView = vi.fn()
    const original = Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = scrollIntoView

    render(<App />)
    await user.click(screen.getByRole('button', { name: /Conoce a Nativas/i }))

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
    expect(screen.queryByText(/Ruta no disponible/i)).not.toBeInTheDocument()
    Element.prototype.scrollIntoView = original
  })

  it('opens and closes the mobile menu with Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    const menuButton = screen.getByRole('button', { name: /Abrir menú/i })
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens and closes FAQ items', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button', { name: /Necesito experiencia/i })
    expect(button).toHaveAttribute('aria-expanded', 'true')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders Instagram cards with safe external links, hidden clones and marquee pause control', async () => {
    const originalMatchMedia = window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false
      })
    })
    const user = userEvent.setup()
    const { container, unmount } = render(<App />)

    try {
      const links = container.querySelectorAll<HTMLAnchorElement>('.carousel__group:not([aria-hidden]) .instagram-card')
      expect(links.length).toBeGreaterThanOrEqual(5)
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        expect(link).toHaveAttribute('aria-label', expect.stringMatching(/Abrir publicación en Instagram/i))
        expect(link.getAttribute('href')).toMatch(/^https:\/\/(www\.)?instagram\.com\//)
      })

      const hiddenCloneLinks = container.querySelectorAll('.carousel__group[aria-hidden="true"] .instagram-card[tabindex="-1"]')
      expect(hiddenCloneLinks.length).toBeGreaterThan(0)

      const pause = screen.getByRole('button', { name: /Pausar carrusel/i })
      expect(pause).toHaveAttribute('aria-pressed', 'false')
      await user.click(pause)
      await waitFor(() => expect(screen.getByRole('button', { name: /Reanudar carrusel/i })).toHaveAttribute('aria-pressed', 'true'))
    } finally {
      unmount()
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: originalMatchMedia
      })
    }
  })

  it('shows training cards without invented tags', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Días y horarios/i })).toBeInTheDocument()
    expect(screen.queryByText(/Técnica y fundamentos/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Estrategia y pack/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Patinaje y resistencia/i)).not.toBeInTheDocument()
  })
})
