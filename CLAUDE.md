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
- Favicons (`src/components/Favicons.astro`) are the brand "AT" icons copied from `legacy-nuxt/public/`: 32/16 PNG and
  apple-touch in `src/assets/favicons/`, and `favicon.ico` in `public/` because browsers and crawlers probe
  `/favicon.ico` directly. The template `favicon.svg` was removed: browsers prefer an SVG icon, so keeping it would show
  the AstroWind logo. `e2e/favicons.spec.ts` pins each served icon by SHA-256. The legacy `site.webmanifest` and
  `android-chrome-*` icons were not carried over.
- The header has one action, the contact CTA from `getContactCallToAction(lang)` with `variant: 'secondary'` set in
  `getHeaderData` (`src/navigation.ts`). It renders at the far right after the theme toggle, and in the mobile menu
  bottom bar. The contact section keeps its own primary CTA (`Steps2` forces primary).
- `src/i18n/sections.ts` `getSectionLinks(lang, homeUrl)` is the home section catalog (home, `#about`, `#services`). It feeds the header links and the footer "sitemap" column in `src/navigation.ts`; `homeUrl` is injected (no `astro:i18n`) and the ids must match `src/pages/[lang]/index.astro` (guarded by `e2e/navigation.spec.ts`). Add new sections there.

- `getSocialLinks(lang)` in `src/i18n/social.ts` feeds the footer social links (LinkedIn, Malt, GitHub, all `_blank`). The LinkedIn hrefs (`LINKEDIN_HREFS`) are shared with `contact.ts`. Malt uses `tabler:topology-star-ring-3` (Tabler has no Malt icon). `Footer.astro` adds `target` and `rel="noopener noreferrer"` only when a link opts in with `target`. Links carry a `tooltip` (the platform name); `Footer.astro` renders a CSS-only tooltip (hover and focus-visible, `aria-hidden` since `aria-label` names the link) only when a link opts in with `tooltip`. The first tooltip is left-aligned below `md` (the row hugs the left edge on mobile, so a centered one overflows the viewport; guarded by `e2e/navigation.spec.ts`).

### i18n

- **Single source of truth:** `src/i18n/ui.ts` exports `locales` (`['fr','en'] as const`), `Lang`, `defaultLang`,
  `hreflangs` and `openGraphLocales`. `astro.config.ts` imports them for the i18n and sitemap config.
- **Routing:** Astro built-in i18n, `prefixDefaultLocale: true`, `redirectToDefaultLocale: false`. Every page lives
  under `src/pages/[lang]/` with `getStaticPaths` over the locales. `src/pages/index.astro` is the only root
  redirect to `/fr/`. Astro throws `MissingIndexForInternationalization` without it, and enabling
  `redirectToDefaultLocale` on top of it defines the redirect twice (build warning). The built `dist/index.html` is
  `noindex` with a canonical on `https://aurelientondoux.com/fr/` and is filtered out of the sitemap. The redirect
  passes status `301`: in a static build Astro emits a meta refresh whose delay is 2 s for a 302 (the default) and
  0 s otherwise, so a 302 leaves the "Redirecting from / to /fr/" page visible (guarded by `e2e/i18n.spec.ts`).
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
  - **Language switcher:** `LanguageSwitcher.astro` is a text link showing the uppercase code of the destination language (`getLocaleCode` in `src/i18n/switcher.ts`: "EN" on French pages, "FR" on English pages; the code span is `aria-hidden`, the link keeps the full `aria-label`) to the left of `ToggleTheme` in
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
- The collaborations section is a `Brands` widget (`id="collaborations"`, between about and services, `variant="marquee"`: an infinite horizontal scroll with faded edges, paused on hover, static under `prefers-reduced-motion`; marquee logos load eagerly, otherwise lazy loading leaves the off-screen ones blank; no `bg` slot, not in the nav or `sections.ts`) fed by `getCollaborationLogos(lang)` in `src/i18n/collaborations.ts`: a typed catalog, in chronological order, of the companies from the legacy portfolio (the `*_logo.svg` files copied from `legacy-nuxt/public/portfolio/`, minus world tour and Ortho Assistant, plus `icap.svg` last, vectorized from a PNG; all on a 600×450 viewBox) mapped to `~/assets/images/collaborations/<file>.svg` (resolved by `findImage`) with alt text from `home.collaborations.logoAlt` (`{company}` placeholder; company names are not translated). Visible title is "Ils me font confiance" / "They trust me".
- The services catalog lives in `src/i18n/services.ts`: `getServiceItems(lang)` maps a typed catalog of keys to Tabler
  icons (legacy Lucide names were mapped; Tabler is fully allowlisted) and to `home.services.<key>.*` copy.
- The pricing section is a `Pricing` widget (`id="pricing"`, after services, no CTAs) fed by `getPricingPlans(lang)` in
  `src/i18n/pricing.ts`: a typed catalog mapped to `home.pricing.<plan>.*` copy and Tabler icons. The daily rate is
  formatted with `Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' })` (fr "600 €", en "€600", with a
  narrow no-break space: tests compare against `Intl` output). A plan without a rate falls back to the quote label and
  has no period. The page passes `currency=""` because the price string is already formatted. `Pricing.astro` was
  fixed generically: a card renders without a `period`, the currency span is optional, the card is `relative` so the
  ribbon anchors to it, and a price with no period (the short quote label "Sur devis" / "On quote", kept short so it stays on one line in the narrowest ~230px card) uses `text-5xl font-extrabold`.
- The case studies section ("Cas clients" / "Case studies") is the template `Projects` widget, unchanged (`id="case-studies"`, after pricing, `columns={4}`: one row of four from `lg`, 2×2 from `sm`, one column on phones; `getColumnsClass(4)` in `src/utils/utils.ts` was changed for every widget from the template's `md:grid-cols-3` step to skip straight from 2 to 4 columns, since 3 columns leave a lone fourth card (guarded by `e2e/home.spec.ts` at 1280 and 900px), no `bg` slot, not in the nav or `sections.ts`), fed by `getCaseStudies(lang)` in `src/i18n/case-studies.ts`: a typed catalog, newest first: Institut du Cancer Avignon - Provence (`icap`), then the 3 latest legacy portfolio items (Malt, Namirial, Dyma). ICAP has no legacy portfolio entry: its description and achievements come from Aurélien's own account of the assignment (coaching the tech team towards automated tests and CI/CD, the patient record rebuild, the IT modernization strategy). Each entry maps to `home.caseStudies.<key>.{title,description}` copy. Titles are the client names, the same in both locales ("Dyma Spring Boot" for the course, instead of the legacy "Formation Spring Boot"); all four descriptions are Aurélien's own wording of each mission (Dyma's names the platform and his role as the course's creator and maintainer). Cards show only domain tags (sector or kind of product): Santé and Recherche clinique for ICAP, Marketplace Freelance and HR Tech for Malt, Services de confiance and Identité numérique for Namirial, Formation en ligne. Technical tags (languages, frameworks, practices) are deliberately left out. Each tag is its own `home.caseStudies.<key>.tags.<tag>` key, so a missing translation fails `astro check`. Each card ends with a short list of `achievements`, one `home.caseStudies.<key>.achievements.<slug>` key per item, listed in the catalog's `achievementKeys`. `Projects.astro` was extended generically and opt-in: `achievements` (typed on `Project`) renders as a list, each item with a `tabler:circle-check-filled` icon. It sits in one bottom footer (`mt-auto`) together with the template's `result` and link, which these cards don't use, so the footers line up across a row (guarded by `e2e/home.spec.ts`). Items are semibold primary blue with `dark:text-blue-400` (the icon inherits it), because primary blue on the dark card is 3.36:1, below WCAG AA's 4.5:1 for 14px text. A contrast test checks the items in both themes. Achievements must be true. Dyma's are its real figures (19 chapters / 85 lessons / 170 quizzes, 6500+ hours spent by students). Malt's are Aurélien's own figures (90% of freelancers paid within 10 days, a 95% automated financing process). Namirial's come from its legacy actions, since the legacy content has no measured outcomes for it. `Projects.astro`'s decorative icons are `aria-hidden`, so `#case-studies` exposes no image role. Every card shows the same drawing, `~/assets/images/case-studies/illustration.svg` (a redraw of janjf93's Pixabay vector #3614766: a phone and a laptop showing charts). It is imported with `?raw` and inlined as a string, because `Projects.astro` injects string images as raw HTML and an `<img>` SVG could not follow the class-based `.dark` mode. Only the colours change, and they come from each client's brand: the logos in `src/assets/images/collaborations/`, or the website when the logo has no hue. Every fill is a `--cs-*` role variable. `src/assets/styles/case-studies.css` derives one shade ramp (`--cs-50`…`--cs-950`) from two anchors with `color-mix()`: lighter shades mix the brand colour with white, and darker ones mix it with a deep tone, so dark mode keeps the brand hue instead of going muddy. The roles use light shades by default and dark shades under `.dark`. Each card sets `data-palette` to its catalog key, and each brand defines only `--cs-brand` and `--cs-deep`. ICAP uses its logo's `#5c74a7` with `#2a407c`, Malt uses `#fc5656` with Tailwind `red-950` (read with `--theme()` so Tailwind emits it), and Dyma uses `#3c82f6` with the logo's `#0f172a`. Namirial's logo is a black wordmark, so it uses the teal from namirial.com: `#00a69d` (headline accent) with `#00423f` (button text). The SVG has no `id`s, because it is inlined three times on one page. It is decorative (`aria-hidden`). `e2e/home.spec.ts` checks, in light and dark mode, that the three backgrounds differ from each other and from their card. Items have no `href`, because `Projects.astro` hardcodes the English "View project" link text. Instead, a catalog entry can carry an optional `link` (`href` plus a `textKey`), which `getCaseStudies` appends to the description as an inline `<a>` opening in a new tab (`rel="noopener noreferrer"`, primary blue with `dark:text-blue-400`), followed by Tabler's `external-link` icon inlined as raw SVG (`aria-hidden`, `currentColor`), since astro-icon's `<Icon>` can't render inside a string; `Projects.astro` renders descriptions with `set:html`. Only Dyma has one, to its course page. The URL lives once in the catalog and only the link text (`home.caseStudies.dyma.linkText`) is translated.
- The contact section is a `Steps2` widget (`id="contact"`, last, after case studies) fed by `getContactItems(lang)` and
  `getContactCallToAction(lang)` in `src/i18n/contact.ts`: a typed catalog (email, LinkedIn) mapped to
  `home.contact.<key>.title` copy and Tabler icons. The email address is defined once and shared by the email item
  and the mailto CTA. The LinkedIn URL is per locale (`?locale=en_US` for en) and opens in a new tab. `Steps2.astro`
  was extended generically and opt-in: an item with `href` renders its description inside an `<a>` (with `target`,
  and `rel="noopener noreferrer"` only when `target` is set); items without `href` render unchanged.

### Styling

- Tailwind CSS v4 through `@tailwindcss/vite` in `vite.plugins`. **Never add `@astrojs/tailwind`**: it is
  deprecated and capped at Astro 5 / Tailwind 3.
- `ui.theme` is `'light'`: light is the default even when the system prefers dark, and the header toggle still
  switches and persists the choice in `localStorage.theme` (`ApplyColorMode.astro`, guarded by `e2e/theme.spec.ts`).
  `'light:only'` would hide the toggle.
- astro-compress keeps `csso: false` and uses lightningcss, because csso drops Tailwind v4 media-range blocks.
- `image.endpoint.route` is `'/_image/'` in `astro.config.ts`. With `trailingSlash: 'always'` (forced by the template
  integration), the dev image endpoint only matches `/_image/`, but Astro builds `/_image?…` URLs from the default route,
  so every optimized local image 404s in `pnpm dev`. Static builds are unaffected (images are pre-generated into
  `_astro/`). Playwright reuses a running dev server locally (`reuseExistingServer: !isCI`), and `toBeVisible` passes on a
  broken `<img>`, so `e2e/home.spec.ts` also asserts each logo's `naturalWidth > 0`.

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

- `.github/workflows/ci.yaml` runs `quality` (check, coverage, e2e) → `build` (`withastro/action@v6`, Node 24.21.0,
  pnpm 12.11.2, uploads the Pages artifact) → `deploy` (`actions/deploy-pages@v5`). Each job needs the previous one,
  so a failing check or test never ships. It runs on pushes to `main`, on PRs and on manual dispatch.
- **Deploy only from `main`** (`github.ref == 'refs/heads/main'`, never on `pull_request`). A `workflow_dispatch` on
  `main` also deploys, as a manual redeploy. PRs and other branches build and test only.
- Top-level permissions stay `contents: read`. Only `deploy` gets `pages: write` + `id-token: write`.
- Deploys use the `pages` concurrency group with `cancel-in-progress: false`. The workflow-level concurrency only
  cancels older runs off `main`, so a push to `main` never kills a deployment halfway (a newer queued run on `main`
  can still replace an older pending one: the newest commit deploys).
- Pages source is **GitHub Actions**, and the `github-pages` environment must allow deployments from `main`. The
  custom domain is configured in the GitHub Pages settings (there is no `CNAME` file).
- **Legacy Nuxt URLs are intentionally not redirected.** `/about/`, `/services/`, `/portfolio/*` and their
  `/en/<path>/` twins
  serve the noindex 404 page, which links both locale homes. Resubmit the sitemap in Search Console after the first
  deploy.
- `public/robots.txt` has no `Sitemap:` line: the template integration in `vendor/integration` adds
  `Sitemap: https://aurelientondoux.com/sitemap-index.xml` to `dist/robots.txt` at build (guarded by
  `e2e/i18n.spec.ts`).
- `legacy-nuxt/` is never built or deployed again.
