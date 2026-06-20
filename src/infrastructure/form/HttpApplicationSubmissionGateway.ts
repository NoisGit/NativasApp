import type { ApplicationSubmissionGateway, NormalizedApplicationData } from '../../domain/application/applicationForm'
import { isHttpsUrl } from '../../domain/shared/url'
import { siteConfig } from '../../shared/config/siteConfig'

export class MissingFormEndpointError extends Error {}
export class ApplicationSubmissionError extends Error {}

export class HttpApplicationSubmissionGateway implements ApplicationSubmissionGateway {
  constructor (
    private readonly endpoint = siteConfig.formEndpoint,
    private readonly timeoutMs = 12000
  ) {}

  async submit (data: NormalizedApplicationData, externalSignal?: AbortSignal): Promise<void> {
    if (!this.endpoint) {
      throw new MissingFormEndpointError('El endpoint público del formulario no está configurado.')
    }

    if (!isHttpsUrl(this.endpoint)) {
      throw new MissingFormEndpointError('El endpoint del formulario debe ser una URL HTTPS.')
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), this.timeoutMs)
    const cancelWhenExternalSignalAborts = () => controller.abort()

    try {
      externalSignal?.addEventListener('abort', cancelWhenExternalSignalAborts, { once: true })
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })

      if (!response.ok) {
        throw new ApplicationSubmissionError('No pudimos enviar la postulación. Inténtalo nuevamente.')
      }
    } catch (error) {
      if (error instanceof MissingFormEndpointError || error instanceof ApplicationSubmissionError) throw error
      if ((error as Error).name === 'AbortError') {
        throw new ApplicationSubmissionError('El envío tardó demasiado. Inténtalo nuevamente.')
      }
      throw new ApplicationSubmissionError('No pudimos enviar la postulación. Inténtalo nuevamente.')
    } finally {
      window.clearTimeout(timeout)
      externalSignal?.removeEventListener('abort', cancelWhenExternalSignalAborts)
    }
  }
}
