# Nativas Roller Derby

Landing page profesional para Nativas Roller Derby, equipo de roller derby de Temuco, Chile. El proyecto está preparado para despliegue en GitHub Pages:

https://noisgit.github.io/NativasApp/

![Preview de la landing Nativas Roller Derby](docs/images/landing-preview-1920x1080.png)

## Objetivo

Transformar el proyecto en una experiencia frontend completa: identidad visual, contenido educativo, entrenamientos, galería editorial de Instagram, formulario de postulación, privacidad, accesibilidad, SEO, seguridad frontend y validaciones.

No existe base de datos, backend propio, autenticación ni panel administrativo.

## Funcionalidades

- Landing pública con secciones de Nativas, roller derby, roles, beneficios, preparación, entrenamientos, Instagram, proceso, FAQ y CTA.
- Rutas públicas: `/`, `/postular`, `/privacidad` usando `HashRouter` para compatibilidad con GitHub Pages.
- Formulario de postulación con validación de dominio, teléfono internacional normalizado en E.164, edad mínima, disponibilidad, motivación, privacidad, honeypot y prevención de doble envío.
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
- React Phone Number Input + libphonenumber-js
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
    media/
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

El teléfono utiliza selector internacional con Chile por defecto y se normaliza en formato E.164 antes de enviarse.

## Galería de Instagram

La galería vive en:

```text
src/infrastructure/content/instagramPostsRepository.ts
src/infrastructure/content/siteMedia.ts
```

Para actualizar una publicación:

1. Descarga una imagen pública y verificable desde el Instagram oficial de Nativas, sin capturar la interfaz de Instagram.
2. Optimízala para web y guárdala en `src/assets/instagram/` o `src/assets/media/`.
3. Importa la imagen en el repositorio.
4. Agrega un objeto con `title`, `description`, `image`, `alt`, `mediaType` y `permalink`.
5. Verifica que el permalink sea HTTPS y pertenezca a `instagram.com`.

Las imágenes actuales provienen de archivos compartidos para este proyecto y están centralizadas en `siteMedia.ts`.

Archivos a reemplazar cuando haya nuevas fotografías oficiales:

```text
src/assets/media/nativas-hero.webp
src/assets/media/nativas-about.webp
src/assets/instagram/nativas-bench.webp
src/assets/instagram/nativas-pack.webp
src/assets/instagram/nativas-game-red.webp
src/assets/instagram/nativas-community.webp
src/assets/instagram/nativas-unidas.webp
```

La sección no usa Instagram Graph API ni tokens privados.

## Logos e identidad

Los logos locales están en:

```text
src/assets/brand/nativas-logo-header.png
src/assets/brand/nativas-logo-header.webp
public/favicon.png
public/og-image.jpg
```

No se usa una “N” provisional ni un logo inventado. El logo actual proviene del archivo aportado para este trabajo; se limpió el fondo turquesa para integrarlo al header oscuro. En la interfaz visible aparece solo en el header; favicon y Open Graph usan la identidad en metadatos.

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

Las animaciones usan GSAP instalado por npm, no CDN. La capa de motion está en `src/presentation/hooks/useGsapLandingMotion.ts` y utiliza `@gsap/react`, `ScrollTrigger`, scopes por ref, cleanup automático, transforms/opacity y `prefers-reduced-motion`. El carrusel mueve solo su viewport horizontal y no modifica el scroll vertical de la página durante autoplay.

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
