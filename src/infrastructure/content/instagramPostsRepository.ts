import type { InstagramPost } from '../../domain/instagram/instagramPost'
import { siteMedia } from './siteMedia'

const posts: InstagramPost[] = [
  {
    id: 'post-banca',
    title: 'Concentración antes de salir',
    description: 'Instante de pista con integrantes preparándose para volver al juego.',
    image: siteMedia.instagram.benchPhoto,
    permalink: 'https://www.instagram.com/p/DUtE_nvEQFj/',
    mediaType: 'image',
    alt: 'Integrantes de roller derby sentadas con protecciones y patines junto a la pista'
  },
  {
    id: 'post-pack',
    title: 'Juego de pack',
    description: 'Bloqueo, comunicación y lectura colectiva sobre patines.',
    image: siteMedia.instagram.packPhoto,
    permalink: 'https://www.instagram.com/p/DUrlQh_kTzg/',
    mediaType: 'image',
    alt: 'Patinadoras de roller derby bloqueando en grupo sobre una pista azul'
  },
  {
    id: 'post-seleccion',
    title: 'Derby en competencia',
    description: 'Acción de contacto reglamentado y estrategia en pista.',
    image: siteMedia.instagram.gameRedPhoto,
    permalink: 'https://www.instagram.com/p/DE5KXoiRp7R/',
    mediaType: 'image',
    alt: 'Patinadoras de roller derby compitiendo con uniformes rojos'
  },
  {
    id: 'post-comunidad',
    title: 'Comunidad Nativas',
    description: 'Momentos de equipo fuera de la pista, con comunidad y celebración.',
    image: siteMedia.instagram.communityPhoto,
    permalink: 'https://www.instagram.com/p/DUlgfgbkeG9/',
    mediaType: 'image',
    alt: 'Grupo de integrantes de Nativas reunidas al aire libre con medallas'
  },
  {
    id: 'post-unidas',
    title: 'Nativas unidas',
    description: 'Fotografía grupal de Nativas vinculada a encuentros y comunidad.',
    image: siteMedia.instagram.unidasPhoto,
    permalink: 'https://www.instagram.com/p/DE74ZlYxQS-/',
    mediaType: 'image',
    alt: 'Integrantes de Nativas posando con patines bajo una estructura techada'
  }
]

export const instagramPostsRepository = {
  getAll: () => posts
}
