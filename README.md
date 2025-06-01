# atondoux.github.io

My personal website showcasing my experience as a software engineer. You can visit the live site at [aurelientondoux.com](https://aurelientondoux.com).

## ✨ Features

- 🏗️ Statically built using [Hugo](https://gohugo.io/)
- 🌟 Beautifully presented with the [Congo](https://github.com/jpanther/congo) theme
- 📱 Fully responsive layout
- 💡 Dark and light mode toggle
- 📊 Charts using [Chart.js](https://www.chartjs.org/)
- 🏷 Tags for content organization

## 🖥️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/atondoux/atondoux.github.io.git
   cd atondoux.github.io
   ```

2. Install Hugo (extended version required) ⚠️ Due to some changes in Hugo's internal template system, you need to stick with Hugo `v0.145.x`
   to avoid issues with the Congo theme:
   ```bash
   # see: https://gohugo.io/installation/
   ```

3. Start the local development server:
   ```bash
   hugo server
   ```

4. Open your browser and go to [`http://localhost:1313`](http://localhost:1313) to view the site.

## 🚀 Deployment

The site is automatically built and deployed using GitHub Actions whenever changes are pushed to the `main` branch.

The GitHub Actions workflow configuration can be found in `.github/workflows/hugo.yaml`.

## 🤝 Contributing

While this is a personal website, feel free to open an issue or submit a pull request if you have suggestions.
Contributions are welcome!
