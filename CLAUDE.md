# Project Instructions

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

Nuxt 4 + Nuxt UI 4 + Tailwind CSS 4 + @nuxt/content 3 (YAML collections) + @nuxtjs/i18n 10.
Static site (SSG) deployed to GitHub Pages via GitHub Actions.

## Build & Run

- Dev: `pnpm dev`
- Build: `pnpm build --preset github_pages`
- Lint: `pnpm lint` / `pnpm lint:fix`
- Type check: `pnpm typecheck`

## Testing

- Unit: `pnpm test:unit` (Vitest + happy-dom)
- E2E: `pnpm test:e2e` (Playwright)
- All: `pnpm test:all`
- E2E tests verify user-facing behavior, not implementation details

## Content Architecture

Content is YAML (not Markdown) with Zod-validated collections defined in `content.config.ts`.
Two locales: `fr` (default), `en`. Collections are generated per locale (e.g., `projects_fr`, `projects_en`).

### Adding content

- New project: create `content/{fr,en}/projects/XX_slug.yml` matching the projects schema
- New service: create `content/{fr,en}/services/XX_name.yml` matching the services schema
- New product: create `content/{fr,en}/products/XX_slug.yml` matching the products schema
- UI strings: edit `i18n/locales/{fr,en}.json`

### Content query pattern (used in every page)

```ts
const { locale } = useI18n()
const { data } = await useAsyncData(`key-${locale.value}`, () =>
  queryCollection(`collection_${locale.value}`).first()
)
```

## Project Structure

- `app/` — Vue components, pages, composables, layouts, types, utils
- `content/{fr,en}/` — YAML content files per locale
- `content.config.ts` — Zod schemas for content collections
- `app/app.config.ts` — theme colors, profile picture, availability flag
- `e2e/` — Playwright E2E test specs
- `.github/workflows/deploy.yaml` — CI: unit tests + E2E tests + deploy

## Conventions

- Every page must call `usePageSeo()` for SEO metadata
- Vue components use `<script setup lang="ts">` with typed `defineProps<{}>()`
- Navigation defined in `app/composables/useNavLinks.ts`
- Social links are locale-aware in `app/composables/useSocialLinks.ts`
- GitHub Pages compatibility: Nitro hook in `nuxt.config.ts` duplicates index.html files

## i18n

- Strategy: `prefix_except_default` — French at `/`, English at `/en/`
- Always use `useLocalePath()` for internal links
- Always use `useI18n().t()` for UI strings
