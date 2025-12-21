# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Hugo and deployed to GitHub Pages at https://aurelientondoux.com.

**Tech Stack:**
- Hugo static site generator
- Congo theme (jpanther/congo)
- Docker for local development
- GitHub Actions for deployment

## Development Commands

**Local Development:**
```bash
cd hugo-website
docker compose up
# Starts Hugo server at http://localhost:1313
# Hot reload enabled
```

**Build:**
```bash
cd hugo-website
hugo
# Generates static site in public/ directory
```

## Architecture

### Directory Structure

```
/
├── hugo-website/            # Hugo project (production site)
│   ├── config/             # Hugo configuration
│   ├── content/            # Markdown content
│   ├── layouts/            # HTML templates
│   ├── themes/             # Congo theme (Git submodule)
│   ├── public/             # Generated static site
│   ├── assets/             # SCSS/style assets
│   ├── static/             # Static files to copy
│   ├── archetypes/         # Content templates
│   ├── resources/          # Generated resources
│   └── docker-compose.yml  # Local dev environment
├── public/                  # Static assets (favicons, manifest)
├── .github/workflows/       # GitHub Actions workflows
│   └── hugo.yaml           # Deployment workflow
└── .gitmodules             # Git submodule for Congo theme
```

### Content Organization

Hugo content is organized in `hugo-website/content/`:
- Blog posts, projects, and pages written in Markdown
- Frontmatter defines metadata (title, date, tags, etc.)
- Congo theme provides layouts and components

### Styling

The site uses the Congo theme which provides:
- Responsive design
- Dark/light mode toggle
- Chart.js integration for data visualization
- Tag-based content organization

## Configuration Files

### hugo-website/config/

Hugo configuration files (TOML format):
- Site settings, languages, menus
- Theme configuration
- Build parameters

### docker-compose.yml

Located in `hugo-website/docker-compose.yml`:
- Runs Hugo server in Docker container
- Maps port 1313 for local development
- Enables live reload

## Deployment

**Deployment Architecture:**
- GitHub Actions workflow: `.github/workflows/hugo.yaml`
- Builds: `hugo-website/` → `hugo-website/public/`
- Deploys: `hugo-website/public/*` → GitHub Pages
- Triggered on push to `main` branch

**Static Assets:**
- Root `public/` directory contains favicons and site.webmanifest
- These files are deployed to the domain root

## Important Notes

**Congo Theme:**
- Installed as Git submodule in `hugo-website/themes/congo`
- Always verify version compatibility between Hugo and Congo before upgrading
- Theme documentation: https://github.com/jpanther/congo

**Hugo Public Directory:**
- `hugo-website/public/` is auto-generated on build
- Do not manually edit files in this directory
- Directory is rebuilt on every Hugo build

**Docker Development:**
- Use Docker Compose for consistent local environment
- Eliminates need to install Hugo locally
- Ensures version consistency across environments

## Coding Conventions

**Content Files:**
- Write content in Markdown
- Use Hugo frontmatter for metadata
- Follow Congo theme content structure

**File Organization:**
- Keep all Hugo-specific files in `hugo-website/`
- Root-level files are for repository configuration only

**Git Submodules:**
- Congo theme is managed as a Git submodule
- Use `git submodule update --init --recursive` after cloning

---

# Nuxt UI Portfolio (Development)

Modern portfolio rebuild using Nuxt 4 and Nuxt UI. Currently in development alongside the Hugo production site.

**Project Status:**
- **Hugo:** Production site (live at aurelientondoux.com)
- **Nuxt:** Development site (local only)

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

## Nuxt Architecture

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
├── public/                  # Static assets (shared with Hugo)
│   ├── hero/               # Hero images
│   ├── robots.txt          # Search engine directives
│   └── favicon.*           # Favicons (preserved from Hugo)
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

**Dual-Project Structure:**
- Hugo (production) in `hugo-website/`
- Nuxt (development) at repository root
- Both projects coexist independently
- Hugo deployment workflow unchanged

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

**Static Assets:**
- Root `public/` directory shared between Hugo and Nuxt
- Existing favicons preserved from Hugo
- Template's hero images added in `public/hero/`

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

## Deployment (Future)

Not yet configured. When ready:
- Static generation: `pnpm generate`
- Output directory: `.output/public/`
- Deploy to GitHub Pages or other static hosting
- Will eventually replace Hugo deployment
