import { existsSync, readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

function watchConsoleErrors (page: Page) {
  const consoleErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => consoleErrors.push(error.message))
  return consoleErrors
}

async function expectNoHorizontalScroll (page: Page) {
  const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth))
  expect(overflow).toBeLessThanOrEqual(1)
}

test('landing, form and privacy flows work without console errors', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Patinaje, estrategia/i })).toBeVisible()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('button', { name: 'Entrenamientos' }).click()
  await expect(page.locator('#entrenamientos')).toBeInViewport()

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: /Abrir menú/i }).click()
  await expect(page.getByRole('button', { name: /Cerrar menú/i })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: /Abrir menú/i })).toHaveAttribute('aria-expanded', 'false')

  await page.getByRole('link', { name: /^Postula$/ }).first().click()
  await page.getByRole('button', { name: /Enviar postulación/i }).click()
  await expect(page.getByText(/Revisa los campos/i)).toBeVisible()
  await page.getByRole('link', { name: /política de privacidad/i }).click()
  await expect(page.getByRole('heading', { name: 'Privacidad' })).toBeVisible()
  await page.getByRole('link', { name: /Ir al inicio/i }).click()
  await expectNoHorizontalScroll(page)
  expect(consoleErrors).toEqual([])
})

test('Conoce a Nativas uses safe section navigation and header excludes Instagram', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/')
  const mainNav = page.getByRole('navigation', { name: 'Navegación principal' })
  await expect(mainNav.getByRole('button', { name: 'Instagram' })).toHaveCount(0)

  await page.getByRole('button', { name: /Conoce a Nativas/i }).click()
  await expect(page.locator('#nativas')).toBeInViewport()
  await expect(page.getByText(/Ruta no disponible/i)).toHaveCount(0)
  expect(consoleErrors).toEqual([])
})

test('footer section links work from internal routes and Instagram link is safe', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/#/privacidad')
  const footerSections = page.getByRole('navigation', { name: 'Secciones del sitio' })
  await footerSections.getByRole('button', { name: 'Nativas' }).click()
  await expect(page.locator('#nativas')).toBeInViewport()

  await page.goto('/#/postular')
  await footerSections.getByRole('button', { name: 'Preguntas' }).click()
  await expect(page.locator('#preguntas')).toBeInViewport()

  const footerInstagram = page.getByRole('navigation', { name: 'Enlaces principales' }).getByRole('link', { name: /Instagram/i })
  await expect(footerInstagram).toHaveAttribute('href', 'https://www.instagram.com/nativas_rollerderby/')
  await expect(footerInstagram).toHaveAttribute('rel', 'noopener noreferrer')
  expect(consoleErrors).toEqual([])
})

test('instagram carousel loops horizontally and keeps vertical scroll position stable', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/')
  await page.locator('#instagram').scrollIntoViewIfNeeded()
  await expect(page.locator('#instagram')).toBeInViewport()
  await page.waitForTimeout(700)
  const instagram = page.getByRole('link', { name: /Abrir publicación en Instagram/i }).first()
  await expect(instagram).toHaveAttribute('href', /https:\/\/(www\.)?instagram\.com\//)

  const beforeY = await page.evaluate(() => window.scrollY)
  const carousel = page.locator('.carousel')
  const beforeIndex = await carousel.getAttribute('data-carousel-index')
  await page.waitForTimeout(5600)
  const afterIndex = await carousel.getAttribute('data-carousel-index')
  const afterY = await page.evaluate(() => window.scrollY)

  expect(afterIndex).not.toBe(beforeIndex)
  expect(Math.abs(afterY - beforeY)).toBeLessThanOrEqual(3)

  const seen = new Set<string>()
  for (let i = 0; i < 7; i += 1) {
    const clickY = await page.evaluate(() => window.scrollY)
    await page.getByRole('button', { name: /Ver publicación siguiente/i }).click({ force: true })
    await page.waitForTimeout(120)
    seen.add(await carousel.getAttribute('data-carousel-index') || '')
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - clickY)).toBeLessThanOrEqual(3)
  }
  expect(seen.size).toBeGreaterThan(2)
  expect(consoleErrors).toEqual([])
})

test.describe('reduced motion', () => {
  test('keeps content visible and disables carousel autoplay', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const consoleErrors = watchConsoleErrors(page)
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Patinaje, estrategia/i })).toBeVisible()
    await page.locator('#instagram').scrollIntoViewIfNeeded()
    const carousel = page.locator('.carousel')
    const beforeIndex = await carousel.getAttribute('data-carousel-index')
    await page.waitForTimeout(5600)
    await expect(carousel).toHaveAttribute('data-carousel-index', beforeIndex || '0')
    expect(consoleErrors).toEqual([])
  })
})

test('form layout works on mobile and desktop without contact preference', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/#/postular')
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('heading', { name: 'Postula a Nativas' })).toBeVisible()
  await expect(page.getByLabel('Teléfono')).toBeVisible()
  await expect(page.getByLabel(/Preferencia de contacto/i)).toHaveCount(0)
  await expectNoHorizontalScroll(page)

  await page.setViewportSize({ width: 1280, height: 900 })
  await expect(page.getByLabel('Teléfono')).toBeVisible()
  await page.getByLabel('Pronombres').selectOption('Otro')
  await expect(page.getByLabel(/Cómo prefieres/i)).toBeVisible()
  await expectNoHorizontalScroll(page)
  expect(consoleErrors).toEqual([])
})

test('responsive viewports have no horizontal overflow', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)
  const viewports = [320, 390, 430, 768, 1024, 1280, 1440, 1920]

  for (const width of viewports) {
    await page.setViewportSize({ width, height: width === 1920 ? 1080 : 900 })
    await page.goto('/')
    await expectNoHorizontalScroll(page)
  }

  expect(consoleErrors).toEqual([])
})

test('README preview image exists with exact 1920x1080 dimensions', async () => {
  const previewPath = 'docs/images/landing-preview-1920x1080.png'
  expect(existsSync(previewPath)).toBe(true)
  const png = readFileSync(previewPath)
  expect(png.subarray(1, 4).toString()).toBe('PNG')
  expect(png.readUInt32BE(16)).toBe(1920)
  expect(png.readUInt32BE(20)).toBe(1080)
})
