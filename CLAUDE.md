# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Aurélien Tondoux (aurelientondoux.com), being rebuilt with **Astro 7** from the
**AstroWind** template, **Tailwind CSS v4** and **TypeScript (strict)**. Output is a static site for **GitHub Pages**.

The previous **Nuxt 4** implementation is archived in `legacy-nuxt/`. It is **frozen**: a reference for content,
copy and SEO during the migration. Never modify it (no features, upgrades or refactors). It has its own
`legacy-nuxt/CLAUDE.md`, pnpm 10 toolchain, `.npmrc` and `pnpm-workspace.yaml`. It is not part of the root workspace.

## Toolchain

- **Node `24.21.0`** (`.nvmrc`). `engines` is `^22.23.4 || ^24.16.0 || >=26.3.0`. The 22.x floor comes
  from Astro; the 24.x and 26.x floors come from eslint-plugin-astro / astro-eslint-parser. Node 25 and 26.0–26.2 break lint.
- **pnpm `12.11.2`** through corepack (`packageManager`). Commit `pnpm-lock.yaml`. Never add a `package-lock.json`:
  withastro/action picks the package manager from the lockfile.
- **pnpm settings live in `pnpm-workspace.yaml`**, not in `package.json` or `.npmrc`: `overrides` (parent
  selectors such as `astro-compress>sharp`) and `allowBuilds` (pnpm ≥11 replaced `onlyBuiltDependencies`).
  `packageExtensions` declares `@emnapi/runtime` for `@astrojs/astro2tsx`, at the exact `@emnapi/core` version it pins:
  upstream leaves that peer undeclared, so pnpm otherwise picks rolldown's `2.0.0-beta.2`, and `astro check` fails with
  a misleading "@astrojs/check is not installed" prompt. Remove the entry once `astro2tsx` declares it, and keep the two versions equal until then.
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
- `brand/` (repo root) keeps brand assets for reference only, such as the LinkedIn banner (`AT_code_lab_banner.png`,
  the original export), and `public-intro.md`, the French and English profile description pasted into LinkedIn, Malt
  and similar profiles (plain text under each heading, so it pastes as-is; the English wording follows the site's
  copy in `src/i18n/ui.ts`), and `work-experience.md`, the French and English text of every experience for those
  profiles, newest first with the dates in each heading and both languages side by side under each experience so they are edited together, in the
  same paste-ready plain text (each entry is the job title, repeated in each language block even when both languages match, one line of context, the mission, `→` results, then `Stack :`) and slightly more detailed
  than the case study cards: it is built from the cards and `legacy-nuxt/content/{fr,en}/portfolio/`, and the card
  figures win over the legacy ones. In both files, methodology names keep their English hyphenated form in both
  languages (Test-Driven Development, as in `ui.ts`, Domain-Driven Design, Event-Driven Architecture). "Full Stack" has no hyphen in French and "Full-Stack" keeps it in
  English, here and in `ui.ts`. The site never
  imports them, and they sit outside `public/` so they are not deployed.
- The browser tab title uses the "AT Code Lab" brand: the home page shows `home.title` alone (`ignoreTitleTemplate`),
  and other pages go through `metadata.title.template` in `config.yaml` (`'%s — AT Code Lab'`). Descriptions,
  `openGraph.site_name` and the footer copyright keep "Aurélien Tondoux". Guarded by `e2e/i18n.spec.ts`.
- The link-preview image (`og:image`) is `src/assets/images/og-default.png`, set in `config.yaml` `metadata.openGraph.images`
  and used by every page (none overrides it). It is the LinkedIn banner (`brand/AT_code_lab_banner.png`) cropped with
  Sharp around its text (the banner keeps the left side free for the LinkedIn photo, so the crop is centered on the
  text block) and resized to 1200×626. The crop is 4181×2181 from x 1637, y 454: the first crop (3554×1854 from x 1950,
  y 617, ~10% margin per side) scaled by 1/0.85 around the same center, so the text keeps ~16% margin per side
  (197px of 1200) that preview cards' rounded corners and edge trims don't eat. It
  overflows the banner's right edge, so the banner is first extended right by 314px with `extendWith: 'mirror'`
  (that strip is plain background, so the gradient and grain continue without a seam). The size is 1200×626 because `adaptOpenGraphImages` (`src/utils/images.ts`) always re-encodes it to a 1200×626 JPG
  and would crop any other ratio a second time. The template's `default.png` (an AstroWind screenshot) was removed.
  There is no `twitter:image` tag: X falls back to `og:image`, and `twitter:card` is `summary_large_image`.
  Guarded by `e2e/share-image.spec.ts`. Social sites cache previews, so refresh them with LinkedIn Post Inspector.
- Favicons (`src/components/Favicons.astro`) are the brand "AT" icons copied from `legacy-nuxt/public/`: 32/16 PNG and
  apple-touch in `src/assets/favicons/`, and `favicon.ico` in `public/` because browsers and crawlers probe
  `/favicon.ico` directly. The template `favicon.svg` was removed: browsers prefer an SVG icon, so keeping it would show
  the AstroWind logo. `e2e/favicons.spec.ts` pins each served icon by SHA-256. The legacy `site.webmanifest` and
  `android-chrome-*` icons were not carried over.
- The header has one action, the contact CTA from `getContactCallToAction(lang)` with `variant: 'secondary'` set in
  `getHeaderData` (`src/navigation.ts`). It renders at the far right after the theme toggle, and in the mobile menu
  bottom bar. The contact section keeps its own primary CTA (`Steps2` forces primary).
- The header switches from the menu button to the full link bar at `xl` (1280px), not the template's `lg` (1024px): the
  six section links overlap the language switcher at 1024px. The `xl:` classes in `Header.astro`, its
  `matchMedia('(max-width: 1279px)')` that closes the open menu, the `#header.scroll` rules in `tailwind.css`
  (`xl:backdrop-blur-md`, `width >= 80rem`) and `LanguageSwitcher.astro`'s default sizes move together (guarded by
  `e2e/navigation.spec.ts` at 1024 and 1280px).
- The header logo (`src/components/Logo.astro`) is a round profile photo followed by the site name. The photo is `src/assets/images/avatar.jpeg`: a 1280×1280 color studio portrait supplied by Aurélien (preferred over a black-and-white version), uncropped so the shoulders stay visible, downscaled to 512px at JPEG quality 100 (~185 KB, repo only, so Sharp resamples it once from a sharp source) and optimized by `astro:assets` through `Image.astro` with `widths={[36, 72, 108]}` (1×/2×/3× screens) and `quality={100}` (the default WebP quality looks soft on a small face; the served files stay a few KB). `quality` was added to the `Image.astro` props, which already forwarded it. The dev image endpoint keys its cache on the URL, so after replacing the file a hard reload is needed to see the new photo. It replaced the template's `tabler:user-code` icon. It is decorative (`alt=""`) because it sits inside the home link, which "AT Code Lab" already names, and it loads eagerly. Guarded by `e2e/navigation.spec.ts`.
- `src/i18n/sections.ts` `getSectionLinks(lang, homeUrl)` is the home section catalog (home, `#about`, `#services`, `#pricing`, `#case-studies`, `#contact`, in page order). It feeds the header links and the footer "sitemap" column in `src/navigation.ts`; `homeUrl` is injected (no `astro:i18n`) and the ids must match `src/pages/[lang]/index.astro` (guarded by `e2e/navigation.spec.ts`). Add new sections there.

- `getSocialLinks(lang)` in `src/i18n/social.ts` feeds the footer social links (LinkedIn, Malt, GitHub, all `_blank`). The LinkedIn hrefs (`LINKEDIN_HREFS`) and the Malt hrefs (`MALT_HREFS`) are shared with `contact.ts`. Malt uses `tabler:topology-star-ring-3` (Tabler has no Malt icon). `Footer.astro` adds `target` and `rel="noopener noreferrer"` only when a link opts in with `target`. Links carry a `tooltip` (the platform name); `Footer.astro` renders a CSS-only tooltip (hover and focus-visible, `aria-hidden` since `aria-label` names the link) only when a link opts in with `tooltip`. The first tooltip is left-aligned below `md` (the row hugs the left edge on mobile, so a centered one overflows the viewport; guarded by `e2e/navigation.spec.ts`).

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
- **Typography in `ui.ts`** (not `brand/`, whose paste-ready text keeps plain spaces): French puts a narrow no-break space (U+202F) before `:` and keeps `%` attached to the
  number (`90%`). Both locales group thousands with a U+202F space (`6 500+`, `500 000+`), never a comma; the French
  `6500+ heures` is left ungrouped on purpose. English copy uses the curly apostrophe `’`. Tests write U+202F as `\u202F`.
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
  - The home pages' meta and og description (the link preview line) is `home.description`: the same English line
    "Software & Product Engineering." in both locales, mirrored as the `config.yaml` fallback and pinned by
    `e2e/i18n.spec.ts`.

### Home sections

- Home sections are `Features2` widgets fed from flat `ui.ts` keys (`home.<section>.title` / `.subtitle`).
- The collaborations section is a `Brands` widget (`id="collaborations"`, between about and services, `variant="marquee"`: an infinite horizontal scroll with faded edges, paused on hover, static under `prefers-reduced-motion`; marquee logos load eagerly, otherwise lazy loading leaves the off-screen ones blank; no `bg` slot, not in the nav or `sections.ts`) fed by `getCollaborationLogos(lang)` in `src/i18n/collaborations.ts`: a typed catalog, in chronological order, of the companies from the legacy portfolio (the `*_logo.svg` files copied from `legacy-nuxt/public/portfolio/`, minus world tour and Ortho Assistant, plus `icap.svg` last, vectorized from a PNG; all on a 600×450 viewBox) mapped to `~/assets/images/collaborations/<file>.svg` (resolved by `findImage`) with alt text from `home.collaborations.logoAlt` (`{company}` placeholder; company names are not translated). Visible title is "Ils me font confiance" / "They trust me".
- The services catalog lives in `src/i18n/services.ts`: `getServiceItems(lang)` maps a typed catalog of keys to
  multicolor `flat-color-icons:*` icons (each name is allowlisted in the astro-icon `include` of `astro.config.ts`: a
  missing name breaks the build) and to `home.services.<key>.*` copy. `Features2` has an opt-in `centerLastRow`
  (`#services` sets it): the items render as `flex flex-wrap justify-center` with explicit card widths mirroring the
  grid columns, so a partial last row is centered. Flex over grid because a grid cannot center a lone card in an
  even column count (guarded by `e2e/home.spec.ts` at 1280 and 900px).
- The pricing section is a `Pricing` widget (`id="pricing"`, after services, no CTAs) fed by `getPricingPlans(lang)` in
  `src/i18n/pricing.ts`: a typed catalog of three plans, in order Création d’applications / Application Development (`applications`, on quote), Tech Lead Full Stack (`techLead`, at the daily rate, carries the "Populaire" / "Popular" ribbon) and Consulting (`consulting`, on quote), mapped to `home.pricing.<plan>.*` copy and Tabler icons. The daily rate is
  formatted with `Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' })` (fr "600 €", en "€600", with a
  narrow no-break space: tests compare against `Intl` output). A plan without a rate falls back to the quote label and
  has no period. The page passes `currency=""` because the price string is already formatted. `Pricing.astro` was
  fixed generically: a card renders without a `period`, the currency span is optional, the card is `relative` so the
  ribbon anchors to it, and a price with no period (the quote label "Sur devis" / "On request") uses `text-4xl font-extrabold`: at `text-5xl`, "On request" filled 247px of the 248px card at 1024px. `e2e/home.spec.ts` checks that the label stays on one line and uses at most 90% of the available width, in both locales at 1024 and 375px.
- The case studies section ("Cas clients" / "Case studies", subtitle "Un aperçu de mon travail." / "An overview of my work.": the cards cover the whole range of the work, not just recent missions, and both locales say the same thing) is the template `Projects` widget with its opt-in `variant="slider"` (`id="case-studies"`, after pricing, no `bg` slot, in the nav through `sections.ts` as `nav.caseStudies`), fed by `getCaseStudies(lang)` in `src/i18n/case-studies.ts`: a typed catalog, newest first: Institut du Cancer Avignon-Provence (`icap`), then the 3 latest legacy portfolio items (Malt, Namirial, Dyma), then Orange Business (`orange`, 2023, with no Océan link), then Ortho Assistant (`orthoAssistant`, 2020, Aurélien's own SaaS for speech therapists, now offline: its description comes from the legacy portfolio entry, with no link), then Softway Medical (`softway`, 2015; its description and achievements are Aurélien's own account of the mission; its description links the wound-care module's client testimonial video), then Société Générale (`societeGenerale`, 2012; its description is adapted from the legacy portfolio entry, with no link), then Natixis (`natixis`, 2011; its description is adapted from the legacy portfolio entry, with no link), then SNCF Connect & Tech (`sncfConnect`, 2010; its description is adapted from the legacy portfolio entry `02_sncf_connect.yml`, with no link), then the Ministère de la Santé (`oniam`, 2009; its description is adapted from the legacy portfolio entry `01_oniam.yml`, with no link), then Veolia Eau (`veolia`, 2007, appended last because it is the oldest; its description is adapted from the legacy portfolio entry `00_veolia.yml`, with no link; its achievements come from the legacy actions, since the legacy content has no measured outcomes; the "500 000" figure uses a narrow no-break space in both locales). ONIAM's title is "Ministère de la Santé" / "Ministry of Health" and the description names ONIAM. ICAP has no legacy portfolio entry: its description and achievements come from Aurélien's own account of the assignment (coaching the tech team towards automated tests, CI/CD and engineering best practices). Each entry maps to `home.caseStudies.<key>.{title,description}` copy. Titles are the client names, the same in both locales ("Dyma Spring Boot" for the course, instead of the legacy "Formation Spring Boot"); the descriptions are Aurélien's own wording of each mission (Dyma's names the platform and his role as the course's creator and maintainer), except Ortho Assistant's, Société Générale's, Natixis's, SNCF Connect & Tech's, ONIAM's and Veolia's, which are adapted from their legacy portfolio entries. Cards show a single domain tag (sector or kind of product): Santé for ICAP, Marketplace freelance for Malt, Services de confiance numérique for Namirial, Formation en ligne for Dyma, Gestion de flotte for Orange Business, Santé for Ortho Assistant, Santé for Softway Medical, Banque for Société Générale, Banque for Natixis, Transports for SNCF Connect & Tech, Services publics for ONIAM, Services publics for Veolia Eau. Technical tags (languages, frameworks, practices) are deliberately left out. Each tag is its own `home.caseStudies.<key>.tags.<tag>` key, so a missing translation fails `astro check`. Each card ends with a short list of `achievements`, one `home.caseStudies.<key>.achievements.<slug>` key per item, listed in the catalog's `achievementKeys`. `Projects.astro` was extended generically and opt-in: `achievements` (typed on `Project`) renders as a list, each item with a `tabler:circle-check-filled` icon. It sits in one bottom footer (`mt-auto`) together with the template's `result` and link, which these cards don't use, so the footers line up across a row (guarded by `e2e/home.spec.ts`). Items are semibold primary blue with `dark:text-blue-400` (the icon inherits it), because primary blue on the dark card is 3.36:1, below WCAG AA's 4.5:1 for 14px text. A contrast test checks the items in both themes. Achievements must be true. Dyma's are its real figures (19 chapters / 85 lessons / 170 quizzes, 6500+ hours spent by students). Malt's are Aurélien's own figures (90% of freelancers paid within 10 days, a 95% automated financing process). Namirial's come from its legacy actions, since the legacy content has no measured outcomes for it. Orange's (Suivi précis du taux d’utilisation des véhicules, Amélioration de la planification des entretiens) are Aurélien's own account of the mission's outcomes, Ortho Assistant's (Plusieurs dizaines d’orthophonistes bêta-testeurs, Fonctionnalités de recherche intelligente du matériel) are Aurélien's own wording, and Softway's (modules spécialisés pour le suivi des patients, a continuous delivery and deployment pipeline on a microservices architecture) are Aurélien's own account too. Société Générale's (a drastic reduction in production incidents, richer collaborative documentation) come, for the reduction, from its legacy actions, since the legacy content has no measured outcomes for it ("drastic" is Aurélien's own assessment), and, for the documentation, from Aurélien's own account, and so do Natixis's (new backend and frontend components, legacy code cleaned up through continuous refactoring), and SNCF Connect & Tech's (new B2C web services in a service-oriented environment (SOA), automated test suites built with the QA team), ONIAM's (Procédures d’indemnisation 100% dématérialisées, Application développée avec des bibliothèques 100% open source), and Veolia's (500 000+ customer contracts managed, releases on a high-availability platform). `Projects.astro`'s decorative icons are `aria-hidden`, so `#case-studies` exposes no image role. Every card shows the same drawing, `~/assets/images/case-studies/illustration.svg` (a redraw of janjf93's Pixabay vector #3614766: a phone and a laptop showing charts). It is imported with `?raw` and inlined as a string, because `Projects.astro` injects string images as raw HTML and an `<img>` SVG could not follow the class-based `.dark` mode. Only the colours change, and they come from each client's brand: the logos in `src/assets/images/collaborations/`, or the website when the logo has no hue. Every fill is a `--cs-*` role variable. `src/assets/styles/case-studies.css` derives one shade ramp (`--cs-50`…`--cs-950`) from two anchors with `color-mix()`: lighter shades mix the brand colour with white, and darker ones mix it with a deep tone, so dark mode keeps the brand hue instead of going muddy. The roles use light shades by default and dark shades under `.dark`. Each card sets `data-palette` to its catalog key, and each brand defines only `--cs-brand` and `--cs-deep`. ICAP uses its logo's `#5c74a7` with `#2a407c`, Malt uses `#fc5656` with Tailwind `red-950` (read with `--theme()` so Tailwind emits it), Dyma uses `#3c82f6` with the logo's `#0f172a`, Orange uses its logo's only hue `#ff7900` with Tailwind `orange-950`, Ortho Assistant uses the app banner blue `#2d3f50` (sampled from the legacy screenshot, since it has no logo hue) as its deep tone, with `#507395`, the same slate hue at 45% lightness, as its brand: the banner alone is too dark to anchor the ramp, so the dark-mode chart (`--cs-400`) vanished on the dark card, and Softway uses its logo's red `#ea5b56` with the logo's grey `#5d5d5c`, the grey deep tone keeping it apart from Malt's close red, and Société Générale uses its logo's black rather than its red, as Tailwind `neutral-600` with `neutral-950` (both read with `--theme()`): pure black as the brand would make the dark-mode chart (`--cs-400`) vanish on the near-black background, Natixis uses the main purple `#78578f` of its logo with the logo's darkest purple `#382c3f`, SNCF Connect & Tech uses the blue `#0088ce` of its logo with the dark navy `#0c131f`, and ONIAM uses the French government "bleu France" `#6a6af4` with the logo's Marianne blue `#000091`, too dark to anchor the ramp as the brand. Veolia uses the red `#e52528` of its logo with a deep wine `#5c0a0e`, which keeps it apart from Malt's `#fc5656` and Softway's `#ea5b56`. Namirial's logo is a black wordmark, so it uses the teal from namirial.com: `#00a69d` (headline accent) with `#00423f` (button text). The SVG has no `id`s, because it is inlined twelve times on one page. It is decorative (`aria-hidden`). `e2e/home.spec.ts` checks, in light and dark mode, that the twelve backgrounds differ from each other and from their card. Items have no `href`, because `Projects.astro` hardcodes the English "View project" link text. Instead, a catalog entry can carry an optional `link` (`href` plus a `textKey`), which `getCaseStudies` appends to the description as an inline `<a>` opening in a new tab (`rel="noopener noreferrer"`, primary blue with `dark:text-blue-400`), followed by Tabler's `external-link` icon inlined as raw SVG (`aria-hidden`, `currentColor`), since astro-icon's `<Icon>` can't render inside a string; `Projects.astro` renders descriptions with `set:html`. Dyma has one, to its course page, and Softway Medical one, to the wound-care module's client testimonial on YouTube, labelled "Voir la démo" / "Watch the demo" (`https://youtu.be/NwEPv_cVKC0`, without the share-tracking `si` parameter). The URL lives once in the catalog and only the link text (`home.caseStudies.<key>.linkText`) is translated.
  The section is a horizontal slider so it keeps a single row whatever the number of cards: a grid leaves a partial last row whenever the count is not a multiple of the column count. `getColumnsClass(4)` in `src/utils/utils.ts` still skips 3 columns (2 to 4) for every grid widget, although the home case studies no longer use the grid. `Projects.astro` takes an opt-in `variant: 'grid' | 'slider'` (default `grid`, unchanged) plus `previousLabel` / `nextLabel` (`home.caseStudies.previous` / `.next`). The slider is an `<aw-projects-slider>` custom element (guarded by `customElements.get`, so it survives view transitions) holding a scroller `<div data-aw-slider-list>` (native scroll-snap, `snap-x snap-mandatory`, hidden scrollbar, `tabindex="0"` so keyboard scrolling works) that wraps the `<ul>`, so the `<ul>` keeps its list semantics. The scroller gets `role="region"` and `aria-label` = section title only when a title exists (no unnamed region). It is a container-query box (`@container`), so cards size with `cqw` (1 wide on phones, 2 from `sm`, 4 from `lg`, widths computed from the gaps) while the `<ul>` is `w-max`. The intersect fade classes are dropped in slider mode, because cards clipped by `overflow-x` would stay `opacity-0`. Two round arrows (`tabler:chevron-left` / `chevron-right`, covered by the `tabler: ['*']` astro-icon allowlist) use `aria-disabled` instead of `disabled`, so a focused "next" keeps focus when it reaches the end; at an end the click handler is a no-op (Enter does nothing). Below `md` the disabled arrow is dimmed (`opacity-40`, `cursor-not-allowed`, no hover background) so both arrows always show under the cards; from `md` it is hidden (`md:aria-disabled:opacity-0 md:aria-disabled:pointer-events-none`), guarded by `e2e/home.spec.ts` at 375 and 1280px (computed opacity). Both start `aria-disabled="true"` in the HTML, so without JS they start disabled (dimmed on phones, hidden from `md`); the script enables them in `updateButtons()`, refreshed on `scroll` and a `ResizeObserver`, and removes its listeners in `disconnectedCallback`. From `md` the arrows straddle the left and right edges at mid-height; below `md` they sit side by side, centered below the slider (the wrapper has `pb-14`), so they never cover the single card's text. `e2e/home.spec.ts` replaced the per-row layout test with: 4, 2 and 1 cards fully visible at 1280, 900 and 375px with aligned tops and footers, localized button names, the named region holding a 12-item list, the `aria-disabled` ends after clicking next, and keyboard focus kept on next at the end.
- The contact section is a `Steps2` widget (`id="contact"`, last, after case studies) fed by `getContactItems(lang)` and
  `getContactCallToAction(lang)` in `src/i18n/contact.ts`: a typed catalog (email, phone, LinkedIn, Malt) mapped to
  `home.contact.<key>.title` copy and Tabler icons. The email address is defined once and shared by the email item
  and the mailto CTA. The LinkedIn URL is per locale (`?locale=en_US` for en) and opens in a new tab. The Malt hrefs (`MALT_HREFS`) are shared with `social.ts` like `LINKEDIN_HREFS`, and Malt opens in a new tab too. `display` may be per locale: Malt shows `malt.fr/profile/aurelientondoux` in fr and `malt.com/profile/aurelientondoux` in en. `Steps2.astro`
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
