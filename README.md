# aurelientondoux.com

Personal portfolio of Aurélien Tondoux, rebuilt with [Astro](https://astro.build) on the
[AstroWind](https://github.com/arthelokyo/astrowind) template, Tailwind CSS v4 and TypeScript.

The previous Nuxt site is archived in [`legacy-nuxt/`](legacy-nuxt/). It is kept only as a reference and is no
longer built or deployed.

## Requirements

- Node 24.21.0 (see `.nvmrc`)
- pnpm 12, enabled through corepack: `corepack enable`

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:4321 and redirects to the French locale (`/fr/`). English is at `/en/`.

## Scripts

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Start the dev server                             |
| `pnpm build`     | Build the static site into `dist/`               |
| `pnpm preview`   | Serve the built site                             |
| `pnpm check`     | Type check, lint and format check                |
| `pnpm fix`       | Auto-fix lint and formatting                     |
| `pnpm test:unit` | Run the Vitest unit tests                        |
| `pnpm test:e2e`  | Run the Playwright tests against `astro preview` |
| `pnpm test:all`  | Run unit and E2E tests                           |

## License

The AstroWind template is distributed under the MIT license, see [LICENSE.md](LICENSE.md).
