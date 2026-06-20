export function isHttpsUrl (value: string): boolean {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export function isAllowedInstagramUrl (value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && ['instagram.com', 'www.instagram.com'].includes(url.hostname)
  } catch {
    return false
  }
}
