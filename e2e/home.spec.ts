import { expect, test } from '@playwright/test';

const localizedHeroes = [
  {
    lang: 'fr',
    path: '/fr/',
    tagline: 'Tech Lead · 20 ans d’expérience',
    title: 'Aurélien TONDOUX',
    subtitle: 'Ingénierie logicielle orientée produit — boostée à l’IA',
    emphasis: ['— boostée à l’IA'],
    aboutTitle: 'À propos',
    aboutSubtitle:
      'Je développe des logiciels de qualité qui résolvent des problèmes concrets. J’utilise l’IA pour le faire plus vite, et mieux. Je pars toujours des utilisateurs et de leurs vrais besoins pour bien saisir le pourquoi, avant de mobiliser mes compétences techniques sur le comment. Pour moi, la technologie doit être au service du produit, l’expérience utilisateur prime sur la liste de fonctionnalités, et la qualité n’est pas négociable.',
    servicesTitle: 'Catalogue de services',
    servicesSubtitle: 'Des logiciels qui durent, des équipes qui progressent.',
    serviceTitles: [
      'Leadership Technique',
      'Développement Full-Stack',
      'Bootstrap de Projets',
      'Reprise de Projets Legacy',
      'Audit & Revue de Code',
      'DevOps & Cloud',
      'Architecture',
    ],
    pricingTitle: 'Tarifs',
    pricingSubtitle: 'Ces tarifs sont donnés à titre indicatif et peuvent varier en fonction de la mission.',
    planTitles: ['Développeur Full Stack', 'Tech Lead', 'Consultant'],
    dailyRate: '600 €',
    quote: 'Sur devis',
    ribbon: 'Populaire',
    contactTitle: 'Contact',
    contactSubtitle:
      'Parlons de votre projet. Un premier échange rapide suffit pour cerner votre besoin et voir comment je peux vous aider.',
    contactTitles: ['Email', 'LinkedIn'],
    contactCta: 'Me contacter',
    linkedinHref: 'https://www.linkedin.com/in/atondoux/',
  },
  {
    lang: 'en',
    path: '/en/',
    tagline: 'Tech Lead · 20 years of experience',
    title: 'Aurélien TONDOUX',
    subtitle: 'Product-minded software engineering — AI-boosted',
    emphasis: ['— AI-boosted'],
    aboutTitle: 'About',
    aboutSubtitle:
      'I build quality software that solves real problems. I use AI to do it faster, and better. I always start from users and their real needs to understand the why, before applying my technical skills to the how. To me, technology must serve the product, user experience matters more than feature lists, and quality is non-negotiable.',
    servicesTitle: 'Services',
    servicesSubtitle: 'Software that lasts, teams that grow.',
    serviceTitles: [
      'Tech Leadership',
      'Full-Stack Development',
      'Project Bootstrapping',
      'Legacy Project Recovery',
      'Audit & Code Review',
      'DevOps & Cloud',
      'Architecture',
    ],
    pricingTitle: 'Pricing',
    pricingSubtitle: 'These rates are provided as a guideline and may be adjusted according to the project.',
    planTitles: ['Full-Stack Developer', 'Tech Lead', 'Consultant'],
    dailyRate: '€600',
    quote: 'On quote',
    ribbon: 'Popular',
    contactTitle: 'Contact',
    contactSubtitle:
      "Let's talk about your project. A quick first conversation is all it takes to pin down what you need and see how I can help.",
    contactTitles: ['Email', 'LinkedIn'],
    contactCta: 'Contact me',
    linkedinHref: 'https://www.linkedin.com/in/atondoux/?locale=en_US',
  },
] as const;

for (const {
  lang,
  path,
  tagline,
  title,
  subtitle,
  emphasis,
  aboutTitle,
  aboutSubtitle,
  servicesTitle,
  servicesSubtitle,
  serviceTitles,
  pricingTitle,
  pricingSubtitle,
  planTitles,
  dailyRate,
  quote,
  ribbon,
  contactTitle,
  contactSubtitle,
  contactTitles,
  contactCta,
  linkedinHref,
} of localizedHeroes) {
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

  test(`shows the ${lang} services catalog after the about section on ${path}`, async ({ page }) => {
    await page.goto(path);

    const services = page.locator('#services');

    await expect(services).toBeVisible();
    await expect(services.getByRole('heading', { level: 2, name: servicesTitle })).toBeVisible();
    await expect(services.getByText(servicesSubtitle, { exact: true })).toBeVisible();
    await expect(services.getByRole('heading', { level: 3 })).toHaveText(serviceTitles);
    const followsAbout = await page.evaluate(() => {
      const about = document.querySelector('#about');
      const services = document.querySelector('#services');
      if (!about || !services) return false;
      return (about.compareDocumentPosition(services) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(followsAbout).toBe(true);
  });

  test(`shows the ${lang} pricing section after the services catalog on ${path}`, async ({ page }) => {
    await page.goto(path);

    const pricing = page.locator('#pricing');
    const normalizeSpaces = (text: string) => text.replace(/[\u202F\u00A0]/g, ' ');

    await expect(pricing).toBeVisible();
    await expect(pricing.getByRole('heading', { level: 2, name: pricingTitle })).toBeVisible();
    await expect(pricing.getByText(pricingSubtitle, { exact: true })).toBeVisible();
    await expect(pricing.getByRole('heading', { level: 3 })).toHaveText(planTitles);
    const cards = pricing
      .getByRole('heading', { level: 3 })
      .locator('xpath=ancestor::div[contains(@class, "rounded-lg")][1]');
    await expect(cards).toHaveCount(3);
    const rateTexts = (await pricing.locator('.aw-price-monthly').allTextContents()).map(normalizeSpaces);
    expect(rateTexts[0]).toContain(dailyRate);
    expect(rateTexts[1]).toContain(dailyRate);
    expect(rateTexts[2]).toContain(quote);
    await expect(cards.nth(1).getByText(ribbon, { exact: true })).toBeVisible();
    await expect(pricing.getByRole('link')).toHaveCount(0);
    await expect(pricing.getByRole('button')).toHaveCount(0);
    const followsServices = await page.evaluate(() => {
      const services = document.querySelector('#services');
      const pricing = document.querySelector('#pricing');
      if (!services || !pricing) return false;
      return (services.compareDocumentPosition(pricing) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(followsServices).toBe(true);
  });

  test(`shows the ${lang} contact section after the pricing section on ${path}`, async ({ page }) => {
    await page.goto(path);

    const contact = page.locator('#contact');

    await expect(contact).toBeVisible();
    await expect(contact.getByRole('heading', { level: 2, name: contactTitle })).toBeVisible();
    await expect(contact.getByText(contactSubtitle, { exact: true })).toBeVisible();
    await expect(contact.getByRole('heading', { level: 3 })).toHaveText(contactTitles);
    await expect(contact.getByRole('link', { name: 'atondoux@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:atondoux@gmail.com'
    );
    const linkedin = contact.getByRole('link', { name: 'linkedin.com/in/atondoux' });
    await expect(linkedin).toHaveAttribute('href', linkedinHref);
    await expect(linkedin).toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute('rel', /noopener/);
    await expect(contact.getByRole('link', { name: contactCta })).toHaveAttribute('href', 'mailto:atondoux@gmail.com');
    const followsPricing = await page.evaluate(() => {
      const pricing = document.querySelector('#pricing');
      const contact = document.querySelector('#contact');
      if (!pricing || !contact) return false;
      return (pricing.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(followsPricing).toBe(true);
  });
}
