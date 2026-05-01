import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Container, Section, SectionHeading } from '../../components/ui'
import { Footer } from '../../components/Footer'

export function Registrate () {
  const navigate = useNavigate()

  return (
    <main className='min-h-screen bg-nativas-night text-white'>
      <Section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,221,219,0.16),transparent_30%),linear-gradient(135deg,#0D1015_0%,#0A131C_50%,#10131A_100%)]' />
        <Container className='relative'>
          <div className='mx-auto max-w-3xl'>
            <Badge>Registro</Badge>
            <SectionHeading
              className='mt-6'
              title='Registro administrativo pausado.'
              description='El registro antiguo con Firebase fue retirado para evitar mantener código legacy. Esta sección volverá cuando implementemos Supabase Auth.'
            />

            <Card className='mt-8 p-6 sm:p-8'>
              <h2 className='text-2xl font-black text-white'>Flujo en refactor</h2>
              <p className='mt-4 leading-7 text-nativas-mist'>
                Por ahora no se crearán cuentas desde esta vista. El admin se rediseñará como una etapa separada, alineada con Supabase y las necesidades reales del proyecto.
              </p>
              <div className='mt-8'>
                <Button onClick={() => navigate('/')}>Volver a la landing</Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  )
}
