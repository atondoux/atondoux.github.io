# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Hugo static site generator, using the Congo theme. Deployed to GitHub Pages at https://aurelientondoux.com.

**Tech Stack:**
- Hugo v0.151.2 (extended version required)
- Congo theme (git submodule on stable branch)
- Docker for local development
- GitHub Actions for automated deployment
- Bilingual content (French default, English secondary)

## Development Commands

**Local Development:**
```bash
docker compose up
# Starts Hugo dev server at http://localhost:1313
# Hot reload enabled with 700ms polling
# Environment: development, timezone Europe/Paris
```

**Manual Build (Production):**
```bash
hugo --gc --minify --baseURL "https://aurelientondoux.com/"
```

**Theme Management:**
```bash
# The Congo theme is a git submodule
git submodule update --init --recursive  # Initialize submodule
git submodule update --remote            # Update to latest version
```

**Deployment:**
- Automatic deployment via GitHub Actions on push to `main` branch
- Workflow: `.github/workflows/hugo.yaml`
- Uses Hugo 0.151.2, Dart Sass, and optional Node.js dependencies

## Architecture

### Content Organization

This is a **content-driven architecture** where all pages are written in Markdown with YAML frontmatter. The site is fully bilingual with paired content files.
The directory structure follows the Hugo convention for multi-language sites.

### Multi-Language Pattern

All content uses a **paired file pattern** for bilingual support:
- French (default, weight: 1): `index.md`, `_index.md`
- English (weight: 2): `index.en.md`, `_index.en.md`

Language configurations are split across `languages.fr.toml` and `languages.en.toml`, including separate menu definitions in `menus.fr.toml` and `menus.en.toml`.

### Content Metadata Pattern

All projects and products follow a consistent frontmatter structure:

```yaml
---
title: "Project Name"
date: YYYY-MM-DD
slug: "url-friendly-name"
summary: "One-line business value description"
tags: ["Domain", "Technology", "Methodology"]
thumbnail: "path/to/image.webp"  # or 'cover'
---
```

**Naming Convention:**
- Projects/products folders use numbered prefixes for ordering: `00-name/`, `01-name/`, etc.
- This ensures consistent display order independent of alphabetical sorting

### Component System

The site uses **Hugo shortcodes** for reusable UI components.

### Theme Customization

**Key configuration (`params.toml`):**
- Color scheme: `"ocean"` (blue-based palette)
- Default appearance: `"dark"` (dark mode by default)
- Features enabled: code copy, lazy loading, WebP images, Chart.js
- Analytics: Google Analytics ID `G-JCKXZ1J4W3`

**Customization approach:**
- Override theme templates by creating matching files in `/layouts/`
- Custom partials in `/layouts/partials/` take precedence over theme defaults
- Never edit theme files directly (submodule)

## Coding Conventions

**Commit Messages:**
- Use Gitmoji for visual context (e.g., `:sparkles:` for new features)
- A short message should clearly describe the change

**Content Style:**
- Use emoji shorthand in markdown for visual communication (`:wave_tone1:`, `:check_mark_button:`)
- Structure content with clear headings and sections
- Tags should mix domains, technologies, and methodologies for comprehensive filtering

**Configuration Files:**
- All config uses TOML format (not YAML or JSON)
- Keep language-specific settings in separate `languages.*.toml` files
- Theme customization goes in `params.toml`, not `config.toml`

## Important Notes

**Hugo Version Compatibility:**
- Always verify compatibility between Hugo version and Congo theme before upgrading
- Production uses Hugo 0.151.2 (defined in GitHub Actions workflow)
- Extended version required for Sass/SCSS processing

**Theme Updates:**
- Congo theme is a git submodule tracking the `stable` branch
- Test theme updates locally before deploying
- Theme repository: https://github.com/jpanther/congo

**Deployment:**
- `main` branch is protected with auto-deployment
- Use feature branches for development work
- GitHub Actions workflow handles build and deployment automatically
- No manual deployment steps required for production

**Static Assets:**
- Place static files in `/static/` (favicons, manifest, etc.)
- Place assets that need processing in `/assets/` (images for optimization)
- Use relative paths without leading slash in theme overrides
