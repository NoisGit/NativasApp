export const siteConfig = {
  name: 'Nativas Roller Derby',
  shortName: 'Nativas',
  location: 'Temuco, Chile',
  city: 'Temuco',
  country: 'Chile',
  minimumAge: 18,
  instagramUrl: 'https://www.instagram.com/nativas_rollerderby/',
  publicSiteUrl: import.meta.env.VITE_PUBLIC_SITE_URL || 'https://noisgit.github.io/NativasApp/',
  formEndpoint: import.meta.env.VITE_APPLICATION_FORM_ENDPOINT || '',
  formProvider: import.meta.env.VITE_FORM_PROVIDER || 'formspree',
  recruitmentStatus: 'postulaciones abiertas',
  navigation: [
    { label: 'Inicio', to: '/', hash: 'inicio' },
    { label: 'Nativas', to: '/', hash: 'nativas' },
    { label: 'Roller Derby', to: '/', hash: 'roller-derby' },
    { label: 'Entrenamientos', to: '/', hash: 'entrenamientos' },
    { label: 'Preguntas', to: '/', hash: 'preguntas' }
  ],
  trainingSchedule: [
    { id: 'martes-campos', day: 'Martes', time: '20:00 a 21:30', place: 'Campos Deportivos' },
    { id: 'jueves-parque-estadio', day: 'Jueves', time: '20:00 a 21:30', place: 'Parque Estadio' },
    { id: 'domingo-pichicautin', day: 'Domingo', time: '09:00 a 10:00', place: 'Pichicautín' }
  ]
}
