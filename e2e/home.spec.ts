import { expect, test } from '@playwright/test';

const localizedHeroes = [
  {
    lang: 'fr',
    path: '/fr/',
    tagline: 'Tech Lead · 20 ans d’expérience',
    title: 'Aurélien TONDOUX',
    subtitle: 'Ingénierie logicielle orientée produit x boostée à l’IA',
    emphasis: ['x boostée à l’IA'],
    aboutTitle: 'À propos',
    aboutSubtitle:
      'Je développe des logiciels de qualité qui résolvent des problèmes concrets. J’utilise l’IA pour le faire plus vite, et mieux. Je pars toujours des utilisateurs et de leurs vrais besoins pour bien saisir le pourquoi, avant de mobiliser mes compétences techniques sur le comment. Pour moi, la technologie doit être au service du produit, l’expérience utilisateur prime sur la liste de fonctionnalités, et la qualité n’est pas négociable.',
  },
  {
    lang: 'en',
    path: '/en/',
    tagline: 'Tech Lead · 20 years of experience',
    title: 'Aurélien TONDOUX',
    subtitle: 'Product-minded software engineering x AI-boosted',
    emphasis: ['x AI-boosted'],
    aboutTitle: 'About',
    aboutSubtitle:
      'I build quality software that solves real problems. I use AI to do it faster, and better. I always start from users and their real needs to understand the why, before applying my technical skills to the how. To me, technology must serve the product, user experience matters more than feature lists, and quality is non-negotiable.',
  },
] as const;

for (const { lang, path, tagline, title, subtitle, emphasis, aboutTitle, aboutSubtitle } of localizedHeroes) {
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

  test(`emphasises key words in the ${lang} subtitle on ${path}`, async ({ page }) => {
    await page.goto(path);

    const emphasisedWords = page.getByText(subtitle, { exact: true }).locator('strong');

    await expect(emphasisedWords).toHaveText(emphasis);
  });

  test(`shows the ${lang} about section on ${path}`, async ({ page }) => {
    await page.goto(path);

    const about = page.locator('#about');

    await expect(about).toBeVisible();
    await expect(about.getByRole('heading', { level: 2, name: aboutTitle })).toBeVisible();
    await expect(about.getByText(aboutSubtitle, { exact: true })).toBeVisible();
    await expect(about.locator('strong')).toHaveCount(0);
  });
}
