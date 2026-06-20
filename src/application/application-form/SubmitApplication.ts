import type {
  ApplicationFormInput,
  ApplicationSubmissionGateway,
  ValidationResult
} from '../../domain/application/applicationForm'
import { validateApplicationForm } from '../../domain/application/applicationForm'

export interface SubmitApplicationResult {
  ok: boolean
  validation: ValidationResult
  message: string
}

export class SubmitApplication {
  constructor (private readonly gateway: ApplicationSubmissionGateway) {}

  async execute (input: ApplicationFormInput, signal?: AbortSignal): Promise<SubmitApplicationResult> {
    const validation = validateApplicationForm(input)
    if (!validation.isValid || !validation.data) {
      return { ok: false, validation, message: 'Revisa los campos marcados.' }
    }

    await this.gateway.submit(validation.data, signal)
    return {
      ok: true,
      validation,
      message: 'Tu postulación fue enviada correctamente.'
    }
  }
}
