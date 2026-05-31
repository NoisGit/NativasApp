/* global fetch */

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Container, Section } from './ui'
import { useCinematicLanding } from '../hooks/useCinematicLanding'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  birthDate: '',
  experience: 'Sin experiencia',
  availability: [],
  message: '',
  privacyAccepted: false
}

const applicationEndpoint = import.meta.env.VITE_APPLICATION_FORM_ENDPOINT
const availabilityOptions = ['Martes', 'Jueves', 'Domingo']

const fieldClass = 'rounded-2xl border border-nativas-border bg-nativas-deep-blue px-4 py-3 text-white outline-none transition placeholder:text-nativas-mist/55 focus:border-nativas-turquoise focus:ring-2 focus:ring-nativas-turquoise/25'
const panelClass = 'rounded-[1.75rem] border border-nativas-border bg-nativas-night-soft p-5 sm:rounded-[2rem] sm:p-6'

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
  const navigate = useNavigate()
  const formPageRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useCinematicLanding(formPageRef)

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value
    }))
  }

  const updateAvailability = (day) => {
    setForm((currentForm) => {
      const hasDay = currentForm.availability.includes(day)

      return {
        ...currentForm,
        availability: hasDay
          ? currentForm.availability.filter((item) => item !== day)
          : [...currentForm.availability, day]
      }
    })
  }

  const validateForm = () => {
    if (!form.fullName.trim()) return 'Ingresa tu nombre.'
    if (!form.email.trim()) return 'Ingresa tu correo.'
    if (!form.phone.trim()) return 'Ingresa tu teléfono.'
    if (!form.birthDate) return 'Ingresa tu fecha de nacimiento.'
    if (getAge(form.birthDate) < 18) return 'Debes tener al menos 18 años para postular.'
    if (!form.availability.length) return 'Selecciona al menos un día disponible.'
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
          ...form,
          phone: `+569${form.phone}`,
          availability: form.availability.join(', ')
        })
      })

      if (!response.ok) {
        throw new Error('No se pudo enviar la postulación.')
      }

      setForm(initialForm)
      setStatus('success')
    } catch {
      setErrorMessage('No pudimos enviar la postulación. Intenta nuevamente más tarde.')
      setStatus('error')
    }
  }

  return (
    <main ref={formPageRef} className='min-h-screen overflow-x-hidden bg-nativas-night text-white selection:bg-nativas-turquoise selection:text-nativas-night'>
      <Section className='relative bg-nativas-night py-8 sm:py-12 lg:py-16'>
        <div className='absolute left-0 top-0 h-full w-px bg-nativas-turquoise/30 sm:left-8' />
        <div className='absolute right-0 top-0 hidden h-full w-px bg-white/10 lg:block' />

        <Container className='relative'>
          <header data-animate className='mb-8 flex flex-wrap items-center justify-between gap-3 sm:mb-12'>
            <button type='button' onClick={() => navigate('/')} className='group flex items-center gap-3 text-left'>
              <span className='grid h-10 w-10 place-items-center rounded-full border border-nativas-turquoise/50 bg-nativas-deep-blue text-sm font-black text-nativas-turquoise transition group-hover:scale-105'>N</span>
              <span>
                <span className='block text-xs font-black uppercase tracking-[0.28em] text-white sm:text-sm'>Nativas</span>
                <span className='block text-[10px] uppercase tracking-[0.2em] text-nativas-mist sm:text-xs'>Postulación</span>
              </span>
            </button>

            <Button variant='secondary' className='px-4 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm' onClick={() => navigate('/')}>
              Volver al inicio
            </Button>
          </header>

          <div className='grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start xl:gap-12'>
            <aside className='space-y-5 lg:sticky lg:top-8'>
              <div data-animate className='border-l-4 border-nativas-turquoise pl-4 sm:pl-6'>
                <Badge>Formulario 18+</Badge>
                <h1 className='mt-5 text-4xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl'>
                  Entra al proceso de Nativas.
                </h1>
                <p className='mt-5 max-w-xl text-base leading-8 text-nativas-mist sm:text-lg'>
                  Completa tus datos y te contactaremos para coordinar los próximos pasos. No necesitas experiencia previa.
                </p>
              </div>

              <div data-stagger className='grid gap-4 sm:grid-cols-3 lg:grid-cols-1'>
                <div data-stagger-item className={panelClass}>
                  <p className='text-xs font-black uppercase tracking-[0.24em] text-nativas-turquoise'>Martes</p>
                  <p className='mt-2 text-xl font-black text-white'>20:00 a 21:30</p>
                  <p className='mt-2 text-sm leading-6 text-nativas-mist'>Campos Deportivos</p>
                </div>
                <div data-stagger-item className={panelClass}>
                  <p className='text-xs font-black uppercase tracking-[0.24em] text-nativas-turquoise'>Jueves</p>
                  <p className='mt-2 text-xl font-black text-white'>20:00 a 21:30</p>
                  <p className='mt-2 text-sm leading-6 text-nativas-mist'>Parque Estadio</p>
                </div>
                <div data-stagger-item className={panelClass}>
                  <p className='text-xs font-black uppercase tracking-[0.24em] text-nativas-turquoise'>Domingo</p>
                  <p className='mt-2 text-xl font-black text-white'>09:00 a 10:00</p>
                  <p className='mt-2 text-sm leading-6 text-nativas-mist'>Pichicautín</p>
                </div>
              </div>
            </aside>

            <div data-reveal>
              <Card className='p-4 sm:p-6 lg:p-8'>
                <div className='mb-6 flex flex-col gap-3 border-b border-nativas-border pb-5 sm:flex-row sm:items-end sm:justify-between'>
                  <div>
                    <p className='text-xs font-black uppercase tracking-[0.26em] text-nativas-turquoise'>Datos de contacto</p>
                    <h2 className='mt-2 text-2xl font-black text-white sm:text-3xl'>Cuéntanos de ti</h2>
                  </div>
                  <p className='max-w-sm text-sm leading-6 text-nativas-mist'>
                    Los campos son simples, pero nos ayudan a preparar una incorporación ordenada.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className='grid gap-5'>
                  <div data-stagger className='grid gap-5 sm:grid-cols-2'>
                    <label data-stagger-item className='grid gap-2 text-sm font-bold text-white'>
                      Nombre completo
                      <input
                        value={form.fullName}
                        onChange={(event) => updateField('fullName', event.target.value)}
                        className={fieldClass}
                        placeholder='Ej: Camila Rojas'
                        required
                      />
                    </label>

                    <label data-stagger-item className='grid gap-2 text-sm font-bold text-white'>
                      Correo
                      <input
                        type='email'
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        className={fieldClass}
                        placeholder='correo@ejemplo.cl'
                        required
                      />
                    </label>
                  </div>

                  <div data-stagger className='grid gap-5 sm:grid-cols-2'>
                    <label data-stagger-item className='grid gap-2 text-sm font-bold text-white'>
                      Teléfono
                      <div className='flex overflow-hidden rounded-2xl border border-nativas-border bg-nativas-deep-blue transition focus-within:border-nativas-turquoise focus-within:ring-2 focus-within:ring-nativas-turquoise/25'>
                        <span className='flex shrink-0 items-center gap-2 border-r border-nativas-border px-3 text-sm font-bold text-white sm:px-4'>
                          <span>🇨🇱</span>
                          <span>+569</span>
                        </span>
                        <input
                          type='tel'
                          value={form.phone}
                          onChange={(event) => updateField('phone', event.target.value.replace(/\D/g, '').slice(0, 8))}
                          className='min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-nativas-mist/55'
                          placeholder='12345678'
                          maxLength='8'
                          required
                        />
                      </div>
                    </label>

                    <label data-stagger-item className='grid gap-2 text-sm font-bold text-white'>
                      Fecha de nacimiento
                      <input
                        type='date'
                        value={form.birthDate}
                        onChange={(event) => updateField('birthDate', event.target.value)}
                        className={fieldClass}
                        required
                      />
                    </label>
                  </div>

                  <label data-reveal className='grid gap-2 text-sm font-bold text-white'>
                    Experiencia previa
                    <select
                      value={form.experience}
                      onChange={(event) => updateField('experience', event.target.value)}
                      className={fieldClass}
                    >
                      <option>Sin experiencia</option>
                      <option>He patinado antes</option>
                      <option>He practicado roller derby</option>
                      <option>Otro deporte de contacto</option>
                    </select>
                  </label>

                  <fieldset data-reveal className='grid gap-3'>
                    <legend className='text-sm font-bold text-white'>Disponibilidad</legend>
                    <div className='grid gap-3 sm:grid-cols-3'>
                      {availabilityOptions.map((day) => {
                        const isSelected = form.availability.includes(day)

                        return (
                          <label key={day} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-bold transition ${isSelected ? 'border-nativas-turquoise bg-nativas-turquoise/10 text-white' : 'border-nativas-border bg-nativas-deep-blue text-nativas-mist hover:border-nativas-turquoise/40'}`}>
                            <input
                              type='checkbox'
                              checked={isSelected}
                              onChange={() => updateAvailability(day)}
                              className='h-4 w-4 accent-nativas-turquoise'
                            />
                            {day}
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <label data-reveal className='grid gap-2 text-sm font-bold text-white'>
                    ¿Por qué quieres unirte?
                    <textarea
                      value={form.message}
                      onChange={(event) => updateField('message', event.target.value)}
                      className={`${fieldClass} min-h-[150px] resize-y sm:min-h-[180px]`}
                      placeholder='Cuéntanos qué te motiva a postular.'
                      required
                    />
                  </label>

                  <label data-reveal className='flex gap-3 rounded-2xl border border-nativas-border bg-nativas-deep-blue p-4 text-sm leading-6 text-nativas-mist'>
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

                  <div data-reveal className='border-t border-nativas-border pt-5'>
                    <Button type='submit' disabled={status === 'loading'} className='w-full'>
                      {status === 'loading' ? 'Enviando...' : 'Enviar postulación'}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
