import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from '../src/App'

describe('home interactions', () => {
  it('renders the official logo, navigation, CTA and footer Instagram link', () => {
    render(<App />)
    expect(screen.getAllByAltText('Nativas Roller Derby').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /Patinaje, estrategia/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Postula/i })[0]).toHaveAttribute('href', '#/postular')
    const instagramLinks = screen.getAllByRole('link', { name: /Instagram$/i })
    expect(instagramLinks[instagramLinks.length - 1]).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link', { name: /Privacidad/i })).toHaveAttribute('href', '#/privacidad')
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

  it('renders Instagram cards with safe external links and carousel controls', async () => {
    const user = userEvent.setup()
    render(<App />)
    const links = screen.getAllByRole('link', { name: /Abrir publicación en Instagram/i })
    expect(links.length).toBeGreaterThanOrEqual(8)
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link.getAttribute('href')).toMatch(/^https:\/\/(www\.)?instagram\.com\//)
    })
    await user.click(screen.getByRole('button', { name: /Ver publicación siguiente/i }))
    await user.click(screen.getByRole('button', { name: /Ver publicación anterior/i }))
    await user.click(screen.getByRole('button', { name: /Ver publicación 2 de/i }))
  })
})
