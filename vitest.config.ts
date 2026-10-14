/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

const COVERAGE_THRESHOLD = 80;

export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/i18n/**'],
      exclude: ['src/i18n/**/*.test.ts'],
      reporter: ['text', 'html'],
      thresholds: {
        lines: COVERAGE_THRESHOLD,
        functions: COVERAGE_THRESHOLD,
        branches: COVERAGE_THRESHOLD,
        statements: COVERAGE_THRESHOLD,
      },
    },
  },
});
