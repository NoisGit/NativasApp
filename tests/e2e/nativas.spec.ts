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

  await page.setViewportSize({ width: 1280, height: 900 })
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

  const desktopFooterHeight = await page.locator('footer').evaluate((footer) => Math.round(footer.getBoundingClientRect().height))
  expect(desktopFooterHeight).toBeLessThanOrEqual(185)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const mobileFooterHeight = await page.locator('footer').evaluate((footer) => Math.round(footer.getBoundingClientRect().height))
  expect(mobileFooterHeight).toBeLessThanOrEqual(285)
  await expectNoHorizontalScroll(page)
  expect(consoleErrors).toEqual([])
})

test('instagram carousel moves continuously through hover and focus and keeps vertical scroll stable', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/')
  await page.locator('#instagram').scrollIntoViewIfNeeded()
  await expect(page.locator('#instagram')).toBeInViewport()
  await page.waitForTimeout(800)
  const instagram = page.getByRole('link', { name: /Abrir publicación en Instagram/i }).first()
  await expect(instagram).toHaveAttribute('href', /https:\/\/(www\.)?instagram\.com\//)
  await expect(page.getByRole('button', { name: /Pausar carrusel|Reanudar carrusel/i })).toHaveCount(0)

  const track = page.getByTestId('instagram-marquee-track')
  const beforeY = await page.evaluate(() => window.scrollY)
  const firstX = await track.evaluate((element) => element.getBoundingClientRect().x)
  await page.waitForTimeout(700)
  const secondX = await track.evaluate((element) => element.getBoundingClientRect().x)
  await page.waitForTimeout(700)
  const thirdX = await track.evaluate((element) => element.getBoundingClientRect().x)
  const afterY = await page.evaluate(() => window.scrollY)

  expect(secondX).toBeLessThan(firstX - 4)
  expect(thirdX).toBeLessThan(secondX - 4)
  expect(Math.abs(afterY - beforeY)).toBeLessThanOrEqual(3)

  await page.locator('.carousel').hover()
  await page.waitForTimeout(500)
  const hoverX = await track.evaluate((element) => element.getBoundingClientRect().x)
  await page.waitForTimeout(500)
  const hoverAgainX = await track.evaluate((element) => element.getBoundingClientRect().x)
  expect(hoverAgainX).toBeLessThan(hoverX - 3)

  await instagram.focus()
  await page.waitForTimeout(400)
  const focusX = await track.evaluate((element) => element.getBoundingClientRect().x)
  await page.waitForTimeout(450)
  const focusAgainX = await track.evaluate((element) => element.getBoundingClientRect().x)
  expect(focusAgainX).toBeLessThan(focusX - 3)

  const hiddenCloneLinks = await page.locator('.carousel__group[aria-hidden="true"] .instagram-card').evaluateAll((links) => links.map((link) => ({ tabIndex: (link as HTMLAnchorElement).tabIndex, hidden: link.closest('.carousel__group')?.getAttribute('aria-hidden') })))
  expect(hiddenCloneLinks.length).toBeGreaterThan(0)
  expect(hiddenCloneLinks.every((link) => link.tabIndex === -1 && link.hidden === 'true')).toBe(true)
  expect(consoleErrors).toEqual([])
})

test.describe('reduced motion', () => {
  test('keeps content visible and leaves the marquee static', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const consoleErrors = watchConsoleErrors(page)
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Patinaje, estrategia/i })).toBeVisible()
    await page.locator('#instagram').scrollIntoViewIfNeeded()
    const carousel = page.locator('.carousel')
    const track = page.getByTestId('instagram-marquee-track')
    await expect(carousel).toHaveAttribute('data-marquee-paused', 'true')
    const beforeX = await track.evaluate((element) => element.getBoundingClientRect().x)
    await page.waitForTimeout(900)
    const afterX = await track.evaluate((element) => element.getBoundingClientRect().x)
    expect(Math.abs(afterX - beforeX)).toBeLessThanOrEqual(1)
    expect(consoleErrors).toEqual([])
  })
})

test('form layout works on mobile and desktop without city, placeholders or contact preference', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/#/postular')
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('heading', { name: 'Postula a Nativas' })).toBeVisible()
  await expect(page.getByLabel('Teléfono')).toBeVisible()
  await expect(page.getByLabel(/Preferencia de contacto/i)).toHaveCount(0)
  await expect(page.getByLabel(/Ciudad o comuna/i)).toHaveCount(0)
  await expectNoHorizontalScroll(page)

  await page.setViewportSize({ width: 1280, height: 900 })
  await expect(page.getByLabel('Teléfono')).toBeVisible()
  await expect(page.locator('input[placeholder]')).toHaveCount(0)
  await expect(page.locator('textarea[placeholder]')).toHaveCount(1)

  const heights = await page.evaluate(() => {
    const ids = ['email', 'birthDate', 'phone', 'pronouns', 'experience']
    return ids.map((id) => Math.round(document.getElementById(id)?.getBoundingClientRect().height || 0))
  })
  expect(new Set(heights).size).toBe(1)
  expect(heights[0]).toBeGreaterThanOrEqual(46)
  expect(heights[0]).toBeLessThanOrEqual(50)

  await page.getByLabel('Pronombres').selectOption('Otro')
  await expect(page.getByLabel(/Cómo prefieres/i)).toBeVisible()
  await expectNoHorizontalScroll(page)
  expect(consoleErrors).toEqual([])
})

test('birth date picker opens, navigates, selects and closes accessibly', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/#/postular')
  const input = page.getByRole('textbox', { name: /^Fecha de nacimiento$/ })
  const trigger = page.getByRole('button', { name: /Abrir calendario de fecha de nacimiento/i })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: /Seleccionar fecha de nacimiento/i })
  await expect(dialog).toBeVisible()
  await expect(dialog).toBeInViewport()
  const dialogBox = await dialog.boundingBox()
  expect(dialogBox?.width).toBeGreaterThanOrEqual(300)
  expect(dialogBox?.width).toBeLessThanOrEqual(330)

  const dropdowns = dialog.getByRole('combobox')
  await dropdowns.nth(0).selectOption({ label: 'mayo' })
  await dropdowns.nth(1).selectOption('1994')
  await dialog.getByRole('button', { name: /20/ }).click()
  await expect(dialog).toHaveCount(0)
  await expect(input).toHaveValue('20/05/1994')

  await trigger.click()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)

  await trigger.click()
  const yearOptions = await dropdowns.nth(1).locator('option').allTextContents()
  expect(yearOptions).not.toContain(String(new Date().getFullYear()))
  expect(yearOptions).toContain(String(new Date().getFullYear() - 18))
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)

  await page.setViewportSize({ width: 320, height: 760 })
  await trigger.click()
  const mobileBox = await dialog.boundingBox()
  expect(mobileBox?.x).toBeGreaterThanOrEqual(0)
  expect((mobileBox?.x || 0) + (mobileBox?.width || 0)).toBeLessThanOrEqual(320)
  await expectNoHorizontalScroll(page)
  expect(consoleErrors).toEqual([])
})

test('manual birth date entry formats, validates and stays synchronized with the calendar', async ({ page }) => {
  const consoleErrors = watchConsoleErrors(page)

  await page.goto('/#/postular')
  const input = page.getByRole('textbox', { name: /^Fecha de nacimiento$/ })
  await input.fill('20051994')
  await expect(input).toHaveValue('20/05/1994')

  await page.getByRole('button', { name: /Abrir calendario de fecha de nacimiento/i }).click()
  const dialog = page.getByRole('dialog', { name: /Seleccionar fecha de nacimiento/i })
  await expect(dialog.locator('.rdp-day_selected').getByRole('button', { name: /20/ })).toBeVisible()
  await page.keyboard.press('Escape')

  await input.fill('31022000')
  await page.getByRole('button', { name: /Enviar postulación/i }).click()
  await expect(page.getByText(/Ingresa una fecha de nacimiento válida/i)).toBeVisible()

  await input.fill('01013000')
  await page.getByRole('button', { name: /Enviar postulación/i }).click()
  await expect(page.getByText(/La fecha no puede estar en el futuro/i)).toBeVisible()

  await input.fill('01012020')
  await page.getByRole('button', { name: /Enviar postulación/i }).click()
  await expect(page.getByText(/Debes tener al menos 18 años/i)).toBeVisible()
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
