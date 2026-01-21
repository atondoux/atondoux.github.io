import { test, expect } from '@playwright/test';

test.use({ locale: 'fr-FR' });

test.describe('Testimonials Page', () => {
  test('displays testimonials page to visitor', async ({ page }) => {
    // Start from home page
    await page.goto('/');

    // Navigate to testimonials page via navigation menu
    const testimonialsLink = page.getByTestId('nav-testimonials');
    await expect(testimonialsLink).toBeVisible();
    await expect(testimonialsLink).toBeEnabled();
    await testimonialsLink.click();

    // Verify page title is displayed (note the period at the end)
    await expect(page.getByRole('heading', { name: 'Témoignages.' })).toBeVisible();
  });
});
