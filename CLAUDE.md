# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website being rebuilt with Nuxt 4. Deployed to GitHub Pages at https://aurelientondoux.com.

**Current Status:**
- **Production (live):** Hugo static site in `/hugo-website/` directory
- **Development (active):** Nuxt 4 app being built to replace Hugo

**Tech Stack (Nuxt):**
- Nuxt v4.2.2
- @nuxt/content v3.9.0 (Markdown-based content)
- @nuxtjs/i18n v10.2.1 (bilingual support)
- @nuxt/ui v4.3.0 (component library)
- TypeScript strict mode
- pnpm package manager

## Development Commands

**Local Development:**
```bash
pnpm dev
# Starts Nuxt dev server at http://localhost:3000
# Hot reload enabled
```

**Build:**
```bash
pnpm build          # Build for production
pnpm generate       # Generate static site
pnpm preview        # Preview production build
```

**Type Checking:**
```bash
pnpm typecheck      # Run TypeScript type checking manually
```

**Note:** TypeScript type checking during development is disabled (`typeCheck: false`) due to vite-plugin-checker compatibility issues. Use `pnpm typecheck` or IDE type checking instead.

## Architecture

### Nuxt 4 App Directory Structure

The project follows the recommended Nuxt 4 `app/` directory convention:

```
/
├── app/                      # Nuxt 4 app directory (all Vue code)
│   ├── app.vue              # Application root component
│   ├── pages/               # File-based routing
│   │   └── index.vue        # Homepage
│   ├── layouts/             # Layout templates
│   │   └── default.vue      # Default layout
│   ├── components/          # Auto-imported Vue components
│   ├── assets/              # Stylesheets and processed assets
│   │   └── css/main.css     # Tailwind CSS imports
│   └── i18n/                # Internationalization
│       └── locales/         # Translation files
│           ├── fr.json      # French translations
│           └── en.json      # English translations
├── content/                 # Markdown content (Nuxt Content)
│   ├── index.md            # French homepage content
│   └── en/                 # English content
│       └── index.md        # English homepage content
├── public/                  # Static files (served at root)
├── nuxt.config.ts          # Nuxt configuration
├── app.config.ts           # Nuxt UI theme configuration
├── content.config.ts       # Content collection schema
└── tsconfig.json           # TypeScript configuration
```

### Multi-Language Pattern

Bilingual support using @nuxtjs/i18n:
- **Strategy:** `prefix_except_default`
- **Default locale:** French (`fr`)
- **Secondary locale:** English (`en`)

**Routing:**
- French: `/` (root, no prefix)
- English: `/en` (prefixed)

**Content files:**
- French: `content/page-name.md`
- English: `content/en/page-name.md`

**Translation files:**
- `app/i18n/locales/fr.json`
- `app/i18n/locales/en.json`

### Content Schema

Content uses Zod schema validation in `content.config.ts`:

```typescript
schema: z.object({
  title: z.string(),           // Required: Page title
  description: z.string(),     // Required: Page description for SEO
  image: z.string().optional(), // Optional: Social sharing image
  date: z.string().optional(),  // Optional: Publication date
  tags: z.array(z.string()).optional(), // Optional: Content tags
})
```

### Component System

**Auto-imports enabled for:**
- Components in `app/components/` (Nuxt auto-discovery)
- Nuxt UI components: `UContainer`, `UCard`, `UBadge`, `UButton`, etc.
- Composables: `useI18n()`, `useLocalePath()`, `useAsyncData()`, etc.
- Content: `queryCollection()`, `ContentRenderer`

**No manual imports needed** - Nuxt handles auto-imports automatically.

### Styling

**Tailwind CSS v4:**
- Main config: `tailwind.config.ts`
- Global CSS: `app/assets/css/main.css`
- Nuxt UI provides pre-styled components
- Dark mode supported out of the box

**Path in config:**
```typescript
css: ['~/app/assets/css/main.css']
```

## Configuration Files

### nuxt.config.ts

**Key settings:**
```typescript
modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/ui']
css: ['~/app/assets/css/main.css']

i18n: {
  defaultLocale: 'fr',
  strategy: 'prefix_except_default',
  langDir: 'app/i18n/locales'  // Must match actual location
}

typescript: {
  strict: true,
  typeCheck: false  // Disabled due to vite-plugin-checker issues
}
```

### app.config.ts

**Nuxt UI theme configuration:**
```typescript
ui: {
  colors: {
    primary: 'blue'
  }
}
```

### package.json

**Dependencies:**
- `better-sqlite3` is required by @nuxt/content (don't remove)
- `pnpm.onlyBuiltDependencies: ["better-sqlite3"]` allows native bindings to build

## Coding Conventions

**Auto-imports:**
- Never manually import Nuxt composables, components, or utilities
- Rely on Nuxt's auto-import system

**Path aliases:**
- `~/` - Project root
- `~/app/` - App directory
- Example: `~/app/assets/css/main.css`

**Component naming:**
- PascalCase in templates: `<UContainer>`, `<ContentRenderer>`
- File names: kebab-case for pages, PascalCase for components

**Content queries:**
```typescript
// Query content from collection
const { data: page } = await useAsyncData(
  'unique-key',
  () => queryCollection('content').path('/some-path').first()
)
```

**i18n usage:**
```typescript
const { locale, t } = useI18n()
const localePath = useLocalePath()

// In template
{{ t('key') }}
<NuxtLink :to="localePath('/')">
```

## Important Notes

**TypeScript:**
- Strict mode enabled in tsconfig.json
- Type checking disabled during dev (`typeCheck: false`)
- Run `pnpm typecheck` manually for type checking
- IDE TypeScript support still works

**Dependencies:**
- Use pnpm for all package management
- `better-sqlite3` requires native compilation (handled by pnpm config)
- Don't remove `better-sqlite3` - it's used by @nuxt/content

**Caching:**
- Clear `.nuxt/` and `.output/` if encountering build issues
- Run `pnpm nuxt prepare` to regenerate types

**i18n paths:**
- Configuration changed: `langDir: 'app/i18n/locales'`
- Files must be in `app/i18n/locales/`, not root `/locales/`

## Deployment (Future)

Currently, the Hugo version is deployed. Nuxt deployment will be configured later using:
- Static generation: `pnpm generate`
- Output directory: `.output/public/`
- Deploy to GitHub Pages (to be configured)

## Hugo Website (Legacy)

The previous Hugo-based website is preserved in `/hugo-website/` directory.
- **Not actively developed**
- Used for reference only
- See README.md for Hugo documentation
