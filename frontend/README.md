# Bernales Constructora — Landing Page

MVP landing page for a real estate construction company. Shows two
apartment projects, each with a detail page built around a photo
gallery and a 360 degree virtual tour.

## Stack

- Next.js 16 (App Router, Turbopack, TypeScript)
- Tailwind CSS v4
- Motion (Framer Motion) for animation
- yet-another-react-lightbox for the photo gallery lightbox
- react-photo-sphere-viewer for the 360 degree tours
- Vitest + React Testing Library for unit tests
- Playwright for end-to-end tests

No backend, no auth, no persistence. All content is static and lives
in `src/data`.

## Project structure

```
frontend/
  public/images/          placeholder images (see "Replacing images")
  scripts/
    generate_placeholders.py   regenerates the placeholder images
  src/
    app/
      layout.tsx           root layout: fonts, Header, Footer
      page.tsx              home page (hero + project grid)
      not-found.tsx          404 page
      proyectos/[slug]/     project detail page
      globals.css            design tokens (colors, fonts, keyframes)
    components/
      layout/                Header, MobileNav, Footer
      home/                   Hero, ProjectCard, ProjectsSection
      project/                ProjectHero, ProjectFacts, Gallery, VirtualTour
      ui/                     small shared pieces (ArcDivider, RevealOnScroll, ...)
    data/
      images.ts               single config object with every image path
      projects.ts             project content (copy, facts, image refs)
    types/project.ts          Project TypeScript type
    lib/utils.ts               small className helper
  e2e/                        Playwright tests
  vitest.config.ts, vitest.setup.ts
  playwright.config.ts
```

To point the site at real photography, edit `src/data/images.ts` only —
every component reads image paths from there. Filenames match what's
already in `public/images/`.

## Prerequisites

- Node.js 20.9 or later (22 LTS recommended)
- npm 10 or later

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Available scripts

```bash
npm run dev          # start the dev server
npm run build        # production build (static prerender of both project pages)
npm run start         # serve the production build
npm run lint          # eslint
npm run test           # unit tests (Vitest), single run
npm run test:watch    # unit tests in watch mode
npm run test:e2e      # Playwright end-to-end tests
```

Before running e2e tests for the first time, install a browser:

```bash
npx playwright install chromium
```

`npm run test:e2e` builds the app and starts it on port 3000, then runs
the suite against that production build (see `playwright.config.ts`).

## Building for production

```bash
npm run build
npm run start
```

## Replacing the placeholder images

`scripts/generate_placeholders.py` generated the on-brand placeholder
JPGs (and the logo PNG) in `public/images/`. To use real photography and
the real brand logo, just overwrite these same filenames — nothing else
needs to change:

- `logo.png` — header, mobile menu and footer logo. Use a light/white
  version with a transparent background (the logo always sits on a
  dark charcoal surface).
- `hero.jpg` — home page hero background
- `<project>-1.jpg`, `<project>-2.jpg`, … — gallery photos. The count
  per project is **not fixed at 5** — Begonias de Aranjuez ships with
  8, Prados del Oeste with 7. The gallery mosaic shows up to 5 at a
  time and a "ver todas las fotos" button opens the rest in the
  lightbox. To add or remove photos, add/remove the files and update
  the count passed to `galleryPaths(...)` in `src/data/images.ts`.
- `<project>-360-1.jpg`, `<project>-360-2.jpg` — equirectangular
  panoramas for the 360 tour (2:1 aspect ratio works best)

## Design notes

Colors are derived directly from the Bernales wordmark (`#3D3F47` on
white): a charcoal primary, a warm stone accent used sparingly, and a
cool off-white background. Headings use Archivo, body text uses
Manrope, both loaded through `next/font/google`.
