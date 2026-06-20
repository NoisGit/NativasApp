import type { InstagramPost } from '../../domain/instagram/instagramPost'
import postSymbol from '../../assets/instagram/nativas-post-01.png'
import postLogo from '../../assets/instagram/nativas-post-02.png'
import postProfile from '../../assets/instagram/nativas-post-03.png'
import trainingImage from '../../assets/gallery/nativas-training.jpg'
import heroImage from '../../assets/gallery/nativas-hero.jpg'

const posts: InstagramPost[] = [
  {
    id: 'post-power-trio',
    title: 'Power trio en la pista',
    description: 'Publicación oficial sobre compañeras de Nativas vinculadas a entrenamientos y selección.',
    image: trainingImage,
    permalink: 'https://www.instagram.com/nativas_rollerderby/p/DE5KXoiRp7R/',
    mediaType: 'image',
    alt: 'Patinadoras de roller derby durante una instancia de entrenamiento'
  },
  {
    id: 'post-amor-derby-2',
    title: 'Amor por el Derby',
    description: 'Encuentro derby en el sur con Nativas y equipos invitados.',
    image: heroImage,
    permalink: 'https://www.instagram.com/p/DUtE_nvEQFj/',
    mediaType: 'image',
    alt: 'Equipo de roller derby en una pista durante actividad deportiva'
  },
  {
    id: 'post-amor-derby-1',
    title: 'Partido en Temuco',
    description: 'Actividad deportiva difundida por Nativas para la comunidad derby.',
    image: trainingImage,
    permalink: 'https://www.instagram.com/p/DUrlQh_kTzg/',
    mediaType: 'image',
    alt: 'Escena de patinaje y estrategia de equipo'
  },
  {
    id: 'post-araucania-derby',
    title: 'Derby en La Araucanía',
    description: 'Convocatoria pública a una jornada de roller derby en el sur.',
    image: heroImage,
    permalink: 'https://www.instagram.com/p/DUlgfgbkeG9/',
    mediaType: 'image',
    alt: 'Patinadoras reunidas en una pista de la zona sur'
  },
  {
    id: 'post-nativas-logo',
    title: 'Identidad Nativas',
    description: 'Branding oficial utilizado como referencia visual del equipo.',
    image: postSymbol,
    permalink: 'https://www.instagram.com/nativas_rollerderby/',
    mediaType: 'image',
    alt: 'Símbolo gráfico oficial de Nativas Roller Derby'
  },
  {
    id: 'post-comunidad',
    title: 'Comunidad sobre ruedas',
    description: 'Registro editorial local para representar comunidad, aprendizaje y constancia.',
    image: postLogo,
    permalink: 'https://www.instagram.com/p/C8Pg2-fu_XT/',
    mediaType: 'image',
    alt: 'Logo oficial de Nativas usado como tarjeta de comunidad'
  },
  {
    id: 'post-temuco',
    title: 'Desde Temuco',
    description: 'Contenido público asociado a Nativas y su identidad territorial.',
    image: postProfile,
    permalink: 'https://www.instagram.com/p/C8UnuISOhm3/',
    mediaType: 'image',
    alt: 'Imagen de perfil oficial asociada a Nativas Roller Derby'
  },
  {
    id: 'post-roller-derby',
    title: 'Roller derby en movimiento',
    description: 'Selección editorial de actividad y cultura derby enlazada al Instagram oficial.',
    image: trainingImage,
    permalink: 'https://www.instagram.com/p/DE74ZlYxQS-/',
    mediaType: 'image',
    alt: 'Patinadora avanzando durante una sesión deportiva'
  }
]

export const instagramPostsRepository = {
  getAll: () => posts
}
