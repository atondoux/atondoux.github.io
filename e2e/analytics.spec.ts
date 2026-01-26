import { test, expect } from '@playwright/test'

test.describe('Google Analytics', () => {
  test('should load gtag.js script when measurement ID is configured', async ({ page }) => {
    await page.goto('/')

    const gtagScript = page.locator('script[src*="googletagmanager.com/gtag"]')
    await expect(gtagScript).toBeAttached()
  })
})
