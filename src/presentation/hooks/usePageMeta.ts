import { useEffect } from 'react'

export function usePageMeta (title: string, description: string) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = description
  }, [title, description])
}
