import { expect, test } from '@playwright/test'

test('landing, form and privacy flows work', async ({ page }) => {
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
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', await page.locator('body').evaluate((body) => body.clientWidth))
})
