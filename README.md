# atondoux.github.io

My personal website showcasing my experience as a software engineer. You can visit the live site at [aurelientondoux.com](https://aurelientondoux.com).

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

## 🤝 Contributing

While this is a personal website, feel free to open an issue or submit a pull request if you have suggestions.
Contributions are welcome!
