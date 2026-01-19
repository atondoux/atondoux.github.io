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

    // Service 1 - Tech Lead with price 600€
    const techLeadCard = page.getByTestId('service-0');
    await expect(techLeadCard).toBeVisible();
    await expect(techLeadCard.getByText('Tech Lead')).toBeVisible();
    await expect(techLeadCard.getByText('600€')).toBeVisible();

    // Service 2 - Développeur Full Stack with price 600€
    const fullStackCard = page.getByTestId('service-1');
    await expect(fullStackCard).toBeVisible();
    await expect(fullStackCard.getByText('Développeur Full Stack')).toBeVisible();
    await expect(fullStackCard.getByText('600€')).toBeVisible();

    // Service 3 - Applications & Conseils with price "Devis sur demande"
    const consultingCard = page.getByTestId('service-2');
    await expect(consultingCard).toBeVisible();
    await expect(consultingCard.getByText('Applications & Conseils')).toBeVisible();
    await expect(consultingCard.getByText('Devis sur demande')).toBeVisible();
  });
});
