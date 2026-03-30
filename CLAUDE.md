# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Aurélien Tondoux (aurelientondoux.com), built with **Nuxt 4**, **@nuxt/ui**, **@nuxt/content**, and **Tailwind CSS v4**. Deployed as a static site to **GitHub Pages** via GitHub Actions.

## Commands

```bash
pnpm dev --host 127.0.0.1    # Dev server at http://127.0.0.1:3000
pnpm build                    # Production build
pnpm build --preset github_pages  # Build for GitHub Pages
pnpm generate                 # Static site generation
pnpm preview                  # Preview built site

pnpm test:unit                # Vitest unit tests
pnpm test:e2e                 # Playwright E2E tests (headless)
pnpm test:e2e:ui              # Playwright interactive mode
pnpm test:e2e:install         # First-time browser install (~150MB)
pnpm test:all                 # Unit + E2E

pnpm lint                     # ESLint
pnpm lint:fix                 # ESLint with auto-fix
pnpm typecheck                # Vue TSC type checking
```

## Architecture

### Content System (non-obvious)

Content is **YAML-based** (not Markdown), managed by `@nuxt/content` with Zod schemas in `content.config.ts`.

Collections are generated **per locale** using a `${name}_${locale}` naming convention. The base collections (index, projects, products, services, pages, about) are iterated over `['fr', 'en']` to produce `projects_fr`, `projects_en`, etc. Pages must query the correct locale-suffixed collection.

Content files live in `/content/{locale}/` — e.g., `/content/fr/projects/malt.yml` and `/content/en/projects/malt.yml`.

### i18n

- Strategy: `prefix_except_default` — French (default) has no URL prefix, English uses `/en/`
- UI strings: `i18n/locales/{fr,en}.json`
- Content: separate YAML files per locale in `/content/{fr,en}/`
- Social links in `useSocialLinks()` are locale-aware (LinkedIn/Malt URLs differ by locale)

### GitHub Pages Trailing Slash Hack

`nuxt.config.ts` includes a `nitro:init` hook that duplicates every `/path/index.html` as `/path.html` after prerendering. This ensures URLs work with or without trailing slashes on GitHub Pages. See the hook in `nuxt.config.ts` for details.

### Styling

- Tailwind CSS v4 with `@import` system (not v3 config file)
- Theme colors configured in `app/app.config.ts` (primary: emerald, neutral: neutral)
- Custom fonts (Public Sans, Instrument Serif) defined in `app/assets/css/main.css`
- Dark/light mode via `useColorMode()`

### No State Management

No Pinia or Vuex — this is a statically generated content site. Reactive state uses Vue 3 composables only.
