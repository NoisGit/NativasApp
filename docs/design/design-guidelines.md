# NativasApp design guidelines

Guía visual base para rediseñar NativasApp usando las referencias reales del Instagram del equipo.

## Regla importante

Por ahora no se deben usar logos oficiales dentro de la app.

Los logos y capturas compartidas se usan solo como referencia para definir colores, estilo y vibra visual. Los archivos oficiales se agregarán manualmente al repositorio más adelante.

Mientras tanto, la interfaz debe usar placeholders limpios y espacios preparados para integrar el logo después.

## Objetivo visual

La landing debe sentirse moderna, fuerte y cercana. No debe parecer una plantilla genérica de deporte.

La marca transmite:

- energía
- comunidad
- mística
- naturaleza
- identidad local
- fuerza colectiva

## Paleta base

| Token | Hex | Uso |
| --- | --- | --- |
| Night | `#0D1015` | Fondo principal oscuro |
| Night soft | `#10131A` | Fondos secundarios |
| Deep blue | `#0A131C` | Cards, overlays y paneles |
| Royal blue | `#2F2EB0` | Acentos fuertes |
| Turquoise | `#66DDDB` | Color principal de marca |
| Aqua light | `#76F8F8` | Detalles, glow y microacentos |
| White | `#FFFFFF` | Texto principal |
| Mist | `#CBD5E1` | Texto secundario |
| Border | `#2C2F38` | Bordes suaves |

## Uso recomendado de color

- Usar fondos oscuros como base.
- Usar turquesa para CTAs, detalles y estados activos.
- Usar azul violeta como acento secundario.
- No saturar toda la interfaz con turquesa.
- Mantener buen contraste entre texto y fondo.

## Dirección visual

La UI debe usar:

- secciones oscuras e inmersivas
- gradientes suaves azul/turquesa
- cards redondeadas
- bordes sutiles
- botones con alto contraste
- espacios grandes y limpios
- placeholders visuales intencionales

Evitar:

- colores cálidos que no pertenecen a la marca
- exceso de efectos
- imágenes stock sin relación con roller derby
- tipografías decorativas en textos largos
- logos temporales inventados

## Tipografía

Para la interfaz usar una tipografía limpia y legible.

La tipografía decorativa del Instagram puede inspirar títulos especiales, pero no debe usarse para todo el sitio.

Uso recomendado:

- títulos grandes y claros
- párrafos cortos
- frases destacadas con personalidad
- navegación simple y legible

## Espacios para logo futuro

Como aún no usaremos logo en la app:

- dejar espacio reservado en header o hero si corresponde
- usar texto `Nativas Roller Derby` como marca temporal
- evitar imágenes falsas o logos improvisados
- documentar dónde se debe integrar el logo cuando esté disponible
- mantener el diseño funcionando bien sin logo

## Hero

El hero debe comunicar rápido:

- Nativas Roller Derby
- Temuco, Chile
- comunidad, entrenamiento y postulación

Estructura sugerida:

1. `Temuco, Chile · Roller Derby`
2. `Únete a Nativas`
3. texto corto sobre comunidad, fuerza y crecimiento
4. CTA principal: `Postula ahora`
5. CTA secundario: `Conoce al equipo`

## Componentes base

Crear componentes reutilizables con esta estética:

- `Container`
- `Section`
- `Button`
- `Badge`
- `Card`
- `SectionHeading`

## Botones

### Primario

- fondo turquesa
- texto oscuro
- borde redondeado
- hover con tono más profundo

Textos sugeridos:

- `Postula ahora`
- `Quiero unirme`
- `Comienza tu postulación`

### Secundario

- fondo oscuro o transparente
- borde turquesa/blanco
- hover suave

Textos sugeridos:

- `Conoce al equipo`
- `Ver noticias`
- `Ir a Instagram`

## Secciones sugeridas

1. Hero
2. Sobre Nativas
3. Qué es Roller Derby
4. Valores del equipo
5. Por qué unirte
6. Entrenamientos y comunidad
7. Noticias
8. Proceso de postulación
9. Preguntas frecuentes
10. CTA final

## Formularios

Los formularios deben sentirse modernos y confiables:

- labels visibles
- inputs altos
- focus ring turquesa
- errores inline
- estado de éxito claro
- checkbox de privacidad

## Accesibilidad

- contraste alto
- foco visible
- textos alternativos en imágenes
- botones cómodos en mobile
- no depender solo del color para errores

## Movimiento

Usar animaciones sutiles:

- entrada del hero
- hover de cards
- reveal suave de secciones
- feedback en botones

Evitar animaciones permanentes o que dificulten leer.
