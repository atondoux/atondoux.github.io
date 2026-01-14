# atondoux.github.io

Personal portfolio website showcasing my experience as a software engineer. You can visit the live site at [aurelientondoux.com](https://aurelientondoux.com).

## ✨ Features

- ⚡ Built with [Nuxt 4.2.2](https://nuxt.com/)
- 🎨 Beautiful UI with [@nuxt/ui 4.2.1](https://ui.nuxt.com/)
- 📝 Content management with [@nuxt/content 3.8.2](https://content.nuxt.com/)
- 🖼️ Image optimization with [@nuxt/image 2.0.0](https://image.nuxt.com/)
- 🔒 TypeScript strict mode
- 📱 Fully responsive design
- 🌙 Dark/light theme support
- ⚙️ Auto-imported components
- 🎭 Motion animations

## ⚒️ Prerequisites

1. **Node.js LTS** (v20.x recommended)
2. **pnpm** package manager (v10.x)

## 🖥️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atondoux/atondoux.github.io.git
   cd atondoux.github.io
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev --host 127.0.0.1
   ```

4. **Open your browser:**
   - Visit [`http://127.0.0.1:3000`](http://127.0.0.1:3000)

## 🔧 Development Commands

```bash
# Start development server
pnpm dev --host 127.0.0.1

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview

# Run TypeScript type checking
pnpm typecheck

# Lint code
pnpm lint
```

## 🚀 Deployment

The site is automatically built and deployed using GitHub Actions whenever changes are pushed to the `main` branch.

The GitHub Actions workflow configuration can be found in `.github/workflows/deploy.yaml`.

---

## 🤝 Contributing

While this is a personal website, feel free to open an issue or submit a pull request if you have suggestions. Contributions are welcome!
