import { expect, test } from '@playwright/test';

const localizedHeroes = [
  {
    lang: 'fr',
    path: '/fr/',
    tagline: 'Tech Lead Full Stack · 20 ans d’expérience',
    title: 'Aurélien TONDOUX',
    subtitle: 'Je développe des logiciels de qualité qui résolvent des problèmes concrets.',
  },
  {
    lang: 'en',
    path: '/en/',
    tagline: 'Full Stack Tech Lead · 20 years of experience',
    title: 'Aurélien TONDOUX',
    subtitle: 'I build quality software that solves real-world problems.',
  },
] as const;

for (const { lang, path, tagline, title, subtitle } of localizedHeroes) {
  test(`shows a single ${lang} h1 titled ${title} on ${path}`, async ({ page }) => {
    await page.goto(path);

    const headings = page.getByRole('heading', { level: 1 });

    await expect(headings).toHaveCount(1);
    await expect(headings).toHaveText(title);
  });

  test(`shows the ${lang} tagline on ${path}`, async ({ page }) => {
    await page.goto(path);

    const heroTagline = page.getByText(tagline, { exact: true });

    await expect(heroTagline).toBeVisible();
  });

  test(`shows the ${lang} subtitle on ${path}`, async ({ page }) => {
    await page.goto(path);

    const heroSubtitle = page.getByText(subtitle, { exact: true });

    await expect(heroSubtitle).toBeVisible();
  });
}
