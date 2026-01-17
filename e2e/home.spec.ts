import { test, expect } from '@playwright/test';

test.use({ locale: 'fr-FR' });

test.describe('Home Page', () => {
  test('displays key information to visitor', async ({ page }) => {
    await page.goto('/');

    // Identity: Name and title
    await expect(page.getByRole('heading', {
      name: 'Bonjour, je suis Aurélien Tondoux Ingénieur Logiciel Senior'
    })).toBeVisible();

    // Value proposition
    await expect(page.getByText(
      'Je développe des logiciels de qualité qui résolvent des problèmes concrets.'
    )).toBeVisible();

    // Quick introduction
    await expect(page.getByRole('heading', { name: /a propos/i })).toBeVisible();
    await expect(page.getByText(/Avec plus de 15 ans d’expérience/i)).toBeVisible();

    // Work experience overview
    await expect(page.getByRole('heading', { name: 'Expérience' })).toBeVisible();
    await expect(page.getByText('AT Code Lab')).toBeVisible();
    await expect(page.getByText('Softway Medical')).toBeVisible();
    await expect(page.getByText('Monde')).toBeVisible();
    await expect(page.getByText('ESN')).toBeVisible();
  });

  test('provides interactive elements for visitor actions', async ({ page }) => {
    await page.goto('/');

    // Primary Call To Action: Book meeting
    const bookingLink = page.getByRole('link', { name: 'Prendre un rendez-vous' });
    await expect(bookingLink).toBeVisible();
    await expect(bookingLink).toBeEnabled();
    await expect(bookingLink).toHaveAttribute('href', 'https://calendly.com/atondoux/30min');

    // Social links: LinkedIn (first occurrence is in hero, not footer)
    const linkedInLink = page.getByRole('link', { name: /linkedin/i }).first();
    await expect(linkedInLink).toBeVisible();
    await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/atondoux/');

    // Social links: GitHub (first occurrence is in hero, not footer)
    const gitHubLink = page.getByRole('link', { name: /github/i }).first();
    await expect(gitHubLink).toBeVisible();
    await expect(gitHubLink).toHaveAttribute('href', 'https://github.com/atondoux/');
  });

  test('provides navigation to other pages', async ({ page }) => {
    await page.goto('/');

    // Verify navigation links exist and are accessible
    await expect(page.getByTestId('nav-services')).toBeVisible();
    await expect(page.getByTestId('nav-services')).toBeEnabled();

    await expect(page.getByTestId('nav-projects')).toBeVisible();
    await expect(page.getByTestId('nav-projects')).toBeEnabled();

    await expect(page.getByTestId('nav-products')).toBeVisible();
    await expect(page.getByTestId('nav-products')).toBeEnabled();

    await expect(page.getByTestId('nav-about')).toBeVisible();
    await expect(page.getByTestId('nav-about')).toBeEnabled();
  });

  test('provides language and theme switchers to visitor', async ({ page }) => {
    await page.goto('/');

    // Language switcher (shows next language)
    const languageSwitcher = page.getByRole('button', { name: /switch to english/i });
    await expect(languageSwitcher).toBeVisible();
    await expect(languageSwitcher).toBeEnabled();

    // Theme switcher (shows next theme)
    const themeSwitcher = page.getByRole('button', { name: /switch to (light|dark) mode/i });
    await expect(themeSwitcher).toBeVisible();
    await expect(themeSwitcher).toBeEnabled();
  });
});
