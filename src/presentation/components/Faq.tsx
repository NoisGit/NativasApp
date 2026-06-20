import { useState } from 'react'
import { siteConfig } from '../../shared/config/siteConfig'

const faqs = [
  ['¿Necesito experiencia?', 'No es necesario partir sabiendo roller derby. El aprendizaje se aborda progresivamente y el equipo coordina los siguientes pasos según cada postulación.'],
  ['¿Cuál es la edad mínima?', `La postulación está orientada a personas desde ${siteConfig.minimumAge} años.`],
  ['¿Dónde entrenan?', 'Los horarios consideran Campos Deportivos, Parque Estadio y Pichicautín. Pueden cambiar, por lo que conviene revisar Instagram antes de asistir.'],
  ['¿Qué es el roller derby?', 'Es un deporte en patines que combina velocidad, estrategia, comunicación y contacto reglamentado entre equipos.'],
  ['¿Necesito tener patines?', 'Los requisitos de equipamiento se coordinan directamente con el equipo antes de la incorporación.'],
  ['¿Qué protecciones se utilizan?', 'El roller derby requiere implementos de seguridad. Antes de tu primera sesión, Nativas te indicará qué necesitarás y cómo prepararte.'],
  ['¿Cómo me contactarán?', 'El equipo usará los datos que envíes para coordinar los siguientes pasos por un canal adecuado.'],
  ['¿Puedo postular si nunca he practicado un deporte de contacto?', 'Sí puedes postular. El equipo evaluará tu información y te orientará sobre el proceso adecuado.'],
  ['¿Los horarios pueden cambiar?', 'Sí. Instagram es el canal público recomendado para revisar novedades y cambios.'],
  ['¿Qué debo llevar a mi primera sesión?', 'Ropa cómoda, hidratación y disposición para aprender. El equipo confirmará implementos y cuidados de seguridad antes de la sesión.']
]

export function Faq () {
  const [active, setActive] = useState<number | null>(0)

  return (
    <div className='faq-list'>
      {faqs.map(([question, answer], index) => {
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`
        const isOpen = active === index
        return (
          <div className='faq-item' key={question}>
            <button
              id={buttonId}
              type='button'
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setActive(isOpen ? null : index)}
            >
              <span>{question}</span>
              <span aria-hidden='true'>{isOpen ? '−' : '+'}</span>
            </button>
            <div id={panelId} className={`faq-panel ${isOpen ? 'is-open' : ''}`} role='region' aria-labelledby={buttonId} aria-hidden={!isOpen}>
              <div>
                <p>{answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
