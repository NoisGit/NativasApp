import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { App } from '../src/App'
import { siteConfig } from '../src/shared/config/siteConfig'


async function selectBirthDate (user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /Abrir calendario de fecha de nacimiento/i }))
  const dialog = screen.getByRole('dialog', { name: /Seleccionar fecha de nacimiento/i })
  const dropdowns = within(dialog).getAllByRole('combobox')
  await user.selectOptions(dropdowns[0], '4')
  await user.selectOptions(dropdowns[1], '1994')
  await user.click(within(dialog).getByRole('button', { name: /20/ }))
}

async function goToForm () {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getAllByRole('link', { name: /Postula/i })[0])
  return user
}

async function fillValidForm (user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Nombre completo/i), 'Persona Postulante')
  await user.type(screen.getByLabelText(/Correo/i), 'persona@mail.cl')
  await user.type(screen.getByLabelText(/Teléfono/i), '912345678')
  await selectBirthDate(user)
  await user.selectOptions(screen.getByLabelText(/Pronombres/i), 'Otro')
  await user.type(screen.getByLabelText(/Cómo prefieres/i), 'Nativa')
  await user.selectOptions(screen.getByLabelText(/Experiencia previa/i), 'Sin experiencia')
  await user.click(screen.getByLabelText(/Martes/i))
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
    expect(screen.queryByLabelText(/Preferencia de contacto/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Ciudad o comuna/i)).not.toBeInTheDocument()
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
    expect(await screen.findByText(/No pudimos habilitar el envío/i)).toBeInTheDocument()
  })

  it('submits successfully with normalized phone, custom pronouns and no contact preference', async () => {
    siteConfig.formEndpoint = 'https://forms.example.test/nativas'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const user = await goToForm()
    await fillValidForm(user)
    const submit = screen.getByRole('button', { name: /Enviar postulación/i })
    await user.click(submit)
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
    const body = JSON.parse(String((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1]?.body))
    expect(body.phone).toBe('+56912345678')
    expect(body.pronouns).toBe('Nativa')
    expect(body).not.toHaveProperty('contactPreference')
    expect(body).not.toHaveProperty('city')
    expect(await screen.findByRole('heading', { name: /Postulación enviada/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Nueva postulación/i })).toBeInTheDocument()
  })

  it('keeps form data after provider HTTP error', async () => {
    siteConfig.formEndpoint = 'https://forms.example.test/nativas'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const user = await goToForm()
    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /Enviar postulación/i }))
    expect(await screen.findByText(/No pudimos enviar la postulación/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombre completo/i)).toHaveValue('Persona Postulante')
  })


  it('opens the birth date picker, selects a valid date and closes with Escape', async () => {
    const user = await goToForm()
    const input = screen.getByRole('textbox', { name: /^Fecha de nacimiento$/i })
    const trigger = screen.getByRole('button', { name: /Abrir calendario de fecha de nacimiento/i })
    await user.click(trigger)
    expect(screen.getByRole('dialog', { name: /Seleccionar fecha de nacimiento/i })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: /Seleccionar fecha de nacimiento/i })).not.toBeInTheDocument()
    await selectBirthDate(user)
    expect(input).toHaveValue('20/05/1994')
  })

  it('accepts manual DD/MM/AAAA input, normalizes to ISO and synchronizes the calendar', async () => {
    siteConfig.formEndpoint = 'https://forms.example.test/nativas'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const user = await goToForm()
    await user.type(screen.getByLabelText(/Nombre completo/i), 'Persona Postulante')
    await user.type(screen.getByLabelText(/Correo/i), 'persona@mail.cl')
    await user.type(screen.getByLabelText(/Teléfono/i), '912345678')
    await user.type(screen.getByRole('textbox', { name: /^Fecha de nacimiento$/i }), '20051994')
    expect(screen.getByRole('textbox', { name: /^Fecha de nacimiento$/i })).toHaveValue('20/05/1994')
    await user.selectOptions(screen.getByLabelText(/Experiencia previa/i), 'Sin experiencia')
    await user.click(screen.getByLabelText(/Martes/i))
    await user.type(screen.getByLabelText(/Motivación/i), 'Quiero aprender roller derby con constancia y trabajo en equipo.')
    await user.click(screen.getByLabelText(/Acepto la/i))

    await user.click(screen.getByRole('button', { name: /Abrir calendario de fecha de nacimiento/i }))
    const dialog = screen.getByRole('dialog', { name: /Seleccionar fecha de nacimiento/i })
    expect(within(dialog).getByRole('button', { name: /20/ }).closest('.rdp-day_selected')).not.toBeNull()

    await user.click(screen.getByRole('button', { name: /Enviar postulación/i }))
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
    const body = JSON.parse(String((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1]?.body))
    expect(body.birthDate).toBe('1994-05-20')
  })

  it('rejects impossible manual dates, future dates and minors', async () => {
    const user = await goToForm()
    const birthDate = screen.getByRole('textbox', { name: /^Fecha de nacimiento$/i })

    await user.type(birthDate, '31022000')
    expect(birthDate).toHaveValue('31/02/2000')
    await user.click(screen.getByRole('button', { name: /Enviar postulación/i }))
    expect(screen.getByText(/Ingresa una fecha de nacimiento válida/i)).toBeInTheDocument()

    await user.clear(birthDate)
    await user.type(birthDate, '01013000')
    await user.click(screen.getByRole('button', { name: /Enviar postulación/i }))
    expect(screen.getByText(/La fecha no puede estar en el futuro/i)).toBeInTheDocument()

    await user.clear(birthDate)
    await user.type(birthDate, '01012020')
    await user.click(screen.getByRole('button', { name: /Enviar postulación/i }))
    expect(screen.getByText(/Debes tener al menos 18 años/i)).toBeInTheDocument()
  })
})
