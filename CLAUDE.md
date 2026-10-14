# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Aurélien Tondoux (aurelientondoux.com), being rebuilt with **Astro 7** from the
**AstroWind** template, **Tailwind CSS v4** and **TypeScript (strict)**. Output is a static site for **GitHub Pages**.

The previous **Nuxt 4** implementation is archived in `legacy-nuxt/`. It is **frozen**: a reference for content,
copy and SEO during the migration. Never modify it (no features, upgrades or refactors). It has its own
`legacy-nuxt/CLAUDE.md`, pnpm 10 toolchain, `.npmrc` and `pnpm-workspace.yaml`. It is not part of the root workspace.

## Toolchain

- **Node `24.21.0`** (`.nvmrc`). `engines` is `^22.22.3 || ^24.16.0 || >=26.3.0`. The floor comes from
  eslint-plugin-astro / astro-eslint-parser, not Astro. Node 25 and 26.0–26.2 break lint.
- **pnpm `12.11.2`** through corepack (`packageManager`). Commit `pnpm-lock.yaml`. Never add a `package-lock.json`:
  withastro/action picks the package manager from the lockfile.
- **pnpm settings live in `pnpm-workspace.yaml`**, not in `package.json` or `.npmrc`: `overrides` (parent
  selectors such as `astro-compress>sharp`) and `allowBuilds` (pnpm ≥11 replaced `onlyBuiltDependencies`).
  New dependencies with install scripts must be added to `allowBuilds`.

## Commands

```bash
pnpm dev                 # Dev server at http://localhost:4321
pnpm build               # Static build into dist/
pnpm preview             # Serve dist/

pnpm check               # astro check + eslint + prettier --check (CI gate)
pnpm fix                 # eslint --fix + prettier --write
pnpm typecheck           # astro check

pnpm test:unit           # Vitest
pnpm test:coverage       # Vitest with v8 coverage, 80% threshold on src/i18n/**
pnpm test:e2e            # Playwright: builds, then runs against astro preview on 127.0.0.1:4321
pnpm test:e2e:install    # Install Chromium for Playwright
pnpm test:all            # Unit + E2E
```

## Architecture

### AstroWind layout

- `src/config.yaml` drives site metadata and UI settings. It is loaded by the template integration
  in `vendor/integration`, which **overrides** Astro's `site` and `trailingSlash` with the values from
  `config.yaml`. Keep `site.site` and `astro.config.ts` `site` both set to `https://aurelientondoux.com`.
- `src/components/` (widgets, UI, common), `src/layouts/` and `src/utils/` come from the template and are kept
  for reuse. The demo pages, the blog machinery (blog components, `Blog*` widgets, `utils/blog.ts`, the `post`
  collection and `content.config.ts`, the RSS link), `LandingLayout` and the `Announcement` widget were removed. The
  blog is disabled (`apps.blog.isEnabled: false`); `utils/permalinks.ts` still reads the blog config because
  `getPermalink` depends on it. `PageLayout` renders an announcement only when a page fills the `announcement` slot.
- `src/navigation.ts` exposes `getHeaderData(lang)` / `getFooterData(lang)`. Navigation is localized.
- `~` is aliased to `src/`.
- `src/i18n/sections.ts` `getSectionLinks(lang, homeUrl)` is the home section catalog (home, `#about`, `#services`). It feeds the header links and the footer "sitemap" column in `src/navigation.ts`; `homeUrl` is injected (no `astro:i18n`) and the ids must match `src/pages/[lang]/index.astro` (guarded by `e2e/navigation.spec.ts`). Add new sections there.

### i18n

- **Single source of truth:** `src/i18n/ui.ts` exports `locales` (`['fr','en'] as const`), `Lang`, `defaultLang`,
  `hreflangs` and `openGraphLocales`. `astro.config.ts` imports them for the i18n and sitemap config.
- **Routing:** Astro built-in i18n, `prefixDefaultLocale: true`, `redirectToDefaultLocale: false`. Every page lives
  under `src/pages/[lang]/` with `getStaticPaths` over the locales. `src/pages/index.astro` is the only root
  redirect to `/fr/`. Astro throws `MissingIndexForInternationalization` without it, and enabling
  `redirectToDefaultLocale` on top of it defines the redirect twice (build warning). The built `dist/index.html` is
  `noindex` with a canonical on `https://aurelientondoux.com/fr/` and is filtered out of the sitemap.
- **UI strings:** typed dictionaries in `src/i18n/ui.ts`. `fr` is the source of truth, and `en` is
  `satisfies Record<keyof typeof ui.fr, string>`, so a missing translation fails `astro check`. Read them with
  `useTranslations(lang)` and detect the locale with `getLangFromUrl(url)` (`src/i18n/utils.ts`). No i18n
  library: don't add astro-i18next (unmaintained).
- **SEO:**
  - `src/i18n/alternates.ts` `buildAlternateLinks(path, toAbsoluteUrl)` returns fr, en and `x-default`
    (→ fr). The URL builder is **injected**: `Layout.astro` passes `getAbsoluteLocaleUrl` from `astro:i18n`,
    and unit tests pass a fake, because the `astro:i18n` virtual module doesn't exist under Vitest. Keep
    helpers that need Astro virtual modules testable the same way.
    `getPathWithoutLocale` always returns `''` or a path with a trailing slash (`trailingSlash: true`).
  - **Language switcher:** `LanguageSwitcher.astro` is a text link showing the uppercase code of the destination language (`getLocaleCode` in `src/i18n/switcher.ts`: "EN" on French pages, "FR" on English pages; the code span is `aria-hidden`, the link keeps the full `aria-label`) to the left of `ToggleTheme` (the theme toggle stays at the far right) in
    `Header.astro`, fed by `PageLayout.astro` (`getOtherLocale`, `buildSwitcherHref` in `src/i18n/switcher.ts`,
    URL builder injected). The header is `transition:persist`ed, so the `href` is refreshed on `astro:page-load`
    from the page's `link[rel="alternate"][hreflang]` (matched on `data-target-hreflang`), falling back to `data-fallback-href`. The 404 page has no
    header and links both locale homes itself.
  - `Layout.astro` takes an optional `lang` prop (404 passes `fr`), sets `<html lang>`, builds the alternates and
    defaults the canonical URL to the current locale's absolute URL. `Metadata.astro` renders the canonical and
    hreflang links and sets `og:locale` from `openGraphLocales[lang]` (`fr_FR`, `en_US`), not from config. Pages
    outside the locale folders (404) get no canonical and no alternates, and stay `noindex`.
  - hreflang is language-only (`fr`, `en`) in the head and in the sitemap: `@astrojs/sitemap` uses
    `i18n.locales = hreflangs`. Its `filter` excludes the root redirect page.

### Home sections

- Home sections are `Features2` widgets fed from flat `ui.ts` keys (`home.<section>.title` / `.subtitle`).
- The services catalog lives in `src/i18n/services.ts`: `getServiceItems(lang)` maps a typed catalog of keys to Tabler
  icons (legacy Lucide names were mapped; Tabler is fully allowlisted) and to `home.services.<key>.*` copy.
- The pricing section is a `Pricing` widget (`id="pricing"`, after services, no CTAs) fed by `getPricingPlans(lang)` in
  `src/i18n/pricing.ts`: a typed catalog mapped to `home.pricing.<plan>.*` copy and Tabler icons. The daily rate is
  formatted with `Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' })` (fr "600 €", en "€600", with a
  narrow no-break space: tests compare against `Intl` output). A plan without a rate falls back to the quote label and
  has no period. The page passes `currency=""` because the price string is already formatted. `Pricing.astro` was
  fixed generically: a card renders without a `period`, the currency span is optional, the card is `relative` so the
  ribbon anchors to it, and a price with no period uses a smaller `text-3xl font-bold`.

### Styling

- Tailwind CSS v4 through `@tailwindcss/vite` in `vite.plugins`. **Never add `@astrojs/tailwind`**: it is
  deprecated and capped at Astro 5 / Tailwind 3.
- astro-compress keeps `csso: false` and uses lightningcss, because csso drops Tailwind v4 media-range blocks.

### Lint and format

- ESLint 10 flat config in `eslint.config.mjs` (eslint-plugin-astro is ESM-only) with typescript-eslint.
- Prettier with prettier-plugin-astro 1.x (`.prettierrc.mjs`). `legacy-nuxt/` is ignored by ESLint, Prettier and
  tsconfig.

### Tests

- Vitest runs through `getViteConfig()` in `vitest.config.ts`. Tests sit next to the code (`src/**/*.test.ts`).
  Coverage (`@vitest/coverage-v8`, pinned to the Vitest version) enforces 80% on `src/i18n/**`.
- Playwright specs live in `e2e/`. The web server is `pnpm build && pnpm preview ... --ignore-lock`.
  `--ignore-lock` is required because Astro 7's `astro preview` sends itself to the background when it detects an
  AI agent, and Playwright then sees the process exit.

## Deployment

- **No deployment workflow yet.** The Nuxt deployment was removed, and nothing in the repo deploys to GitHub
  Pages. Pages keeps serving the last Nuxt deployment until a new one replaces it. `legacy-nuxt/` is never
  built or deployed again.
- `.github/workflows/ci.yaml` checks the Astro site on pushes to `main`, on PRs and on manual dispatch (one run per
  ref, older runs are cancelled): a `quality` job (check, coverage, e2e) and a `build` job using
  `withastro/action@v6` (Node 24.21.0, pnpm 12.11.2), which uploads the Pages artifact the future deploy will use.
- **Go-live** (when the Astro content is ready):
  1. Add a `deploy` job to `ci.yaml`: `needs: build`, main only, `pages: write` + `id-token: write`,
     environment `github-pages`, `actions/deploy-pages@v5`.
  2. **Handle the URL change.** Nuxt served French without a prefix (`/about`), and Astro serves `/fr/about/`.
     Add redirects for the old URLs (Astro `redirects`) and resubmit the sitemap, or the site loses its SEO
     history.
- The custom domain is configured in the GitHub Pages settings (there is no `CNAME` file).
