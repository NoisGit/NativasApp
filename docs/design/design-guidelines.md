# Guía de diseño Nativas Roller Derby

## Identidad

Usar logos oficiales locales sin redibujar, deformar, recolorear ni reemplazar por iniciales. Las variantes viven en `src/assets/brand/`. El logo principal actual se obtuvo desde la captura de Instagram aportada para este trabajo y se mantiene como raster.

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

Usar imágenes locales verificables, sin hotlinking a Instagram. Cada tarjeta debe tener `alt`, permalink original cuando esté confirmado y enlace externo seguro. No usar fotos genéricas de Google ni de otros equipos para representar a Nativas.

## Formulario

Labels visibles, ayudas breves, errores inline, contador de motivación, resumen accesible y foco en el primer error. No prometer cupo ni respuesta inmediata.

## Navegación

Header sticky, logo al inicio, menú móvil con `aria-expanded`, cierre con Escape y CTA único a `/postular`.

## Accesibilidad

Cumplir WCAG AA razonable: contraste, foco visible, landmarks, skip link, headings correctos, controles nativos y reduced motion.

## Animaciones

Usar GSAP por npm para secuencias y scroll motion, con `@gsap/react`, scopes y cleanup. Respetar `prefers-reduced-motion`. El carrusel pausa con hover, foco y pestaña oculta.

## Instagram

La galería es editorial local. No se presenta como feed en vivo y no usa tokens privados.
