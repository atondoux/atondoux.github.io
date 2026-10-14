import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

// Load test environment variables
dotenv.config({ path: '.env.test' })

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3 : 0,
  /* Run tests serially in CI for stability (avoid resource contention) */
  workers: process.env.CI ? 1 : 2,
  /* Test timeout - 60s in CI, 30s locally */
  timeout: process.env.CI ? 60 * 1000 : 30 * 1000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Expect timeout for assertions */
  expect: {
    timeout: 30 * 1000
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/test-use-options. */
  use: {
    baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    headless: true,

    /* Navigation timeout for page loads */
    navigationTimeout: process.env.CI ? 30 * 1000 : 15 * 1000,

    /* Action timeout for interactions (click, fill, etc.) */
    actionTimeout: 10 * 1000
  },

  /* Configure projects for major browser engines */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm run dev --host 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    /* WebServer startup timeout */
    timeout: 120 * 1000,
    /* Pass test environment variables to dev server */
    env: {
      NUXT_PUBLIC_SITE_URL: process.env.NUXT_PUBLIC_SITE_URL || '',
      NUXT_PUBLIC_GTAG_ID: process.env.NUXT_PUBLIC_GTAG_ID || ''
    }
  }
})
