import { isAllowedInstagramUrl } from '../shared/url'

export type InstagramMediaType = 'image' | 'carousel' | 'reel'

export interface InstagramPost {
  id: string
  title: string
  description: string
  image: string
  permalink: string
  mediaType: InstagramMediaType
  alt: string
  publishedAt?: string
}

export function isPublishableInstagramPost (post: InstagramPost): boolean {
  return Boolean(
    post.id.trim() &&
    post.title.trim() &&
    post.alt.trim() &&
    isAllowedInstagramUrl(post.permalink)
  )
}
