import { expect, test } from '@playwright/test';

const readIllustrationPalettes = (arts: Element[]) => arts.map((art) => art.getAttribute('data-palette'));

const readIllustrationColors = (arts: Element[]) =>
  arts.map((art) => {
    const card = art.closest('.rounded-2xl');
    const background = art.querySelector('svg > rect');
    return {
      illustration: background ? getComputedStyle(background).fill : '',
      card: card ? getComputedStyle(card).backgroundColor : '',
    };
  });

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
      'Je développe des logiciels de qualité qui résolvent des problèmes concrets. J’utilise l’IA pour le faire plus vite, et mieux. Je pars toujours des utilisateurs pour comprendre leurs besoins, leurs usages, ce qui les freine au quotidien. Un logiciel n’a de valeur que s’il est utilisé, alors je soigne l’expérience utilisateur autant que le code. Pour moi, la technologie doit être au service du produit, et la qualité n’est pas négociable.',
    collaborationsTitle: 'Ils me font confiance',
    collaborationsSubtitle: 'Startups, PME et grands comptes avec qui j’ai collaboré.',
    logoAlts: [
      'Logo de Veolia Eau',
      'Logo de ONIAM',
      'Logo de SNCF Connect & Tech',
      'Logo de Natixis',
      'Logo de Société Générale',
      'Logo de Softway Medical',
      'Logo de Orange Business',
      'Logo de Dyma',
      'Logo de Namirial',
      'Logo de Malt',
      'Logo de Institut Sainte-Catherine',
    ],
    servicesTitle: 'Services',
    servicesSubtitle: 'Des logiciels qui durent, des équipes qui progressent, des résultats mesurables.',
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
    caseStudiesTitle: 'Cas clients',
    caseStudiesSubtitle: 'Quelques missions récentes : des produits fondés sur du code de qualité.',
    caseStudyTitles: ['Institut du Cancer Avignon - Provence', 'Malt', 'Namirial', 'Formation Spring Boot'],
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
      'I build quality software that solves real problems. I use AI to do it faster, and better. I always start from users to understand their needs, how they work, what slows them down every day. Software only has value if people use it, so I care about the user experience as much as the code. To me, technology must serve the product, and quality is non-negotiable.',
    collaborationsTitle: 'They trust me',
    collaborationsSubtitle: 'Startups, SMEs and large companies I’ve worked with.',
    logoAlts: [
      'Veolia Eau logo',
      'ONIAM logo',
      'SNCF Connect & Tech logo',
      'Natixis logo',
      'Société Générale logo',
      'Softway Medical logo',
      'Orange Business logo',
      'Dyma logo',
      'Namirial logo',
      'Malt logo',
      'Institut Sainte-Catherine logo',
    ],
    servicesTitle: 'Services',
    servicesSubtitle: 'Software that lasts, teams that grow, measurable results.',
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
    caseStudiesTitle: 'Case studies',
    caseStudiesSubtitle: 'Recent work: products built on quality code.',
    caseStudyTitles: ['Institut du Cancer Avignon - Provence', 'Malt', 'Namirial', 'Spring Boot Online Course'],
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
  collaborationsTitle,
  collaborationsSubtitle,
  logoAlts,
  servicesTitle,
  servicesSubtitle,
  serviceTitles,
  pricingTitle,
  pricingSubtitle,
  planTitles,
  dailyRate,
  quote,
  ribbon,
  caseStudiesTitle,
  caseStudiesSubtitle,
  caseStudyTitles,
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

  test(`shows the ${lang} collaborations section after the about section on ${path}`, async ({ page }) => {
    await page.goto(path);

    const collaborations = page.locator('#collaborations');

    await expect(collaborations).toBeVisible();
    await expect(collaborations.getByRole('heading', { level: 2, name: collaborationsTitle })).toBeVisible();
    await expect(collaborations.getByText(collaborationsSubtitle, { exact: true })).toBeVisible();
    await collaborations.scrollIntoViewIfNeeded();
    for (const alt of logoAlts) {
      const logo = collaborations.getByRole('img', { name: alt });
      await expect(logo).toBeVisible();
      await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    }
    const followsAbout = await page.evaluate(() => {
      const about = document.querySelector('#about');
      const collaborations = document.querySelector('#collaborations');
      if (!about || !collaborations) return false;
      return (about.compareDocumentPosition(collaborations) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(followsAbout).toBe(true);
  });

  test(`shows the ${lang} services catalog after the collaborations section on ${path}`, async ({ page }) => {
    await page.goto(path);

    const services = page.locator('#services');

    await expect(services).toBeVisible();
    await expect(services.getByRole('heading', { level: 2, name: servicesTitle })).toBeVisible();
    await expect(services.getByText(servicesSubtitle, { exact: true })).toBeVisible();
    await expect(services.getByRole('heading', { level: 3 })).toHaveText(serviceTitles);
    const followsCollaborations = await page.evaluate(() => {
      const collaborations = document.querySelector('#collaborations');
      const services = document.querySelector('#services');
      if (!collaborations || !services) return false;
      return (collaborations.compareDocumentPosition(services) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(followsCollaborations).toBe(true);
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

  test(`shows the ${lang} case studies after the pricing section on ${path}`, async ({ page }) => {
    await page.goto(path);

    const caseStudies = page.locator('#case-studies');

    await expect(caseStudies).toBeVisible();
    await expect(caseStudies.getByRole('heading', { level: 2, name: caseStudiesTitle })).toBeVisible();
    await expect(caseStudies.getByText(caseStudiesSubtitle, { exact: true })).toBeVisible();
    await expect(caseStudies.getByRole('heading', { level: 3 })).toHaveText(caseStudyTitles);
    await expect(caseStudies.getByRole('img')).toHaveCount(0);
    expect(await caseStudies.locator('.case-study-art').evaluateAll(readIllustrationPalettes)).toEqual([
      'icap',
      'malt',
      'namirial',
      'dyma',
    ]);
    await expect(caseStudies.getByRole('link')).toHaveCount(0);
    const followsPricing = await page.evaluate(() => {
      const pricing = document.querySelector('#pricing');
      const caseStudies = document.querySelector('#case-studies');
      if (!pricing || !caseStudies) return false;
      return (pricing.compareDocumentPosition(caseStudies) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(followsPricing).toBe(true);
  });

  test(`shows the ${lang} contact section after the case studies on ${path}`, async ({ page }) => {
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
    const followsCaseStudies = await page.evaluate(() => {
      const caseStudies = document.querySelector('#case-studies');
      const contact = document.querySelector('#contact');
      if (!caseStudies || !contact) return false;
      return (caseStudies.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(followsCaseStudies).toBe(true);
  });
}

for (const theme of ['light', 'dark'] as const) {
  test(`paints each case study illustration apart from its card in ${theme} mode`, async ({ page }) => {
    await page.addInitScript((chosenTheme) => localStorage.setItem('theme', chosenTheme), theme);
    await page.goto('/fr/');

    const colors = await page.locator('#case-studies .case-study-art').evaluateAll(readIllustrationColors);

    expect(colors).toHaveLength(4);
    expect(new Set(colors.map(({ illustration }) => illustration)).size).toBe(4);
    for (const { illustration, card } of colors) {
      expect(illustration).not.toMatch(/^(|none|rgba\(0, 0, 0, 0\))$/);
      expect(illustration).not.toBe(card);
    }
  });
}

for (const { viewport, cardsPerRow } of [
  { viewport: { width: 1280, height: 800 }, cardsPerRow: 4 },
  { viewport: { width: 900, height: 1100 }, cardsPerRow: 2 },
]) {
  test(`lays out ${cardsPerRow} case studies per row at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/fr/');

    const rowTops = await page
      .locator('#case-studies .case-study-art')
      .evaluateAll((arts) => arts.map((art) => Math.round(art.getBoundingClientRect().top)));

    const cardsInEachRow = [...new Set(rowTops)].map((top) => rowTops.filter((rowTop) => rowTop === top).length);

    expect(rowTops).toHaveLength(4);
    expect(cardsInEachRow).toEqual(Array(4 / cardsPerRow).fill(cardsPerRow));
  });
}
