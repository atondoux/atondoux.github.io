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

    // Testimonial 1 - Marie Dupont
    const testimonial0 = page.getByTestId('testimonial-0');
    await expect(testimonial0).toBeVisible();
    await expect(testimonial0.getByText('Marie Dupont')).toBeVisible();

    // Testimonial 2 - Jean Martin
    const testimonial1 = page.getByTestId('testimonial-1');
    await expect(testimonial1).toBeVisible();
    await expect(testimonial1.getByText('Jean Martin')).toBeVisible();

    // Testimonial 3 - Sophie Bernard
    const testimonial2 = page.getByTestId('testimonial-2');
    await expect(testimonial2).toBeVisible();
    await expect(testimonial2.getByText('Sophie Bernard')).toBeVisible();
  });
});
