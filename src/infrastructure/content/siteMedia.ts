import logoHeader from '../../assets/brand/nativas-logo-header-horizontal.webp'
import logoFooter from '../../assets/brand/nativas-logo-footer-horizontal.webp'
import heroPhoto from '../../assets/media/nativas-hero.webp'
import aboutPhoto from '../../assets/media/nativas-about.webp'
import benchPhoto from '../../assets/instagram/nativas-bench.webp'
import packPhoto from '../../assets/instagram/nativas-pack.webp'
import gameRedPhoto from '../../assets/instagram/nativas-game-red.webp'
import communityPhoto from '../../assets/instagram/nativas-community.webp'
import unidasPhoto from '../../assets/instagram/nativas-unidas.webp'

export const siteMedia = {
  logoHeader,
  logoFooter,
  heroPhoto,
  aboutPhoto,
  instagram: {
    benchPhoto,
    packPhoto,
    gameRedPhoto,
    communityPhoto,
    unidasPhoto
  },
  replaceableFiles: [
    'src/assets/media/nativas-hero.webp',
    'src/assets/media/nativas-about.webp',
    'src/assets/instagram/nativas-bench.webp',
    'src/assets/instagram/nativas-pack.webp',
    'src/assets/instagram/nativas-game-red.webp',
    'src/assets/instagram/nativas-community.webp',
    'src/assets/instagram/nativas-unidas.webp'
  ]
} as const
