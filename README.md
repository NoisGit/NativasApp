# Nativas Roller Derby

Landing page profesional para Nativas Roller Derby, equipo de roller derby de Temuco, Chile. El proyecto está preparado para portfolio y despliegue estático en GitHub Pages:

https://noisgit.github.io/NativasApp/

## Objetivo

Transformar el proyecto en una experiencia frontend completa: identidad visual, contenido educativo, entrenamientos, galería editorial de Instagram, formulario de postulación, privacidad, accesibilidad, SEO, seguridad frontend y validaciones.

No existe base de datos, backend propio, autenticación ni panel administrativo.

## Funcionalidades

- Landing pública con secciones de Nativas, roller derby, roles, beneficios, preparación, entrenamientos, Instagram, proceso, FAQ y CTA.
- Rutas públicas: `/`, `/postular`, `/privacidad` usando `HashRouter` para compatibilidad con GitHub Pages.
- Formulario de postulación con validación de dominio, teléfono chileno normalizado, edad mínima, disponibilidad, motivación, privacidad, honeypot y prevención de doble envío.
- Envío real mediante endpoint público configurable: `VITE_APPLICATION_FORM_ENDPOINT`.
- Galería editorial local basada en publicaciones públicas de Instagram, sin tokens ni scraping runtime.
- Carrusel con autoplay, anterior/siguiente, indicadores, pausa por hover/focus/visibilidad, teclado, swipe y reduced motion.
- SEO con Open Graph, Twitter Card, canonical, robots, sitemap, JSON-LD y favicon.
- CI y deploy con GitHub Actions.

## Stack

- React 18
- TypeScript estricto
- Vite
- Tailwind CSS
- React Router
- Lucide React
- GSAP + @gsap/react
- Vitest
- React Testing Library
- Playwright
- ESLint

## Arquitectura DDD pragmática

```text
src/
  domain/
    application/
    instagram/
    shared/
  application/
    application-form/
    instagram-gallery/
  infrastructure/
    content/
    form/
  presentation/
    components/
    hooks/
    layouts/
    pages/
  shared/
    config/
  assets/
    brand/
    gallery/
    instagram/
```

`domain` contiene reglas puras. `application` contiene casos de uso. `infrastructure` contiene adaptadores y contenido local. `presentation` contiene React, estados visuales e interacción.

## Instalación

```bash
npm ci
```

## Desarrollo

```bash
npm run dev
```

## Validación

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run test:e2e
npm run validate
```

`lint` no modifica archivos. Para autocorrecciones explícitas existe `npm run lint:fix`.

## Variables públicas

```env
VITE_APPLICATION_FORM_ENDPOINT=
VITE_PUBLIC_SITE_URL=https://noisgit.github.io/NativasApp/
VITE_FORM_PROVIDER=formspree
```

Todas las variables `VITE_*` son públicas. No deben contener secretos, tokens privados, service roles ni credenciales.

## Formulario

El formulario no guarda datos en el sitio. Envía un `POST` JSON al endpoint público configurado. Si el endpoint no existe o no es HTTPS, el sitio muestra un error amigable y no simula éxito.

El proveedor puede ser Formspree, Getform u otro servicio compatible con `fetch`.

## Galería de Instagram

La galería vive en:

```text
src/infrastructure/content/instagramPostsRepository.ts
```

Para actualizar una publicación:

1. Descarga una imagen pública y verificable desde el Instagram oficial de Nativas, sin capturar la interfaz de Instagram.
2. Optimízala para web y guárdala en `src/assets/instagram/` o `src/assets/gallery/`.
3. Importa la imagen en el repositorio.
4. Agrega un objeto con `title`, `description`, `image`, `alt`, `mediaType` y `permalink`.
5. Verifica que el permalink sea HTTPS y pertenezca a `instagram.com`.

La sección no es un feed en vivo y no usa Instagram Graph API porque este sitio se despliega como frontend estático.

Los assets actuales se generaron localmente desde la captura de Instagram aportada para este trabajo. Las descargas públicas automatizadas desde Instagram fueron bloqueadas por `403`, por lo que no se incorporaron imágenes de Google, Flickr ni otros equipos como reemplazo.

## Logos e identidad

Los logos locales están en:

```text
src/assets/brand/nativas-logo-primary.png
src/assets/brand/nativas-logo-symbol.png
public/favicon.png
public/og-image.jpg
```

No se usa una “N” provisional ni un logo inventado. El logo principal actual proviene de la captura oficial aportada y se conserva como raster. Si se obtiene una variante oficial adicional, se reemplaza en `src/assets/brand/` sin cambiar componentes.

## Seguridad frontend

- Sin Supabase, Firebase, base de datos, auth ni panel admin.
- Sin secretos en frontend.
- Sin tokens de Instagram.
- Sin `localStorage` para datos personales.
- Sin `dangerouslySetInnerHTML`.
- URLs externas validadas.
- Enlaces externos con `noopener noreferrer`.
- Fetch con `AbortController` y timeout.
- CSP y referrer policy en `index.html`.
- GitHub Pages no permite configurar encabezados HTTP como `frame-ancestors`; el proyecto aplica la CSP posible mediante meta tag.

## Motion

Las animaciones usan GSAP instalado por npm, no CDN. La capa de motion está en `src/presentation/hooks/useGsapLandingMotion.ts` y utiliza `@gsap/react`, `ScrollTrigger`, scopes por ref, cleanup automático, transforms/opacity y `prefers-reduced-motion`.

## Accesibilidad

Incluye skip link, landmarks, un solo `h1` por página, foco visible, labels visibles, errores inline, `aria-live`, menú móvil accesible, FAQ con botones, carrusel navegable y soporte de `prefers-reduced-motion`.

## GitHub Pages

Vite usa:

```ts
base: '/NativasApp/'
```

El deploy publica `dist` mediante GitHub Pages. El formulario recibe variables públicas desde repository variables, no desde secretos de base de datos.

## Limitaciones reales

- Instagram no puede sincronizarse de forma segura en tiempo real desde una SPA estática sin exponer tokens.
- Algunos horarios provienen del repositorio original; si cambian, deben actualizarse manualmente y revisar Instagram.
- Las imágenes locales deben mantenerse verificables como assets oficiales o editoriales de Nativas.
