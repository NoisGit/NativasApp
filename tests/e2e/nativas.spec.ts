import { expect, test } from '@playwright/test'

test('landing, form and privacy flows work', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Patinaje, estrategia/i })).toBeVisible()
  await page.getByRole('button', { name: 'Entrenamientos' }).click()
  await expect(page.locator('#entrenamientos')).toBeVisible()

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: /Abrir menú/i }).click()
  await expect(page.getByRole('button', { name: /Cerrar menú/i })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: /Abrir menú/i })).toHaveAttribute('aria-expanded', 'false')

  const instagram = page.getByRole('link', { name: /Abrir publicación en Instagram/i }).first()
  await expect(instagram).toHaveAttribute('href', /https:\/\/(www\.)?instagram\.com\//)

  await page.getByRole('link', { name: /^Postula$/ }).first().click()
  await page.getByRole('button', { name: /Enviar postulación/i }).click()
  await expect(page.getByText(/Revisa los campos/i)).toBeVisible()
  await page.getByRole('link', { name: /política de privacidad/i }).click()
  await expect(page.getByRole('heading', { name: 'Privacidad' })).toBeVisible()
  await page.getByRole('link', { name: /Ir al inicio/i }).click()
  await expect(page.locator('html')).toHaveJSProperty('scrollWidth', await page.locator('html').evaluate((html) => html.clientWidth))
  expect(consoleErrors).toEqual([])
})

test('instagram autoplay keeps vertical scroll position stable', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    document.querySelector('#roller-derby')?.scrollIntoView({ block: 'start', behavior: 'instant' })
  })
  await expect(page.locator('#roller-derby')).toBeVisible()
  await page.waitForTimeout(200)
  const before = await page.evaluate(() => window.scrollY)
  await page.waitForTimeout(7000)
  const after = await page.evaluate(() => window.scrollY)
  expect(Math.abs(after - before)).toBeLessThanOrEqual(3)
})

test('form layout works on mobile and desktop without contact preference', async ({ page }) => {
  await page.goto('/#/postular')
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('heading', { name: 'Postula a Nativas' })).toBeVisible()
  await expect(page.getByLabel('Teléfono')).toBeVisible()
  await expect(page.getByLabel(/Preferencia de contacto/i)).toHaveCount(0)

  await page.setViewportSize({ width: 1280, height: 900 })
  await expect(page.getByLabel('Teléfono')).toBeVisible()
  await page.getByLabel('Pronombres').selectOption('Otro')
  await expect(page.getByLabel(/Cómo prefieres/i)).toBeVisible()
})
