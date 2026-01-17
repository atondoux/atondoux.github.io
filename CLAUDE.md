# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Nuxt 4 and Nuxt UI, deployed to GitHub Pages at https://aurelientondoux.com.

**Tech Stack:**
- Nuxt v4.2.2
- @nuxt/ui v4.2.1 (component library)
- @nuxt/content v3.8.2 (markdown-based content)
- @nuxt/image v2.0.0 (image optimization)
- @vueuse/nuxt v14.1.0 (Vue utilities)
- @nuxtjs/i18n v10.2.1 (internationalization)
- motion-v v1.7.3 (animations)
- TypeScript strict mode
- ESLint configuration
- pnpm package manager

## Development Commands

**Local Development:**
```bash
pnpm dev --host 127.0.0.1
# Starts Nuxt dev server at http://127.0.0.1:3000
# Hot reload enabled
```

**Build:**
```bash
pnpm build                       # Build for production (SSR)
pnpm generate                    # Generate static site to .output/public/
pnpm preview                     # Preview production build
npx serve .output/public         # Preview static build locally
```

**Code Quality:**
```bash
pnpm typecheck      # Run TypeScript type checking
pnpm lint           # Run ESLint
pnpm lint:fix       # Auto-fix linting issues
```

**Testing:**
```bash
pnpm test:unit               # Run unit tests (Vitest)
pnpm test:e2e                # Run E2E tests (Playwright)
pnpm test:e2e:ui             # Run E2E tests in UI mode (interactive)
pnpm test:all                # Run both unit and E2E tests
pnpm test:e2e:install        # Install Playwright browsers (one-time setup)
```

**First-time E2E setup:**
```bash
pnpm test:e2e:install        # Installs Chromium, Firefox, WebKit + system dependencies
```

**Test organization:**
- Unit tests: `**/*.test.ts` (run with Vitest via `pnpm test:unit`)
- E2E tests: `e2e/**/*.spec.ts` (run with Playwright via `pnpm test:e2e`)

## Architecture

### Directory Structure

```
/
├── app/                     # Nuxt application directory
│   ├── pages/              # File-based routing
│   ├── layouts/            # Layout templates
│   └── components/         # Auto-imported Vue components
├── content/                 # Markdown content (Nuxt Content)
│   ├── blog/               # Blog posts
│   ├── projects/           # Project showcases
│   └── ...                 # Other content collections
├── public/                  # Static assets
│   ├── hero/               # Hero images
│   ├── robots.txt          # Search engine directives
│   └── favicon.*           # Favicons
├── nuxt.config.ts          # Nuxt configuration
├── content.config.ts       # Nuxt Content schema
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Node dependencies
└── pnpm-workspace.yaml     # pnpm workspace config
```

### Nuxt Modules

**Installed Modules:**
- `@nuxt/eslint` - ESLint integration
- `@nuxt/image` - Image optimization
- `@nuxt/ui` - Pre-built UI components (includes @nuxt/icon automatically)
- `@nuxt/content` - Markdown-based CMS
- `@vueuse/nuxt` - Vue composition utilities
- `@nuxtjs/i18n` - Internationalization (fr/en)
- `nuxt-og-image` - Open Graph image generation
- `motion-v/nuxt` - Animation library

### Content Management

Content uses Nuxt Content v3 with markdown files:
- Files in `content/` directory
- YAML frontmatter for metadata
- Auto-imported content components
- Type-safe content queries

### Component System

**Auto-imports enabled for:**
- Components in `app/components/` (Nuxt auto-discovery)
- Nuxt UI components (UContainer, UCard, UButton, etc.)
- Composables (useI18n, useLocalePath, useAsyncData, etc.)
- Content queries (queryCollection, ContentRenderer)

**No manual imports needed** - Nuxt handles auto-imports automatically.

## Configuration Files

### nuxt.config.ts

Key settings:
```typescript
modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/content', '@vueuse/nuxt', 'nuxt-og-image', 'motion-v/nuxt', '@nuxtjs/i18n']
devtools: { enabled: true }
css: ['~/assets/css/main.css']
compatibilityDate: '2024-11-01'

// Icon bundling for static deployment (GitHub Pages)
icon: {
  provider: 'server',
  clientBundle: {
    scan: true,
    icons: ['lucide:sun', 'lucide:moon', ...] // Dynamically rendered icons
  }
}
```

**Important:** Do NOT add `@nuxt/icon` to the modules array - Nuxt UI registers it automatically with correct default settings.

### content.config.ts

Nuxt Content schema configuration:
- Defines content collection types
- Zod schema validation
- Type-safe content queries

### tsconfig.json

TypeScript configuration:
- Strict mode enabled
- Extends Nuxt's base TypeScript config
- Auto-generated types in `.nuxt/`

## Important Notes

**Dependencies:**
- `better-sqlite3` required by @nuxt/content (native compilation)
- `pnpm.onlyBuiltDependencies: ["better-sqlite3"]` in package.json
- oxc bindings manually installed for Apple Silicon compatibility:
  - `@oxc-parser/binding-darwin-arm64`
  - `@oxc-transform/binding-darwin-arm64`
  - `@oxc-minify/binding-darwin-arm64`
  - `@oxc-resolver/binding-darwin-arm64`

**TypeScript:**
- Strict mode enabled in tsconfig.json
- Run `pnpm nuxt prepare` to generate types
- IDE TypeScript support works out of the box

**Development Server:**
- Must use `--host 127.0.0.1` flag for correct binding
- Default port: 3000
- DevTools available at Shift + Option + D

## Coding Conventions

**Auto-imports:**
- Never manually import Nuxt composables, components, or utilities
- Rely on Nuxt's auto-import system

**Path aliases:**
- `~/` - Project root
- Example: `~/assets/css/main.css`

**Component naming:**
- PascalCase in templates: `<UContainer>`, `<ContentRenderer>`
- File names: kebab-case for pages, PascalCase for components

**Content queries:**
```typescript
// Query content from collection
const { data: posts } = await useAsyncData(
  'blog-posts',
  () => queryCollection('blog').all()
)
```

## Testing Conventions

- Use behavior-oriented test names that describe user scenarios
- Test behavior, not implementation details
- Follow the pattern: `"should [expected behavior] when [condition]"`
- Match E2E test style for consistency across unit and integration tests
- Test complete user scenarios, not fragmented behaviors
- Verify both UI state and resulting actions in the same test
- Avoid splitting related assertions into separate tests
- Use `data-testid` attributes for stable element selection

**Example pattern:**
```typescript
it('should switch from English to French when locale is en', async () => {
  mockLocale.value = 'en'
  const wrapper = factory()
  const button = wrapper.find('[data-testid="language-switcher"]')

  // Verify UI state (what user sees)
  expect(button.attributes('aria-label')).toBe('Switch to Français')

  // Verify action (what happens on interaction)
  await button.trigger('click')
  expect(mockSetLocale).toHaveBeenCalledWith('fr')
})
```

## Internationalization (i18n)

The site supports French (default) and English:
- Locale files in `i18n/locales/` (fr.json, en.json)
- Strategy: `prefix_except_default` (French at `/`, English at `/en/`)
- Use `useI18n()` for translations, `useLocalePath()` for localized routes
- Navigation labels are translated and accessible via `data-testid` attributes

## Deployment

- GitHub Actions workflow: `.github/workflows/deploy.yaml`
- Static generation: `pnpm generate`
- Output directory: `.output/public/`
- Deployed to GitHub Pages on push to `main` branch
- Preview locally: `npx serve .output/public` after generate
