import { test, expect } from '@playwright/test';

test.use({ locale: 'fr-FR' });

test.describe('Testimonials Page', () => {
  test('displays testimonials page to visitor', async ({ page }) => {
    await page.goto('/');

    const testimonialsLink = page.getByTestId('nav-testimonials');
    await expect(testimonialsLink).toBeVisible();
    await expect(testimonialsLink).toBeEnabled();
    await testimonialsLink.click();

    await expect(page.getByRole('heading', { name: 'Témoignages.' })).toBeVisible();
  });
});
