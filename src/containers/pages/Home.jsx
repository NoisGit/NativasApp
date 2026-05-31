import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Container, Section, SectionHeading } from '../../components/ui'
import { Footer } from '../../components/Footer'
import { useCinematicLanding } from '../../hooks/useCinematicLanding'
import heroImage from '../../assets/roller.jpg'
import derbyImage from '../../assets/roller-derby.jpg'

const values = [
  {
    title: 'Fortaleza',
    description: 'Entrenamos con dureza, constancia y respeto por el proceso de cada persona.',
    metric: 'Fuerza'
  },
  {
    title: 'Concentración',
    description: 'Roller derby exige foco, estrategia y conexión con el equipo dentro de la pista.',
    metric: 'Foco'
  },
  {
    title: 'Renovación',
    description: 'Crecemos temporada a temporada, sin perder sensibilidad ni conexión con nuestra raíz.',
    metric: 'Raíz'
  }
]

const trainings = [
  {
    day: 'Martes',
    time: '20:00 a 21:30',
    place: 'Cancha Campos Deportivos',
    tag: 'Técnica'
  },
  {
    day: 'Jueves',
    time: '20:00 a 21:30',
    place: 'Pista de patinaje Parque Estadio',
    tag: 'Pista'
  },
  {
    day: 'Domingo',
    time: '09:00 a 10:00',
    place: 'Multicancha Pichicautín',
    tag: 'Resistencia'
  }
]

const steps = [
  {
    number: '01',
    title: 'Envía tus datos',
    description: 'Completa el formulario de postulación con tu disponibilidad y datos de contacto.'
  },
  {
    number: '02',
    title: 'Revisamos tu perfil',
    description: 'Validamos edad, disponibilidad y el mejor camino para integrarte al proceso.'
  },
  {
    number: '03',
    title: 'Entrena con Nativas',
    description: 'Te contactamos para contarte los próximos pasos y fechas de incorporación.'
  }
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

const stats = [
  { value: '03', label: 'entrenamientos semanales' },
  { value: '18+', label: 'edad mínima para postular' },
  { value: '0', label: 'experiencia previa requerida' }
]

const marqueeItems = [
  'Roller derby',
  'Temuco',
  'Comunidad',
  'Fortaleza',
  'Estrategia',
  'Pista',
  'Equipo',
  'Nativas'
]

export function Home () {
  const navigate = useNavigate()
  const landingRef = useRef(null)

  useCinematicLanding(landingRef)

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main ref={landingRef} className='min-h-screen overflow-x-hidden bg-nativas-night text-white selection:bg-nativas-turquoise selection:text-nativas-night'>
      <section className='relative isolate overflow-hidden bg-nativas-night'>
        <div className='absolute left-0 top-0 -z-10 h-full w-px bg-nativas-turquoise/30 sm:left-8' />
        <div className='absolute right-0 top-0 -z-10 hidden h-full w-px bg-white/10 lg:block' />

        <Container className='flex min-h-[auto] flex-col lg:min-h-screen'>
          <header data-animate className='flex flex-wrap items-center justify-between gap-3 py-4 sm:py-6'>
            <button type='button' onClick={() => navigate('/')} className='group min-w-0 text-left'>
              <span className='flex items-center gap-3'>
                <span className='grid h-10 w-10 place-items-center rounded-full border border-nativas-turquoise/50 bg-nativas-deep-blue text-sm font-black text-nativas-turquoise transition group-hover:scale-105 sm:h-11 sm:w-11'>N</span>
                <span>
                  <span className='block truncate text-xs font-black uppercase tracking-[0.28em] text-white sm:text-sm sm:tracking-[0.42em]'>Nativas</span>
                  <span className='block text-[10px] uppercase tracking-[0.22em] text-nativas-mist sm:text-xs'>Roller Derby</span>
                </span>
              </span>
            </button>

            <div className='flex items-center gap-2 sm:gap-3'>
              <Button variant='ghost' className='hidden sm:inline-flex' onClick={() => navigate('/login')}>
                Admin
              </Button>
              <Button className='px-4 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm' onClick={() => navigate('/solicitud')}>
                Postula
              </Button>
            </div>

            <nav className='order-3 flex w-full gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.035] p-2 text-xs font-bold uppercase tracking-[0.16em] text-nativas-mist sm:w-auto sm:gap-3 sm:rounded-full sm:px-4 sm:text-sm sm:normal-case sm:tracking-normal lg:order-none'>
              <button type='button' onClick={() => scrollToSection('about')} className='shrink-0 rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white'>Equipo</button>
              <button type='button' onClick={() => scrollToSection('training')} className='shrink-0 rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white'>Entrenamientos</button>
              <button type='button' onClick={() => scrollToSection('apply')} className='shrink-0 rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white'>Postulación</button>
            </nav>
          </header>

          <div className='grid flex-1 items-center gap-8 pb-12 pt-6 sm:gap-12 sm:pb-16 sm:pt-10 lg:grid-cols-[1fr_0.92fr] lg:py-20 xl:gap-16'>
            <div className='relative z-10 max-w-4xl'>
              <div data-animate>
                <Badge>Temuco, Chile · Reclutamiento abierto</Badge>
              </div>

              <div data-animate className='mt-6 border-l-4 border-nativas-turquoise pl-4 sm:mt-8 sm:pl-6'>
                <p className='mb-3 text-xs font-black uppercase tracking-[0.32em] text-nativas-turquoise sm:text-sm'>Temporada Nativas</p>
                <h1 className='max-w-5xl text-4xl font-black leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-8xl'>
                  No vengas a mirar la pista. Ven a tomarla.
                </h1>
              </div>

              <p data-animate className='mt-5 max-w-2xl text-base leading-8 text-nativas-mist sm:mt-6 sm:text-lg lg:text-xl'>
                Nativas es roller derby desde Temuco: contacto, estrategia, comunidad y una energía que se entrena dentro y fuera de la cancha.
              </p>

              <div data-animate className='mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4'>
                <Button className='w-full sm:w-auto' onClick={() => navigate('/solicitud')}>
                  Postula ahora
                </Button>
                <Button variant='secondary' className='w-full sm:w-auto' onClick={() => scrollToSection('about')}>
                  Ver identidad del equipo
                </Button>
              </div>

              <div data-animate className='mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3'>
                {stats.map((stat) => (
                  <div key={stat.label} className='rounded-2xl border border-white/10 bg-nativas-night-soft p-4 sm:rounded-3xl'>
                    <p className='text-3xl font-black text-nativas-turquoise sm:text-4xl'>{stat.value}</p>
                    <p className='mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-nativas-mist sm:text-xs'>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-hero-visual className='relative mx-auto w-full max-w-[520px] lg:max-w-none'>
              <div className='mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-nativas-night-soft px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-nativas-mist sm:hidden'>
                <span>18+</span>
                <span className='text-nativas-turquoise'>Sin experiencia previa</span>
              </div>

              <div className='relative overflow-hidden rounded-[1.8rem] border border-nativas-border bg-nativas-night-soft p-2 shadow-nativas-glow sm:rounded-[2.4rem] sm:p-3 lg:-rotate-1'>
                <div className='relative min-h-[320px] overflow-hidden rounded-[1.35rem] bg-nativas-deep-blue sm:min-h-[500px] sm:rounded-[1.9rem]'>
                  <img
                    src={heroImage}
                    alt='Persona practicando roller derby'
                    className='absolute inset-0 h-full w-full object-cover opacity-90'
                  />
                  <div className='absolute inset-x-0 bottom-0 bg-nativas-night/85 p-5 sm:p-7'>
                    <div className='mb-4 h-1.5 overflow-hidden rounded-full bg-white/10'>
                      <div data-track-fill className='h-full rounded-full bg-nativas-turquoise' />
                    </div>
                    <p className='text-xs font-black uppercase tracking-[0.28em] text-nativas-turquoise'>18+ · Postulación abierta</p>
                    <p className='mt-3 text-2xl font-black leading-none text-white sm:text-4xl'>Aprende la táctica. Siente la velocidad.</p>
                  </div>
                </div>
              </div>

              <div data-float className='absolute -right-1 -top-4 hidden rounded-2xl border border-nativas-turquoise/30 bg-nativas-night px-4 py-3 shadow-nativas-glow sm:block'>
                <p className='text-xs font-bold uppercase tracking-[0.22em] text-nativas-turquoise'>Sin experiencia</p>
                <p className='mt-1 text-sm text-nativas-mist'>Entramos juntas al proceso.</p>
              </div>
            </div>
          </div>
        </Container>

        <div className='relative border-y border-white/10 bg-nativas-night-soft py-3 sm:py-4'>
          <div data-marquee className='flex w-[220%] gap-5 whitespace-nowrap text-xs font-black uppercase tracking-[0.24em] text-nativas-mist/70 sm:w-[200%] sm:text-sm'>
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className='flex items-center gap-5'>
                {item}
                <span className='h-1.5 w-1.5 rounded-full bg-nativas-turquoise' />
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section id='about' className='relative bg-nativas-night-soft'>
        <Container>
          <div className='grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center xl:gap-14'>
            <div data-reveal className='relative overflow-hidden rounded-[1.8rem] border border-nativas-border bg-nativas-deep-blue sm:rounded-[2.2rem]'>
              <img
                src={derbyImage}
                alt='Ilustración de roller derby usada en el proyecto'
                className='h-[320px] w-full object-cover sm:h-[520px] lg:h-[620px]'
              />
              <div className='absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-nativas-night/90 p-4 sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-3xl sm:p-5'>
                <p className='text-xs font-black uppercase tracking-[0.24em] text-nativas-turquoise sm:tracking-[0.28em]'>Identidad Nativas</p>
                <p className='mt-3 text-xl font-black text-white sm:text-2xl'>Dureza, raíz y comunidad en movimiento.</p>
              </div>
            </div>

            <div data-reveal>
              <SectionHeading
                eyebrow='Sobre Nativas'
                title='Roller derby con una identidad que no se siente prestada.'
                description='Nativas Roller Derby es un equipo de Temuco que reúne deporte, estrategia y crecimiento colectivo. El espacio está abierto a personas mayores de 18 años, con o sin experiencia previa, que quieran aprender y entrenar con compromiso.'
              />

              <div data-stagger className='mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
                {values.map((value) => (
                  <div key={value.title} data-stagger-item>
                    <Card className='group relative h-full overflow-hidden p-5 sm:p-6'>
                      <div className='mb-6 inline-flex rounded-full border border-nativas-turquoise/25 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-nativas-turquoise/90'>
                        {value.metric}
                      </div>
                      <h3 className='text-2xl font-black text-white'>{value.title}</h3>
                      <p className='mt-4 leading-7 text-nativas-mist'>{value.description}</p>
                      <div className='mt-6 h-px w-16 bg-nativas-turquoise transition group-hover:w-24' />
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id='training' className='relative bg-nativas-night'>
        <Container>
          <div className='grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start xl:gap-14'>
            <div data-reveal>
              <SectionHeading
                eyebrow='Entrenamientos'
                title='Tres momentos semanales para pasar del interés a la pista.'
                description='Estos son los horarios base del equipo. La información puede ajustarse según temporada, actividades o disponibilidad de espacios.'
              />
            </div>

            <div data-stagger className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {trainings.map((training, index) => (
                <div key={training.day} data-stagger-item>
                  <Card className='group relative min-h-[230px] overflow-hidden p-5 sm:min-h-[280px]'>
                    <div className='flex items-center justify-between gap-3'>
                      <p className='text-xs font-black uppercase tracking-[0.22em] text-nativas-turquoise'>{training.tag}</p>
                      <p className='text-5xl font-black leading-none text-white/10'>0{index + 1}</p>
                    </div>
                    <h3 className='mt-8 text-2xl font-black text-white'>{training.day}</h3>
                    <p className='mt-2 text-xl font-black text-nativas-turquoise'>{training.time}</p>
                    <p className='mt-4 leading-7 text-nativas-mist'>{training.place}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id='faq' className='relative bg-nativas-night-soft'>
        <Container>
          <div className='grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start xl:gap-14'>
            <div data-reveal>
              <SectionHeading
                eyebrow='Preguntas frecuentes'
                title='Lo básico antes de postular.'
                description='Si tienes dudas, estas respuestas te ayudan a entender mejor el proceso antes de enviar tu información.'
              />
            </div>

            <div data-stagger className='grid gap-4'>
              {faqs.map((faq) => (
                <div key={faq.question} data-stagger-item>
                  <Card className='p-5'>
                    <h3 className='text-lg font-black text-white sm:text-xl'>{faq.question}</h3>
                    <p className='mt-3 leading-7 text-nativas-mist'>{faq.answer}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id='apply' className='relative bg-nativas-night'>
        <Container>
          <div data-reveal className='rounded-[1.8rem] border border-nativas-border bg-nativas-night-soft p-5 sm:rounded-[2.2rem] sm:p-8 md:p-10'>
            <div className='grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center'>
              <div>
                <Badge>Proceso simple</Badge>
                <h2 className='mt-5 text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:mt-6 sm:text-5xl lg:text-6xl'>
                  Postular debería sentirse como entrar a una nueva etapa.
                </h2>
                <p className='mt-5 leading-8 text-nativas-mist'>
                  Si tienes 18 años o más, puedes postular con o sin experiencia. Revisaremos tus datos y nos pondremos en contacto contigo para contarte los próximos pasos.
                </p>
                <div className='mt-7 sm:mt-8'>
                  <Button className='w-full sm:w-auto' onClick={() => navigate('/solicitud')}>Ir al formulario</Button>
                </div>
              </div>

              <div data-stagger className='grid gap-4'>
                {steps.map((step) => (
                  <div key={step.number} data-stagger-item className='group flex gap-4 rounded-2xl border border-nativas-border bg-nativas-night p-4 transition hover:border-nativas-turquoise/40 sm:rounded-3xl sm:p-5'>
                    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-nativas-turquoise font-black text-nativas-night sm:h-12 sm:w-12'>
                      {step.number}
                    </span>
                    <div>
                      <h3 className='text-base font-black text-white sm:text-lg'>{step.title}</h3>
                      <p className='mt-2 text-sm leading-7 text-nativas-mist sm:text-base'>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
