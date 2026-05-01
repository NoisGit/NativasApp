import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Container, Section, SectionHeading } from '../../components/ui'
import { Footer } from '../../components/Footer'
import heroImage from '../../assets/roller.jpg'
import derbyImage from '../../assets/roller-derby.jpg'

const values = [
  {
    title: 'Fortaleza',
    description: 'Entrenamos con dureza, constancia y respeto por el proceso de cada persona.'
  },
  {
    title: 'Concentración',
    description: 'Roller derby exige foco, estrategia y conexión con el equipo dentro de la pista.'
  },
  {
    title: 'Renovación',
    description: 'Crecemos temporada a temporada, sin perder sensibilidad ni conexión con nuestra raíz.'
  }
]

const trainings = [
  {
    day: 'Martes',
    time: '20:00 a 21:30',
    place: 'Cancha Campos Deportivos'
  },
  {
    day: 'Jueves',
    time: '20:00 a 21:30',
    place: 'Pista de patinaje Parque Estadio'
  },
  {
    day: 'Domingo',
    time: '09:00 a 10:00',
    place: 'Multicancha Pichicautín'
  }
]

const steps = [
  'Completa el formulario de postulación.',
  'Revisamos tu información y disponibilidad.',
  'Te contactamos para contarte los próximos pasos.'
]

const faqs = [
  {
    question: '¿Necesito experiencia para postular?',
    answer: 'No. Puedes postular con o sin experiencia previa. Lo importante es tener disposición para aprender, entrenar y trabajar en equipo.'
  },
  {
    question: '¿Cuál es la edad mínima?',
    answer: 'La edad mínima para postular es 18 años.'
  },
  {
    question: '¿Dónde entrena Nativas?',
    answer: 'Entrenamos en Temuco: martes en Campos Deportivos, jueves en Parque Estadio y domingos en Pichicautín.'
  },
  {
    question: '¿Qué es el roller derby?',
    answer: 'Es un deporte de contacto, velocidad y estrategia sobre patines. Se juega en equipo y combina resistencia, táctica y comunicación.'
  }
]

export function Home () {
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className='min-h-screen overflow-hidden bg-nativas-night text-white'>
      <section className='relative isolate min-h-screen'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(102,221,219,0.20),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(47,46,176,0.28),transparent_30%),linear-gradient(135deg,#0D1015_0%,#0A131C_48%,#10131A_100%)]' />
        <div className='absolute left-1/2 top-20 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-nativas-turquoise/10 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96' />

        <Container className='flex min-h-screen flex-col'>
          <header className='flex items-center justify-between gap-4 py-5 sm:py-6'>
            <button type='button' onClick={() => navigate('/')} className='min-w-0 text-left'>
              <p className='truncate text-xs font-bold uppercase tracking-[0.28em] text-nativas-turquoise sm:text-sm sm:tracking-[0.35em]'>Nativas</p>
              <p className='text-[11px] text-nativas-mist sm:text-xs'>Roller Derby</p>
            </button>

            <nav className='hidden items-center gap-8 text-sm font-semibold text-nativas-mist lg:flex'>
              <button type='button' onClick={() => scrollToSection('about')} className='transition hover:text-white'>Equipo</button>
              <button type='button' onClick={() => scrollToSection('training')} className='transition hover:text-white'>Entrenamientos</button>
              <button type='button' onClick={() => scrollToSection('apply')} className='transition hover:text-white'>Postulación</button>
            </nav>

            <div className='flex items-center gap-2 sm:gap-3'>
              <Button variant='ghost' className='hidden sm:inline-flex' onClick={() => navigate('/login')}>
                Admin
              </Button>
              <Button className='px-4 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm' onClick={() => navigate('/solicitud')}>
                Postula
              </Button>
            </div>
          </header>

          <div className='grid flex-1 items-center gap-10 pb-14 pt-8 sm:gap-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20 xl:gap-16'>
            <div className='max-w-4xl'>
              <Badge>Temuco, Chile · Roller Derby</Badge>
              <h1 className='mt-7 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl'>
                Únete a Nativas y vive el roller derby desde adentro.
              </h1>
              <p className='mt-5 max-w-2xl text-base leading-8 text-nativas-mist sm:mt-6 sm:text-lg lg:text-xl'>
                Inquebrantables como la madre tierra. En esta nueva temporada reflejamos fortaleza y dureza, sin desligarnos de la sensibilidad y el constante crecimiento.
              </p>

              <div className='mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4'>
                <Button className='w-full sm:w-auto' onClick={() => navigate('/solicitud')}>
                  Postula ahora
                </Button>
                <Button variant='secondary' className='w-full sm:w-auto' onClick={() => scrollToSection('about')}>
                  Conoce al equipo
                </Button>
              </div>
            </div>

            <Card className='relative min-h-[320px] overflow-hidden p-0 sm:min-h-[420px]'>
              <img
                src={heroImage}
                alt='Persona practicando roller derby'
                className='absolute inset-0 h-full w-full object-cover opacity-70'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-nativas-night via-nativas-night/45 to-transparent' />
              <div className='relative flex min-h-[320px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-8'>
                <p className='text-xs font-bold uppercase tracking-[0.24em] text-nativas-turquoise sm:text-sm sm:tracking-[0.28em]'>18+ · Sin experiencia previa requerida</p>
                <p className='mt-4 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl'>
                  Entrena, aprende y encuentra tu lugar en la pista.
                </p>
                <p className='mt-4 max-w-sm text-sm leading-7 text-nativas-mist sm:text-base'>
                  El logo oficial se integrará más adelante. Por ahora mantenemos el diseño limpio y preparado para recibir los assets finales.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <Section id='about' className='bg-nativas-night-soft'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center xl:gap-14'>
            <div className='overflow-hidden rounded-3xl border border-nativas-border bg-nativas-deep-blue shadow-nativas-glow'>
              <img
                src={derbyImage}
                alt='Ilustración de roller derby usada en el proyecto'
                className='h-full max-h-[520px] w-full object-cover'
              />
            </div>

            <div>
              <SectionHeading
                eyebrow='Sobre Nativas'
                title='Roller derby desde Temuco, con identidad y comunidad.'
                description='Nativas Roller Derby es un equipo de Temuco que reúne deporte, estrategia y crecimiento colectivo. El espacio está abierto a personas mayores de 18 años, con o sin experiencia previa, que quieran aprender y entrenar con compromiso.'
              />

              <div className='mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
                {values.map((value) => (
                  <Card key={value.title} className='h-full'>
                    <h3 className='text-xl font-black text-white'>{value.title}</h3>
                    <p className='mt-4 leading-7 text-nativas-mist'>{value.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id='training'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start xl:gap-14'>
            <SectionHeading
              eyebrow='Entrenamientos'
              title='Tres espacios semanales para entrenar en Temuco.'
              description='Estos son los horarios base del equipo. La información puede ajustarse según temporada, actividades o disponibilidad de espacios.'
            />

            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {trainings.map((training) => (
                <Card key={training.day} className='p-5'>
                  <p className='text-sm font-bold uppercase tracking-[0.22em] text-nativas-turquoise'>{training.day}</p>
                  <h3 className='mt-3 text-2xl font-black text-white'>{training.time}</h3>
                  <p className='mt-3 leading-7 text-nativas-mist'>{training.place}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id='faq' className='bg-nativas-night-soft'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start xl:gap-14'>
            <SectionHeading
              eyebrow='Preguntas frecuentes'
              title='Lo básico antes de postular.'
              description='Si tienes dudas, estas respuestas te ayudan a entender mejor el proceso antes de enviar tu información.'
            />

            <div className='grid gap-5'>
              {faqs.map((faq) => (
                <Card key={faq.question} className='p-5'>
                  <h3 className='text-xl font-black text-white'>{faq.question}</h3>
                  <p className='mt-3 leading-7 text-nativas-mist'>{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id='apply'>
        <Container>
          <Card className='grid gap-10 p-6 sm:p-8 md:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center'>
            <div>
              <Badge>Proceso simple</Badge>
              <h2 className='mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl'>
                Postular debería sentirse claro desde el primer click.
              </h2>
              <p className='mt-5 leading-8 text-nativas-mist'>
                Si tienes 18 años o más, puedes postular con o sin experiencia. Revisaremos tus datos y nos pondremos en contacto contigo para contarte los próximos pasos.
              </p>
              <div className='mt-8'>
                <Button className='w-full sm:w-auto' onClick={() => navigate('/solicitud')}>Ir al formulario</Button>
              </div>
            </div>

            <div className='space-y-4'>
              {steps.map((step, index) => (
                <div key={step} className='flex gap-4 rounded-2xl border border-nativas-border bg-white/5 p-4'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nativas-turquoise font-black text-nativas-night'>
                    {index + 1}
                  </span>
                  <p className='pt-1 text-sm leading-7 text-nativas-mist sm:text-base'>{step}</p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
