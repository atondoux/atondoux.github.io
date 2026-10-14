import { expect, test } from '@playwright/test';

test.use({ colorScheme: 'dark' });

test('shows the light theme by default even when the system prefers dark', async ({ page }) => {
  await page.goto('/fr/');

  const html = page.locator('html');

  await expect(html).not.toHaveClass(/\bdark\b/);
});

test('keeps the dark theme chosen with the toggle across page loads', async ({ page }) => {
  await page.goto('/fr/');

  await page.locator('[data-aw-toggle-color-scheme]:visible').first().click();
  await page.reload();

  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
});
