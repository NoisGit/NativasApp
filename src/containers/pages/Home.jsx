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
    <main ref={landingRef} className='min-h-screen overflow-hidden bg-nativas-night text-white selection:bg-nativas-turquoise selection:text-nativas-night'>
      <section className='relative isolate min-h-screen overflow-hidden'>
        <div className='absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_12%,rgba(102,221,219,0.28),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(47,46,176,0.36),transparent_34%),linear-gradient(135deg,#050608_0%,#0D1015_44%,#151039_100%)]' />
        <div className='absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-nativas-turquoise/10 to-transparent' />
        <div data-parallax data-speed='18' className='absolute -left-28 top-28 -z-10 h-80 w-80 rounded-full border border-nativas-turquoise/20 bg-nativas-turquoise/10 blur-2xl' />
        <div data-parallax data-speed='28' className='absolute -right-20 bottom-10 -z-10 h-96 w-96 rounded-full border border-nativas-royal/30 bg-nativas-royal/25 blur-3xl' />
        <div className='absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]' />

        <Container className='flex min-h-screen flex-col'>
          <header data-animate className='flex items-center justify-between gap-4 py-5 sm:py-6'>
            <button type='button' onClick={() => navigate('/')} className='group min-w-0 text-left'>
              <span className='flex items-center gap-3'>
                <span className='grid h-11 w-11 place-items-center rounded-full border border-nativas-turquoise/40 bg-white/5 text-sm font-black text-nativas-turquoise shadow-nativas-glow transition group-hover:scale-105'>N</span>
                <span>
                  <span className='block truncate text-xs font-black uppercase tracking-[0.34em] text-white sm:text-sm sm:tracking-[0.42em]'>Nativas</span>
                  <span className='block text-[11px] uppercase tracking-[0.24em] text-nativas-mist sm:text-xs'>Roller Derby</span>
                </span>
              </span>
            </button>

            <nav className='hidden rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-nativas-mist shadow-2xl shadow-black/20 backdrop-blur-xl lg:flex lg:items-center lg:gap-6'>
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

          <div className='grid flex-1 items-center gap-10 pb-14 pt-8 sm:gap-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20 xl:gap-16'>
            <div className='relative z-10 max-w-4xl'>
              <div data-animate>
                <Badge>Temuco, Chile · Reclutamiento abierto</Badge>
              </div>
              <h1 data-animate className='mt-7 max-w-5xl text-5xl font-black tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl xl:text-9xl'>
                No vengas a mirar la pista. Ven a tomarla.
              </h1>
              <p data-animate className='mt-5 max-w-2xl text-base leading-8 text-nativas-mist sm:mt-6 sm:text-lg lg:text-xl'>
                Nativas es roller derby desde Temuco: contacto, estrategia, comunidad y una energía que se entrena dentro y fuera de la cancha.
              </p>

              <div data-animate className='mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4'>
                <Button className='w-full sm:w-auto' onClick={() => navigate('/solicitud')}>
                  Postula ahora
                </Button>
                <Button variant='secondary' className='w-full sm:w-auto' onClick={() => scrollToSection('about')}>
                  Ver identidad del equipo
                </Button>
              </div>

              <div data-animate className='mt-10 grid gap-3 sm:grid-cols-3'>
                {stats.map((stat) => (
                  <div key={stat.label} className='rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl'>
                    <p className='text-3xl font-black text-nativas-turquoise'>{stat.value}</p>
                    <p className='mt-2 text-xs font-bold uppercase tracking-[0.18em] text-nativas-mist'>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-hero-visual className='relative mx-auto w-full max-w-[560px] lg:max-w-none'>
              <div data-float className='absolute -left-4 top-10 z-20 hidden rounded-3xl border border-nativas-turquoise/30 bg-nativas-night/80 p-4 shadow-nativas-glow backdrop-blur-xl sm:block lg:-left-10'>
                <p className='text-xs font-bold uppercase tracking-[0.22em] text-nativas-turquoise'>Sin experiencia</p>
                <p className='mt-2 text-sm text-nativas-mist'>Entramos juntas al proceso.</p>
              </div>

              <Card className='relative min-h-[430px] overflow-hidden p-0 sm:min-h-[560px] lg:rotate-2'>
                <img
                  src={heroImage}
                  alt='Persona practicando roller derby'
                  className='absolute inset-0 h-full w-full scale-105 object-cover opacity-85'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-nativas-night via-nativas-night/35 to-transparent' />
                <div className='absolute left-6 right-6 top-6 flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl'>
                  <span className='text-xs font-black uppercase tracking-[0.24em] text-nativas-turquoise'>Jam ready</span>
                  <span className='h-2 w-2 rounded-full bg-nativas-aqua shadow-[0_0_20px_rgba(118,248,248,0.95)]' />
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8'>
                  <div className='mb-5 h-1.5 overflow-hidden rounded-full bg-white/10'>
                    <div data-track-fill className='h-full rounded-full bg-nativas-turquoise' />
                  </div>
                  <p className='text-xs font-black uppercase tracking-[0.28em] text-nativas-turquoise sm:text-sm'>18+ · Postulación abierta</p>
                  <p className='mt-4 text-3xl font-black leading-none text-white sm:text-5xl'>Aprende la táctica. Siente la velocidad.</p>
                </div>
              </Card>

              <div data-float className='absolute -bottom-5 right-3 z-20 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:right-8'>
                <p className='text-4xl font-black text-white'>RD</p>
                <p className='text-xs font-bold uppercase tracking-[0.2em] text-nativas-mist'>Roller Derby</p>
              </div>
            </div>
          </div>
        </Container>

        <div className='relative border-y border-white/10 bg-white/[0.035] py-4 backdrop-blur-xl'>
          <div data-marquee className='flex w-[200%] gap-6 whitespace-nowrap text-sm font-black uppercase tracking-[0.28em] text-nativas-mist/70'>
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className='flex items-center gap-6'>
                {item}
                <span className='h-1.5 w-1.5 rounded-full bg-nativas-turquoise' />
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section id='about' className='relative bg-nativas-night-soft'>
        <div data-parallax data-speed='12' className='absolute right-0 top-8 h-80 w-80 rounded-full bg-nativas-turquoise/10 blur-3xl' />
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center xl:gap-14'>
            <div data-reveal className='relative overflow-hidden rounded-[2rem] border border-nativas-border bg-nativas-deep-blue shadow-nativas-glow'>
              <img
                src={derbyImage}
                alt='Ilustración de roller derby usada en el proyecto'
                className='h-full max-h-[620px] w-full object-cover saturate-125'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-nativas-night/80 via-transparent to-transparent' />
              <div className='absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl'>
                <p className='text-xs font-black uppercase tracking-[0.28em] text-nativas-turquoise'>Identidad Nativas</p>
                <p className='mt-3 text-2xl font-black text-white'>Dureza, raíz y comunidad en movimiento.</p>
              </div>
            </div>

            <div data-reveal>
              <SectionHeading
                eyebrow='Sobre Nativas'
                title='Roller derby con una identidad que no se siente prestada.'
                description='Nativas Roller Derby es un equipo de Temuco que reúne deporte, estrategia y crecimiento colectivo. El espacio está abierto a personas mayores de 18 años, con o sin experiencia previa, que quieran aprender y entrenar con compromiso.'
              />

              <div data-stagger className='mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'>
                {values.map((value) => (
                  <Card key={value.title} data-stagger-item className='group relative h-full overflow-hidden'>
                    <div className='absolute right-5 top-5 rounded-full border border-nativas-turquoise/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-nativas-turquoise/80'>
                      {value.metric}
                    </div>
                    <h3 className='pr-20 text-2xl font-black text-white'>{value.title}</h3>
                    <p className='mt-5 leading-7 text-nativas-mist'>{value.description}</p>
                    <div className='mt-7 h-px w-full bg-gradient-to-r from-nativas-turquoise/80 to-transparent transition group-hover:w-2/3' />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id='training' className='relative'>
        <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nativas-turquoise/50 to-transparent' />
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start xl:gap-14'>
            <div data-reveal>
              <SectionHeading
                eyebrow='Entrenamientos'
                title='Tres momentos semanales para pasar del interés a la pista.'
                description='Estos son los horarios base del equipo. La información puede ajustarse según temporada, actividades o disponibilidad de espacios.'
              />
            </div>

            <div data-stagger className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {trainings.map((training, index) => (
                <Card key={training.day} data-stagger-item className='group relative min-h-[280px] overflow-hidden p-5'>
                  <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-nativas-turquoise/10 blur-2xl transition group-hover:bg-nativas-turquoise/20' />
                  <p className='text-xs font-black uppercase tracking-[0.24em] text-nativas-turquoise'>{training.tag}</p>
                  <p className='mt-8 text-7xl font-black leading-none text-white/10'>0{index + 1}</p>
                  <h3 className='mt-6 text-2xl font-black text-white'>{training.day}</h3>
                  <p className='mt-2 text-xl font-black text-nativas-turquoise'>{training.time}</p>
                  <p className='mt-4 leading-7 text-nativas-mist'>{training.place}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id='faq' className='relative bg-nativas-night-soft'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start xl:gap-14'>
            <div data-reveal>
              <SectionHeading
                eyebrow='Preguntas frecuentes'
                title='Lo básico antes de postular.'
                description='Si tienes dudas, estas respuestas te ayudan a entender mejor el proceso antes de enviar tu información.'
              />
            </div>

            <div data-stagger className='grid gap-5'>
              {faqs.map((faq) => (
                <Card key={faq.question} data-stagger-item className='p-5'>
                  <h3 className='text-xl font-black text-white'>{faq.question}</h3>
                  <p className='mt-3 leading-7 text-nativas-mist'>{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id='apply' className='relative'>
        <div data-parallax data-speed='18' className='absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-nativas-royal/20 blur-3xl' />
        <Container>
          <Card data-reveal className='relative grid gap-10 overflow-hidden p-6 sm:p-8 md:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center'>
            <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(102,221,219,0.14),transparent_30%),radial-gradient(circle_at_82%_80%,rgba(47,46,176,0.26),transparent_34%)]' />
            <div>
              <Badge>Proceso simple</Badge>
              <h2 className='mt-6 text-4xl font-black tracking-[-0.04em] text-white sm:text-6xl'>
                Postular debería sentirse como entrar a una nueva etapa.
              </h2>
              <p className='mt-5 leading-8 text-nativas-mist'>
                Si tienes 18 años o más, puedes postular con o sin experiencia. Revisaremos tus datos y nos pondremos en contacto contigo para contarte los próximos pasos.
              </p>
              <div className='mt-8'>
                <Button className='w-full sm:w-auto' onClick={() => navigate('/solicitud')}>Ir al formulario</Button>
              </div>
            </div>

            <div data-stagger className='grid gap-4'>
              {steps.map((step) => (
                <div key={step.number} data-stagger-item className='group flex gap-4 rounded-3xl border border-nativas-border bg-white/[0.045] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-nativas-turquoise/40 hover:bg-nativas-turquoise/10'>
                  <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-nativas-turquoise font-black text-nativas-night shadow-nativas-glow'>
                    {step.number}
                  </span>
                  <div>
                    <h3 className='text-lg font-black text-white'>{step.title}</h3>
                    <p className='mt-2 text-sm leading-7 text-nativas-mist sm:text-base'>{step.description}</p>
                  </div>
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
