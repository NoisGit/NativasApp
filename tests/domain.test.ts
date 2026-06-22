import { describe, expect, it } from 'vitest'
import { calculateAge, normalizeInternationalPhone, validateApplicationForm } from '../src/domain/application/applicationForm'
import { isAllowedInstagramUrl } from '../src/domain/shared/url'

const validForm = {
  fullName: 'Persona Postulante',
  email: 'PERSONA@MAIL.CL',
  phone: '9 1234 5678',
  birthDate: '1994-05-20',
  pronouns: '',
  pronounsOther: '',
  experience: 'Sin experiencia',
  availability: ['martes-campos'],
  motivation: 'Quiero aprender roller derby con constancia y respeto.',
  privacyAccepted: true,
  website: '',
  startedAt: String(Date.now() - 5000)
}

describe('application domain', () => {
  it('normalizes international phone numbers to E.164', () => {
    expect(normalizeInternationalPhone('912345678')).toBe('+56912345678')
    expect(normalizeInternationalPhone('+56 9 1234 5678')).toBe('+56912345678')
    expect(normalizeInternationalPhone('+1 213 373 4253')).toBe('+12133734253')
    expect(normalizeInternationalPhone('+569')).toBeNull()
  })

  it('calculates age using day and month', () => {
    expect(calculateAge('2008-06-21', new Date('2026-06-20T12:00:00'))).toBe(17)
    expect(calculateAge('2008-06-20', new Date('2026-06-20T12:00:00'))).toBe(18)
  })

  it('validates and normalizes a valid form', () => {
    const result = validateApplicationForm(validForm)
    expect(result.isValid).toBe(true)
    expect(result.data?.email).toBe('persona@mail.cl')
    expect(result.data?.phone).toBe('+56912345678')
    expect(result.data?.birthDate).toBe('1994-05-20')
    expect(result.data).not.toHaveProperty('contactPreference')
    expect(result.data).not.toHaveProperty('city')
  })

  it('rejects impossible, future and underage birth dates', () => {
    expect(validateApplicationForm({ ...validForm, birthDate: '2000-02-31' }).errors.birthDate).toMatch(/válida/i)
    expect(validateApplicationForm({ ...validForm, birthDate: '3000-01-01' }, new Date('2026-06-22T12:00:00')).errors.birthDate).toMatch(/futuro/i)
    expect(validateApplicationForm({ ...validForm, birthDate: '2010-06-23' }, new Date('2026-06-22T12:00:00')).errors.birthDate).toMatch(/18 años/i)
  })

  it('accepts pronouns and normalizes the custom option', () => {
    const result = validateApplicationForm({
      ...validForm,
      pronouns: 'Otro',
      pronounsOther: 'Nativa'
    })
    expect(result.isValid).toBe(true)
    expect(result.data?.pronouns).toBe('Nativa')
  })

  it('rejects invalid availability, minors, honeypot and short motivation', () => {
    const result = validateApplicationForm({
      ...validForm,
      birthDate: '2020-01-01',
      availability: ['otro-dia'],
      motivation: 'hola',
      privacyAccepted: false,
      website: 'bot'
    })
    expect(result.isValid).toBe(false)
    expect(result.errors.birthDate).toBeTruthy()
    expect(result.errors.availability).toBeTruthy()
    expect(result.errors.motivation).toBeTruthy()
    expect(result.errors.privacyAccepted).toBeTruthy()
    expect(result.errors.website).toBeTruthy()
  })
})

describe('url validation', () => {
  it('allows only expected Instagram HTTPS hosts', () => {
    expect(isAllowedInstagramUrl('https://www.instagram.com/nativas_rollerderby/')).toBe(true)
    expect(isAllowedInstagramUrl('https://evil.example/nativas_rollerderby/')).toBe(false)
    expect(isAllowedInstagramUrl('http://instagram.com/nativas_rollerderby/')).toBe(false)
  })
})
