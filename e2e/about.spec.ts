import { test, expect } from '@playwright/test';

test.use({ locale: 'fr-FR' });

test.describe('About Page', () => {
  test('displays about information to visitor', async ({ page, baseURL }) => {
    // Start from home page
    await page.goto('/');

    // Navigate to about page via navigation menu
    const aboutLink = page.getByTestId('nav-about');
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toBeEnabled();
    await aboutLink.click();

    // Displays author presentation to visitor
    await expect(page.getByRole('heading', { name: 'A propos.' })).toBeVisible();
  });
});
