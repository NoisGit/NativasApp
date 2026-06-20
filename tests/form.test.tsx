import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { App } from '../src/App'
import { siteConfig } from '../src/shared/config/siteConfig'

async function goToForm () {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getAllByRole('link', { name: /Postula/i })[0])
  return user
}

async function fillValidForm (user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Nombre completo/i), 'Persona Postulante')
  await user.type(screen.getByLabelText(/Correo/i), 'persona@mail.cl')
  await user.type(screen.getByLabelText(/Teléfono/i), '+56 9 1234 5678')
  await user.type(screen.getByLabelText(/Fecha de nacimiento/i), '1994-05-20')
  await user.selectOptions(screen.getByLabelText(/Experiencia previa/i), 'Sin experiencia')
  await user.click(screen.getByLabelText(/Martes/i))
  await user.selectOptions(screen.getByLabelText(/Preferencia de contacto/i), 'WhatsApp')
  await user.type(screen.getByLabelText(/Motivación/i), 'Quiero aprender roller derby con constancia y trabajo en equipo.')
  await user.click(screen.getByLabelText(/Acepto la/i))
}

describe('application form', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    siteConfig.formEndpoint = ''
  })

  it('renders all required fields and focuses first invalid field', async () => {
    const user = await goToForm()
    await user.click(screen.getByRole('button', { name: /Enviar postulación/i }))
    expect(screen.getByText(/Revisa los campos/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombre completo/i)).toHaveFocus()
    expect(screen.getByText(/Cuéntanos un poco más/i)).toBeInTheDocument()
  })

  it('updates the motivation counter and links privacy', async () => {
    const user = await goToForm()
    await user.type(screen.getByLabelText(/Motivación/i), 'Motivación con suficientes caracteres')
    expect(screen.getByText(/\d+\/1000/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /política de privacidad/i })).toHaveAttribute('href', '#/privacidad')
  })

  it('does not simulate success when endpoint is missing', async () => {
    const user = await goToForm()
    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /Enviar postulación/i }))
    expect(await screen.findByText(/no tiene un endpoint público configurado/i)).toBeInTheDocument()
  })

  it('submits successfully when the external endpoint responds ok and prevents double submit', async () => {
    siteConfig.formEndpoint = 'https://forms.example.test/nativas'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const user = await goToForm()
    await fillValidForm(user)
    const submit = screen.getByRole('button', { name: /Enviar postulación/i })
    await user.click(submit)
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
    expect(await screen.findByRole('heading', { name: /Postulación enviada/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Nueva postulación/i })).toBeInTheDocument()
  })

  it('keeps form data after provider HTTP error', async () => {
    siteConfig.formEndpoint = 'https://forms.example.test/nativas'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const user = await goToForm()
    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /Enviar postulación/i }))
    expect(await screen.findByText(/proveedor externo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombre completo/i)).toHaveValue('Persona Postulante')
  })
})
