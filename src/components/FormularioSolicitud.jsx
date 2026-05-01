/* global fetch */

import { useState } from 'react'
import { Badge, Button, Card, Container, Section, SectionHeading } from './ui'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  birthDate: '',
  experience: 'Sin experiencia',
  availability: '',
  message: '',
  privacyAccepted: false
}

const applicationEndpoint = import.meta.env.VITE_APPLICATION_FORM_ENDPOINT

const getAge = (birthDate) => {
  const today = new Date()
  const date = new Date(birthDate)
  const age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    return age - 1
  }

  return age
}

export function FormularioSolicitud () {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value
    }))
  }

  const validateForm = () => {
    if (!form.fullName.trim()) return 'Ingresa tu nombre.'
    if (!form.email.trim()) return 'Ingresa tu correo.'
    if (!form.phone.trim()) return 'Ingresa tu teléfono.'
    if (!form.birthDate) return 'Ingresa tu fecha de nacimiento.'
    if (getAge(form.birthDate) < 18) return 'Debes tener al menos 18 años para postular.'
    if (!form.message.trim()) return 'Cuéntanos brevemente por qué quieres unirte.'
    if (!form.privacyAccepted) return 'Debes aceptar el uso de tus datos para poder enviar la postulación.'

    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validateForm()

    if (validationError) {
      setErrorMessage(validationError)
      setStatus('error')
      return
    }

    if (!applicationEndpoint) {
      setErrorMessage('El formulario todavía no tiene configurado el endpoint de envío.')
      setStatus('error')
      return
    }

    try {
      setStatus('loading')
      setErrorMessage('')

      const response = await fetch(applicationEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: 'Nueva postulación Nativas Roller Derby',
          to: 'niconoisy@gmail.com',
          ...form
        })
      })

      if (!response.ok) {
        throw new Error('No se pudo enviar la postulación.')
      }

      setForm(initialForm)
      setStatus('success')
    } catch (error) {
      setErrorMessage('No pudimos enviar la postulación. Intenta nuevamente más tarde.')
      setStatus('error')
    }
  }

  return (
    <main className='min-h-screen bg-nativas-night text-white'>
      <Section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,221,219,0.16),transparent_30%),linear-gradient(135deg,#0D1015_0%,#0A131C_50%,#10131A_100%)]' />
        <Container className='relative'>
          <div className='grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start'>
            <div>
              <Badge>Postulación 18+</Badge>
              <SectionHeading
                className='mt-6'
                title='Postula para ser parte de Nativas.'
                description='No necesitas experiencia previa. Completa tus datos y te contactaremos para contarte los próximos pasos del proceso.'
              />
              <Card className='mt-8 p-5'>
                <h3 className='text-lg font-black text-white'>Entrenamientos en Temuco</h3>
                <ul className='mt-4 space-y-3 text-sm leading-7 text-nativas-mist'>
                  <li>Martes 20:00 a 21:30 — Campos Deportivos.</li>
                  <li>Jueves 20:00 a 21:30 — Parque Estadio.</li>
                  <li>Domingo 09:00 a 10:00 — Pichicautín.</li>
                </ul>
              </Card>
            </div>

            <Card className='p-5 sm:p-8'>
              <form onSubmit={handleSubmit} className='grid gap-5'>
                <div className='grid gap-5 sm:grid-cols-2'>
                  <label className='grid gap-2 text-sm font-bold text-white'>
                    Nombre completo
                    <input
                      value={form.fullName}
                      onChange={(event) => updateField('fullName', event.target.value)}
                      className='rounded-2xl border border-nativas-border bg-nativas-deep-blue px-4 py-3 text-white outline-none transition placeholder:text-nativas-mist/60 focus:border-nativas-turquoise focus:ring-2 focus:ring-nativas-turquoise/30'
                      placeholder='Tu nombre'
                      required
                    />
                  </label>

                  <label className='grid gap-2 text-sm font-bold text-white'>
                    Correo
                    <input
                      type='email'
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      className='rounded-2xl border border-nativas-border bg-nativas-deep-blue px-4 py-3 text-white outline-none transition placeholder:text-nativas-mist/60 focus:border-nativas-turquoise focus:ring-2 focus:ring-nativas-turquoise/30'
                      placeholder='correo@ejemplo.com'
                      required
                    />
                  </label>
                </div>

                <div className='grid gap-5 sm:grid-cols-2'>
                  <label className='grid gap-2 text-sm font-bold text-white'>
                    Teléfono
                    <input
                      type='tel'
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      className='rounded-2xl border border-nativas-border bg-nativas-deep-blue px-4 py-3 text-white outline-none transition placeholder:text-nativas-mist/60 focus:border-nativas-turquoise focus:ring-2 focus:ring-nativas-turquoise/30'
                      placeholder='+56 9 1234 5678'
                      required
                    />
                  </label>

                  <label className='grid gap-2 text-sm font-bold text-white'>
                    Fecha de nacimiento
                    <input
                      type='date'
                      value={form.birthDate}
                      onChange={(event) => updateField('birthDate', event.target.value)}
                      className='rounded-2xl border border-nativas-border bg-nativas-deep-blue px-4 py-3 text-white outline-none transition focus:border-nativas-turquoise focus:ring-2 focus:ring-nativas-turquoise/30'
                      required
                    />
                  </label>
                </div>

                <label className='grid gap-2 text-sm font-bold text-white'>
                  Experiencia previa
                  <select
                    value={form.experience}
                    onChange={(event) => updateField('experience', event.target.value)}
                    className='rounded-2xl border border-nativas-border bg-nativas-deep-blue px-4 py-3 text-white outline-none transition focus:border-nativas-turquoise focus:ring-2 focus:ring-nativas-turquoise/30'
                  >
                    <option>Sin experiencia</option>
                    <option>He patinado antes</option>
                    <option>He practicado roller derby</option>
                    <option>Otro deporte de contacto</option>
                  </select>
                </label>

                <label className='grid gap-2 text-sm font-bold text-white'>
                  Disponibilidad
                  <input
                    value={form.availability}
                    onChange={(event) => updateField('availability', event.target.value)}
                    className='rounded-2xl border border-nativas-border bg-nativas-deep-blue px-4 py-3 text-white outline-none transition placeholder:text-nativas-mist/60 focus:border-nativas-turquoise focus:ring-2 focus:ring-nativas-turquoise/30'
                    placeholder='Ej: puedo martes y jueves'
                  />
                </label>

                <label className='grid gap-2 text-sm font-bold text-white'>
                  ¿Por qué quieres unirte?
                  <textarea
                    value={form.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    className='min-h-[150px] rounded-2xl border border-nativas-border bg-nativas-deep-blue px-4 py-3 text-white outline-none transition placeholder:text-nativas-mist/60 focus:border-nativas-turquoise focus:ring-2 focus:ring-nativas-turquoise/30'
                    placeholder='Cuéntanos brevemente qué te motiva a postular.'
                    required
                  />
                </label>

                <label className='flex gap-3 rounded-2xl border border-nativas-border bg-white/5 p-4 text-sm leading-6 text-nativas-mist'>
                  <input
                    type='checkbox'
                    checked={form.privacyAccepted}
                    onChange={(event) => updateField('privacyAccepted', event.target.checked)}
                    className='mt-1 h-4 w-4 accent-nativas-turquoise'
                  />
                  Acepto que Nativas use estos datos solo para contactarme por mi postulación.
                </label>

                {status === 'error' && (
                  <p className='rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200'>
                    {errorMessage}
                  </p>
                )}

                {status === 'success' && (
                  <p className='rounded-2xl border border-nativas-turquoise/30 bg-nativas-turquoise/10 p-4 text-sm text-nativas-turquoise'>
                    Postulación enviada correctamente. Te contactaremos pronto.
                  </p>
                )}

                <Button type='submit' disabled={status === 'loading'} className='w-full'>
                  {status === 'loading' ? 'Enviando...' : 'Enviar postulación'}
                </Button>
              </form>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}
