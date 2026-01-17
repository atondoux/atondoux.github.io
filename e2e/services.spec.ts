import { test, expect } from '@playwright/test';

test.use({ locale: 'fr-FR' });

test.describe('Services Page', () => {
  test('displays services offering to visitor', async ({ page, baseURL }) => {
    // Start from home page
    await page.goto('/');

    // Navigate to services page via navigation menu
    const servicesLink = page.getByTestId('nav-services');
    await expect(servicesLink).toBeVisible();
    await expect(servicesLink).toBeEnabled();
    await servicesLink.click();

    // Display services to visitor
    await expect(page.getByRole('heading', { name: 'Mon offre de services.' })).toBeVisible();
  });
});
