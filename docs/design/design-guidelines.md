# Guía de diseño Nativas Roller Derby

## Identidad

Usar logos oficiales locales sin redibujar, deformar, recolorear ni reemplazar por iniciales. Las variantes viven en `src/assets/brand/`. El logo actual se limpió para fondo transparente y se usa visualmente solo en el header; favicon y Open Graph mantienen la identidad en metadatos.

## Paleta

- Night: `#0D1015`
- Night soft: `#10131A`
- Deep blue: `#0A131C`
- Royal blue: `#2F2EB0`
- Turquoise: `#66DDDB`
- Aqua: `#76F8F8`
- Mist: `#CBD5E1`
- Border: `#2C2F38`
- White: `#FFFFFF`

El turquesa se usa como acento, no como color único dominante.

## Tipografía y jerarquía

Usar sistema sans-serif. Títulos contundentes, `letter-spacing: 0`, párrafos legibles y contraste alto. Evitar texto hero dentro de cards.

## Layout

Secciones amplias, grids responsivos, cards de radio máximo `8px`, sin cards anidadas. La landing debe funcionar desde `320px` sin scroll horizontal.

## Botones y controles

Botones con estados hover/focus visibles, altura táctil mínima de `44px`, iconos Lucide cuando aporten significado y texto claro para comandos principales.

## Fotografía y galería

Usar imágenes locales verificables, sin hotlinking a Instagram. La fotografía debe ser protagonista en hero y galería. Cada tarjeta debe tener `alt`, permalink original cuando esté confirmado y enlace externo seguro. No usar logos para rellenar tarjetas ni fotos genéricas de Google u otros equipos para representar a Nativas.

## Formulario

Labels visibles, ayudas breves, errores inline, contador de motivación, resumen accesible y foco en el primer error. El teléfono usa selector internacional con Chile por defecto y normalización E.164. Pronombres es un select opcional con campo adicional solo para “Otro”. No prometer cupo ni respuesta inmediata.

## Navegación

Header sticky, logo al inicio, menú móvil con `aria-expanded`, cierre con Escape y CTA único a `/postular`.

## Accesibilidad

Cumplir WCAG AA razonable: contraste, foco visible, landmarks, skip link, headings correctos, controles nativos y reduced motion.

## Animaciones

Usar GSAP por npm para secuencias y scroll motion, con `@gsap/react`, scopes y cleanup. Respetar `prefers-reduced-motion`. Los ScrollTriggers deben usar `once` o comportamiento equivalente para no esconder contenido al volver hacia arriba. El carrusel pausa con hover, foco y pestaña oculta, y su autoplay nunca debe modificar `window.scrollY`.

## Instagram

La galería usa publicaciones/fotografías locales verificables, no logos ni símbolos de perfil como reemplazo. No usa tokens privados.
