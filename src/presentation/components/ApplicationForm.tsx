import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SubmitApplication } from '../../application/application-form/SubmitApplication'
import {
  contactPreferenceOptions,
  experienceOptions,
  validateApplicationForm
} from '../../domain/application/applicationForm'
import type { ApplicationErrors, ApplicationFormInput } from '../../domain/application/applicationForm'
import {
  ApplicationSubmissionError,
  HttpApplicationSubmissionGateway,
  MissingFormEndpointError
} from '../../infrastructure/form/HttpApplicationSubmissionGateway'
import { siteConfig } from '../../shared/config/siteConfig'

const initialForm = (): ApplicationFormInput => ({
  fullName: '',
  email: '',
  phone: '',
  birthDate: '',
  city: '',
  pronouns: '',
  experience: '',
  availability: [],
  contactPreference: 'Correo',
  motivation: '',
  privacyAccepted: false,
  website: '',
  startedAt: String(Date.now())
})

export function ApplicationForm () {
  const [form, setForm] = useState<ApplicationFormInput>(() => initialForm())
  const [errors, setErrors] = useState<ApplicationErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const abortRef = useRef<AbortController | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const submitApplication = useMemo(() => new SubmitApplication(new HttpApplicationSubmissionGateway()), [])

  const update = (name: keyof ApplicationFormInput, value: string | boolean | string[]) => {
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined, form: undefined }))
  }

  const focusFirstError = (nextErrors: ApplicationErrors) => {
    const firstErrorName = Object.keys(nextErrors).find((key) => key !== 'form')
    if (!firstErrorName) return
    formRef.current?.querySelector<HTMLElement>(`[name="${firstErrorName}"]`)?.focus()
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return
    const validation = validateApplicationForm(form)
    setErrors(validation.errors)

    if (!validation.isValid) {
      setMessage('Revisa los campos marcados antes de enviar.')
      setStatus('error')
      focusFirstError(validation.errors)
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setStatus('submitting')
    setMessage('')

    try {
      const result = await submitApplication.execute(form, controller.signal)
      setStatus('success')
      setMessage(result.message)
    } catch (error) {
      setStatus('error')
      if (error instanceof MissingFormEndpointError) {
        setMessage('El formulario todavía no tiene un endpoint público configurado. Puedes contactar a Nativas desde Instagram mientras se configura el proveedor externo.')
      } else if (error instanceof ApplicationSubmissionError) {
        setMessage(error.message)
      } else {
        setMessage('No pudimos enviar la postulación. Inténtalo nuevamente.')
      }
    }
  }

  if (status === 'success') {
    return (
      <section className='form-panel success-panel' aria-labelledby='success-title'>
        <CheckCircle2 size={42} aria-hidden='true' />
        <h1 id='success-title'>Postulación enviada</h1>
        <p>{message}</p>
        <p>Nativas revisará tu información y coordinará los siguientes pasos según disponibilidad del equipo.</p>
        <div className='button-row'>
          <Link className='button button--primary' to='/'>Volver al inicio</Link>
          <button
            className='button button--secondary'
            type='button'
            onClick={() => {
              setForm(initialForm())
              setStatus('idle')
              setMessage('')
              setErrors({})
            }}
          >
            Nueva postulación
          </button>
        </div>
      </section>
    )
  }

  return (
    <form ref={formRef} className='form-panel' onSubmit={onSubmit} noValidate>
      <div className='form-panel__intro'>
        <p className='eyebrow'>Formulario externo configurable</p>
        <h1>Postula a Nativas</h1>
        <p>Completa tus datos para que el equipo pueda revisar tu información. El sitio no guarda una base de datos propia.</p>
      </div>

      {status === 'error' && message && (
        <div className='form-summary' role='alert' aria-live='assertive'>
          <AlertCircle size={20} aria-hidden='true' />
          <span>{message}</span>
        </div>
      )}

      <input
        className='honeypot'
        type='text'
        name='website'
        tabIndex={-1}
        autoComplete='off'
        value={form.website}
        onChange={(event) => update('website', event.target.value)}
        aria-hidden='true'
      />

      <div className='form-grid'>
        <Field label='Nombre completo' name='fullName' error={errors.fullName} hint='Como prefieres que te identifiquemos.'>
          <input id='fullName' name='fullName' autoComplete='name' maxLength={100} value={form.fullName} onChange={(event) => update('fullName', event.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby='fullName-hint fullName-error' />
        </Field>

        <Field label='Correo electrónico' name='email' error={errors.email} hint='Usaremos este dato solo para gestionar la postulación.'>
          <input id='email' name='email' type='email' autoComplete='email' maxLength={160} value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby='email-hint email-error' />
        </Field>

        <Field label='Teléfono chileno' name='phone' error={errors.phone} hint='Ejemplo: +56912345678.'>
          <input id='phone' name='phone' inputMode='tel' autoComplete='tel' value={form.phone} onChange={(event) => update('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby='phone-hint phone-error' />
        </Field>

        <Field label='Fecha de nacimiento' name='birthDate' error={errors.birthDate} hint={`Postulación desde ${siteConfig.minimumAge} años.`}>
          <input id='birthDate' name='birthDate' type='date' value={form.birthDate} onChange={(event) => update('birthDate', event.target.value)} aria-invalid={Boolean(errors.birthDate)} aria-describedby='birthDate-hint birthDate-error' />
        </Field>

        <Field label='Ciudad o comuna' name='city' error={errors.city} hint='Opcional.'>
          <input id='city' name='city' autoComplete='address-level2' maxLength={100} value={form.city} onChange={(event) => update('city', event.target.value)} aria-invalid={Boolean(errors.city)} aria-describedby='city-hint city-error' />
        </Field>

        <Field label='Pronombres' name='pronouns' error={errors.pronouns} hint='Opcional.'>
          <input id='pronouns' name='pronouns' maxLength={80} value={form.pronouns} onChange={(event) => update('pronouns', event.target.value)} aria-invalid={Boolean(errors.pronouns)} aria-describedby='pronouns-hint pronouns-error' />
        </Field>

        <Field label='Experiencia previa' name='experience' error={errors.experience} hint='Selecciona la opción más cercana.'>
          <select id='experience' name='experience' value={form.experience} onChange={(event) => update('experience', event.target.value)} aria-invalid={Boolean(errors.experience)} aria-describedby='experience-hint experience-error'>
            <option value=''>Selecciona una opción</option>
            {experienceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </Field>

        <Field label='Preferencia de contacto' name='contactPreference' error={errors.contactPreference} hint='Elige por dónde prefieres recibir respuesta.'>
          <select id='contactPreference' name='contactPreference' value={form.contactPreference} onChange={(event) => update('contactPreference', event.target.value)} aria-invalid={Boolean(errors.contactPreference)} aria-describedby='contactPreference-hint contactPreference-error'>
            {contactPreferenceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </Field>
      </div>

      <fieldset className='checkbox-group' aria-describedby='availability-hint availability-error'>
        <legend>Disponibilidad</legend>
        <p id='availability-hint'>Marca una o más opciones según los entrenamientos publicados.</p>
        {siteConfig.trainingSchedule.map((training) => (
          <label key={training.id}>
            <input
              type='checkbox'
              name='availability'
              value={training.id}
              checked={form.availability.includes(training.id)}
              onChange={(event) => {
                const next = event.target.checked
                  ? [...form.availability, training.id]
                  : form.availability.filter((value) => value !== training.id)
                update('availability', next)
              }}
            />
            <span>{training.day}, {training.time} — {training.place}</span>
          </label>
        ))}
        {errors.availability && <p id='availability-error' className='field-error'>{errors.availability}</p>}
      </fieldset>

      <Field label='Motivación' name='motivation' error={errors.motivation} hint='Entre 20 y 1000 caracteres.'>
        <textarea id='motivation' name='motivation' rows={6} maxLength={1000} value={form.motivation} onChange={(event) => update('motivation', event.target.value)} aria-invalid={Boolean(errors.motivation)} aria-describedby='motivation-hint motivation-error motivation-counter' />
        <span id='motivation-counter' className='counter'>{form.motivation.length}/1000</span>
      </Field>

      <label className='privacy-check'>
        <input type='checkbox' name='privacyAccepted' checked={form.privacyAccepted} onChange={(event) => update('privacyAccepted', event.target.checked)} aria-invalid={Boolean(errors.privacyAccepted)} aria-describedby='privacyAccepted-error' />
        <span>Acepto la <Link to='/privacidad'>política de privacidad</Link> y entiendo que enviar el formulario no garantiza incorporación.</span>
      </label>
      {errors.privacyAccepted && <p id='privacyAccepted-error' className='field-error'>{errors.privacyAccepted}</p>}

      <button className='button button--primary form-submit' type='submit' disabled={status === 'submitting'}>
        {status === 'submitting' ? <Loader2 className='spin' size={18} aria-hidden='true' /> : null}
        {status === 'submitting' ? 'Enviando…' : 'Enviar postulación'}
      </button>

      <p className='form-note'>Los horarios pueden cambiar. Revisa Instagram para información actualizada.</p>
    </form>
  )
}

interface FieldProps {
  label: string
  name: keyof ApplicationFormInput
  hint: string
  error?: string
  children: ReactNode
}

function Field ({ label, name, hint, error, children }: FieldProps) {
  return (
    <div className='field'>
      <label htmlFor={name}>{label}</label>
      {children}
      <p id={`${name}-hint`} className='field-hint'>{hint}</p>
      {error && <p id={`${name}-error`} className='field-error'>{error}</p>}
    </div>
  )
}
