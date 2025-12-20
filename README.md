# atondoux.github.io

Personal portfolio website showcasing my experience as a software engineer. You can visit the live site at [aurelientondoux.com](https://aurelientondoux.com).

## ✨ Features

- 🏗️ Statically built using [Hugo](https://gohugo.io/)
- 🌟 Beautifully presented with the [Congo](https://github.com/jpanther/congo) theme
- 📱 Fully responsive layout
- 💡 Dark and light mode toggle
- 📊 Charts using [Chart.js](https://www.chartjs.org/)
- 🏷 Tags for content organization

## ⚒️ Prerequisites

1. Your favorite IDE
2. [Docker](https://www.docker.com/)
3. **Important**: Always verify version compatibility between Hugo and Congo theme before upgrading either component.

## 🖥️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/atondoux/atondoux.github.io.git
   cd atondoux.github.io
   ```

2. Start the local development server:
   ```bash
   cd hugo-website
   docker compose up
   ```

3. Open your browser and go to [`http://localhost:1313`](http://localhost:1313) to view the site.

## 🚀 Deployment

The site is automatically built and deployed using GitHub Actions whenever changes are pushed to the `main` branch.

The GitHub Actions workflow configuration can be found in `.github/workflows/hugo.yaml`.
---

# 🚧 Nuxt App Migration (Work in Progress)

A modern rebuild of the portfolio using Nuxt 4 is currently under development. This new version will offer improved performance, better developer experience, and enhanced features.

## ✨ Features

- ⚡ Built with [Nuxt 4](https://nuxt.com/) - The latest version of the Nuxt framework
- 📝 Content-driven with [@nuxt/content](https://content.nuxt.com/) - Markdown-based content management
- 🌍 Bilingual support (French/English) via [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- 🎨 Beautiful UI components with [@nuxt/ui](https://ui.nuxt.com/)
- 🔒 TypeScript strict mode for type safety
- 📱 Fully responsive design
- 🌙 Dark mode support
- 🚀 File-based routing
- ⚙️ Auto-imported components

## ⚒️ Prerequisites

1. **Node.js LTS** (v20.x recommended)
   - Use [nvm](https://github.com/nvm-sh/nvm) to install: `nvm install --lts && nvm use --lts`
2. **pnpm** package manager
   - Install globally: `npm install -g pnpm`

## 🖥️ Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   - French (default): [`http://localhost:3000`](http://localhost:3000)
   - English: [`http://localhost:3000/en`](http://localhost:3000/en)

## 🔧 Development Commands

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview

# Run TypeScript type checking
pnpm typecheck
```

## 📝 Content Management

Content is written in Markdown with YAML frontmatter:

```markdown
---
title: "Page Title"
description: "Page description for SEO"
---

# Your Content Here

Write your content in markdown...
```

**Bilingual Pattern:**
- French content: `content/page-name.md`
- English content: `content/en/page-name.md`

---

## 🤝 Contributing

While this is a personal website, feel free to open an issue or submit a pull request if you have suggestions. Contributions are welcome!
