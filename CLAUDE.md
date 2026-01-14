# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Nuxt 4 and Nuxt UI, deployed to GitHub Pages at https://aurelientondoux.com.

**Tech Stack:**
- Nuxt v4.2.2
- @nuxt/ui v4.2.1 (component library)
- @nuxt/content v3.8.2 (markdown-based content)
- @nuxt/image v2.0.0 (image optimization)
- @vueuse/nuxt v13.9.0 (Vue utilities)
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
pnpm build          # Build for production
pnpm generate       # Generate static site
pnpm preview        # Preview production build
```

**Code Quality:**
```bash
pnpm typecheck      # Run TypeScript type checking
pnpm lint           # Run ESLint
pnpm lint:fix       # Auto-fix linting issues
```

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
- `@nuxt/ui` - Pre-built UI components
- `@nuxt/content` - Markdown-based CMS
- `@vueuse/nuxt` - Vue composition utilities
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
modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/content', '@vueuse/nuxt', 'nuxt-og-image', 'motion-v/nuxt']
devtools: { enabled: true }
css: ['~/assets/css/main.css']
compatibilityDate: '2024-11-01'
```

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

## Deployment

- GitHub Actions workflow: `.github/workflows/deploy.yaml`
- Static generation: `pnpm generate`
- Output directory: `.output/public/`
- Deployed to GitHub Pages on push to `main` branch
