import { siteConfig } from '../../shared/config/siteConfig'

export const experienceOptions = [
  'Sin experiencia',
  'He patinado antes',
  'He practicado roller derby',
  'Practico o practiqué otro deporte',
  'Otra experiencia'
] as const

export const contactPreferenceOptions = ['Correo', 'Teléfono', 'WhatsApp'] as const

export type ExperienceOption = typeof experienceOptions[number]
export type ContactPreference = typeof contactPreferenceOptions[number]

export interface ApplicationFormInput {
  fullName: string
  email: string
  phone: string
  birthDate: string
  city: string
  pronouns: string
  experience: string
  availability: string[]
  contactPreference: string
  motivation: string
  privacyAccepted: boolean
  website: string
  startedAt: string
}

export interface NormalizedApplicationData {
  fullName: string
  email: string
  phone: string
  birthDate: string
  city?: string
  pronouns?: string
  experience: ExperienceOption
  availability: string[]
  contactPreference: ContactPreference
  motivation: string
  privacyAccepted: true
  submittedFrom: string
  startedAt: string
}

export type ApplicationErrors = Partial<Record<keyof ApplicationFormInput | 'form', string>>

export interface ValidationResult {
  isValid: boolean
  data?: NormalizedApplicationData
  errors: ApplicationErrors
}

export interface ApplicationSubmissionGateway {
  submit: (data: NormalizedApplicationData, signal?: AbortSignal) => Promise<void>
}

export function normalizeChileanPhone (value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (/^9\d{8}$/.test(digits)) return `+56${digits}`
  if (/^569\d{8}$/.test(digits)) return `+${digits}`
  if (/^0569\d{8}$/.test(digits)) return `+${digits.slice(1)}`
  return null
}

export function calculateAge (birthDate: string, today = new Date()): number | null {
  const date = new Date(`${birthDate}T00:00:00`)
  if (!birthDate || Number.isNaN(date.getTime())) return null
  let age = today.getFullYear() - date.getFullYear()
  const hasBirthdayPassed =
    today.getMonth() > date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate())
  if (!hasBirthdayPassed) age -= 1
  return age
}

export function validateApplicationForm (input: ApplicationFormInput, today = new Date()): ValidationResult {
  const errors: ApplicationErrors = {}
  const fullName = input.fullName.trim()
  const email = input.email.trim().toLowerCase()
  const city = input.city.trim()
  const pronouns = input.pronouns.trim()
  const motivation = input.motivation.trim()
  const phone = normalizeChileanPhone(input.phone)
  const age = calculateAge(input.birthDate, today)
  const allowedAvailability = siteConfig.trainingSchedule.map((training) => training.id)
  const submittedTooFast = input.startedAt && Date.now() - Number(input.startedAt) < 100

  if (fullName.length < 2) errors.fullName = 'Ingresa tu nombre completo.'
  if (fullName.length > 100) errors.fullName = 'El nombre no puede superar 100 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Ingresa un correo válido.'
  if (email.length > 160) errors.email = 'El correo es demasiado largo.'
  if (!phone) errors.phone = 'Ingresa un teléfono chileno válido, por ejemplo +56912345678.'

  if (age === null) errors.birthDate = 'Ingresa una fecha de nacimiento válida.'
  else if (new Date(`${input.birthDate}T00:00:00`) > today) errors.birthDate = 'La fecha no puede estar en el futuro.'
  else if (age < siteConfig.minimumAge) errors.birthDate = `Debes tener al menos ${siteConfig.minimumAge} años.`

  if (city.length > 100) errors.city = 'La ciudad o comuna no puede superar 100 caracteres.'
  if (pronouns.length > 80) errors.pronouns = 'Los pronombres no pueden superar 80 caracteres.'
  if (!experienceOptions.includes(input.experience as ExperienceOption)) errors.experience = 'Selecciona una experiencia válida.'
  if (!contactPreferenceOptions.includes(input.contactPreference as ContactPreference)) errors.contactPreference = 'Selecciona una preferencia válida.'
  if (!input.availability.length) errors.availability = 'Selecciona al menos una disponibilidad.'
  if (input.availability.some((value) => !allowedAvailability.includes(value))) errors.availability = 'La disponibilidad seleccionada no es válida.'
  if (motivation.length < 20) errors.motivation = 'Cuéntanos un poco más, mínimo 20 caracteres.'
  if (motivation.length > 1000) errors.motivation = 'La motivación no puede superar 1000 caracteres.'
  if (!input.privacyAccepted) errors.privacyAccepted = 'Debes aceptar la política de privacidad.'
  if (input.website.trim()) errors.website = 'No se pudo validar el envío.'
  if (submittedTooFast) errors.form = 'Espera unos segundos antes de enviar el formulario.'

  if (Object.keys(errors).length > 0) return { isValid: false, errors }

  return {
    isValid: true,
    errors: {},
    data: {
      fullName,
      email,
      phone: phone as string,
      birthDate: input.birthDate,
      city: city || undefined,
      pronouns: pronouns || undefined,
      experience: input.experience as ExperienceOption,
      availability: input.availability,
      contactPreference: input.contactPreference as ContactPreference,
      motivation,
      privacyAccepted: true,
      submittedFrom: siteConfig.publicSiteUrl,
      startedAt: input.startedAt
    }
  }
}
