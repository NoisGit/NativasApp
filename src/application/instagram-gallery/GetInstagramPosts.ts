import type { InstagramPost } from '../../domain/instagram/instagramPost'
import { isPublishableInstagramPost } from '../../domain/instagram/instagramPost'

export interface InstagramPostsRepository {
  getAll: () => InstagramPost[]
}

export class GetInstagramPosts {
  constructor (private readonly repository: InstagramPostsRepository) {}

  execute (): InstagramPost[] {
    return this.repository.getAll().filter(isPublishableInstagramPost)
  }
}
