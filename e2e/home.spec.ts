import { expect, test, type Locator } from '@playwright/test';

const CASE_STUDY_COUNT = 6;
const WCAG_AA_TEXT_CONTRAST = 4.5;
const CARD_FOOTER = 'h3 ~ div';
const ACHIEVEMENT_IN_CARD = `${CARD_FOOTER} li`;
const CASE_STUDY_ACHIEVEMENTS = `#case-studies ${ACHIEVEMENT_IN_CARD}`;
const SLIDER_STEP_TIMEOUT_MS = 500;
const SLIDER_END_TIMEOUT_MS = 5000;

const advanceSliderToEnd = (next: Locator, step: () => Promise<void>) =>
  expect(async () => {
    const isAtEnd = (await next.getAttribute('aria-disabled')) === 'true';
    if (!isAtEnd) {
      await step();
    }
    await expect(next).toHaveAttribute('aria-disabled', 'true', { timeout: SLIDER_STEP_TIMEOUT_MS });
  }).toPass({ timeout: SLIDER_END_TIMEOUT_MS });

const isInsideScroller = (art: Locator) =>
  art.evaluate((element) => {
    const scroller = element.closest('[data-aw-slider-list]');
    const cardBox = element.closest('li')?.getBoundingClientRect();
    if (!scroller || !cardBox) return false;
    const scrollerBox = scroller.getBoundingClientRect();
    return cardBox.left >= scrollerBox.left - 1 && cardBox.right <= scrollerBox.right + 1;
  });

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
    subtitle: 'Ingénierie logicielle orientée produit — augmentée par l’IA',
    emphasis: ['— augmentée par l’IA'],
    aboutTitle: 'À propos',
    aboutSubtitle:
      'Je construis des logiciels qui répondent à des besoins concrets. J’utilise l’IA pour le faire plus vite, et mieux. Je privilégie une démarche centrée sur les utilisateurs pour comprendre leurs besoins, leurs usages et ce qui les freine au quotidien. Un logiciel n’a de valeur que s’il est réellement utilisé, alors je soigne l’expérience utilisateur autant que le code. La technologie doit être au service du produit, et la qualité reste pour moi une exigence constante.',
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
      'Lancement de Projets',
      'Reprise de Projets Legacy',
      'Audit & Revue de Code',
      'DevOps & Cloud',
      'Architecture',
    ],
    pricingTitle: 'Tarifs',
    pricingSubtitle: 'Chaque projet est unique : choisissez la formule qui vous correspond.',
    planTitles: ['Création d’applications', 'Tech Lead Full Stack', 'Consulting'],
    dailyRate: '600 €',
    quote: 'Sur devis',
    ribbon: 'Populaire',
    caseStudiesTitle: 'Cas clients',
    caseStudiesSubtitle: 'Quelques missions et réalisations récentes.',
    caseStudyLinkText: 'Voir la formation',
    caseStudyDemoLinkText: 'Voir la démo',
    caseStudyPreviousLabel: 'Cas client précédent',
    caseStudyNextLabel: 'Cas client suivant',
    caseStudyAchievements: [
      'Mise en place d’une démarche qualité',
      'Livraisons fiabilisées avec des pipelines CI/CD',
      '90% des freelances payés en 10 jours',
      'Processus de financement automatisé à 95%',
      'Contrats signés en ligne avec Yousign',
      'Fraude détectée dès la souscription',
      '19 chapitres, 85 leçons, 170 quiz',
      '6500+ heures passées par les apprenants',
      'Suivi précis du taux d’utilisation des véhicules',
      'Amélioration de la planification des entretiens',
      'Conception de nouveaux modules spécialisés dans le suivi des patients',
      'Livraison et déploiement continus sur une architecture micro-services',
    ],
    caseStudyTitles: [
      'Institut du Cancer Avignon - Provence',
      'Malt',
      'Namirial',
      'Dyma Spring Boot',
      'Orange Business',
      'Softway Medical',
    ],
    contactTitle: 'Contact',
    contactSubtitle:
      'Parlons de votre projet. Un premier échange gratuit et sans engagement de 30 minutes pour cerner votre besoin et vous proposer une solution adaptée.',
    contactTitles: ['Email', 'LinkedIn', 'Malt'],
    contactCta: 'Me contacter',
    linkedinHref: 'https://www.linkedin.com/in/atondoux/',
    maltHref: 'https://www.malt.fr/profile/aurelientondoux',
    maltDisplay: 'malt.fr/profile/aurelientondoux',
  },
  {
    lang: 'en',
    path: '/en/',
    tagline: 'Tech Lead · 20 years of experience',
    title: 'Aurélien TONDOUX',
    subtitle: 'Product-minded software engineering — AI-augmented',
    emphasis: ['— AI-augmented'],
    aboutTitle: 'About',
    aboutSubtitle:
      'I build software that solves real problems. I use AI to do it faster, and better. I take a user-first approach to understand their needs, how they work and what slows them down every day. Software only has value if people actually use it, so I pay attention to the user experience as much as to the code. Technology must serve the product, and quality remains a constant requirement for me.',
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
    pricingSubtitle: 'Every project is unique: pick the offer suited to your needs.',
    planTitles: ['Application Development', 'Full-Stack Tech Lead', 'Consulting'],
    dailyRate: '€600',
    quote: 'On quote',
    ribbon: 'Popular',
    caseStudiesTitle: 'Case studies',
    caseStudiesSubtitle: 'Some recent work.',
    caseStudyLinkText: 'See the course',
    caseStudyDemoLinkText: 'Watch a demo',
    caseStudyPreviousLabel: 'Previous case study',
    caseStudyNextLabel: 'Next case study',
    caseStudyAchievements: [
      'Quality process established',
      'Reliable releases through CI/CD pipelines',
      '90% of freelancers paid within 10 days',
      '95% automated financing process',
      'Contracts signed online with Yousign',
      'Fraud caught at sign-up',
      '19 chapters, 85 lessons, 170 quizzes',
      '6,500+ hours spent by students',
      'Accurate tracking of vehicle usage rates',
      'Improved maintenance planning',
      'New modules designed for patient follow-up',
      'Continuous delivery and deployment on a microservices architecture',
    ],
    caseStudyTitles: [
      'Institut du Cancer Avignon - Provence',
      'Malt',
      'Namirial',
      'Dyma Spring Boot',
      'Orange Business',
      'Softway Medical',
    ],
    contactTitle: 'Contact',
    contactSubtitle:
      "Let's talk about your project. A free, no-commitment 30-minute call to understand your needs and recommend the right solution.",
    contactTitles: ['Email', 'LinkedIn', 'Malt'],
    contactCta: 'Contact me',
    linkedinHref: 'https://www.linkedin.com/in/atondoux/?locale=en_US',
    maltHref: 'https://www.malt.com/profile/aurelientondoux',
    maltDisplay: 'malt.com/profile/aurelientondoux',
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
  caseStudyLinkText,
  caseStudyDemoLinkText,
  caseStudyPreviousLabel,
  caseStudyNextLabel,
  caseStudyAchievements,
  caseStudyTitles,
  contactTitle,
  contactSubtitle,
  contactTitles,
  contactCta,
  linkedinHref,
  maltHref,
  maltDisplay,
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
    expect(rateTexts[0]).toContain(quote);
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
    await expect(caseStudies.locator(ACHIEVEMENT_IN_CARD)).toHaveText(caseStudyAchievements);
    await expect(caseStudies.locator(`${ACHIEVEMENT_IN_CARD} svg[data-icon="tabler:circle-check-filled"]`)).toHaveCount(
      caseStudyAchievements.length
    );
    await expect(caseStudies.getByRole('img')).toHaveCount(0);
    expect(await caseStudies.locator('.case-study-art').evaluateAll(readIllustrationPalettes)).toEqual([
      'icap',
      'malt',
      'namirial',
      'dyma',
      'orange',
      'softway',
    ]);
    await expect(caseStudies.getByRole('link')).toHaveCount(2);
    const courseLink = caseStudies.getByRole('link', { name: caseStudyLinkText });
    await expect(courseLink).toHaveAttribute('href', 'https://dyma.fr/formations/spring-boot');
    await expect(courseLink).toHaveAttribute('target', '_blank');
    await expect(courseLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(courseLink.locator('svg[data-icon="tabler:external-link"][aria-hidden="true"]')).toHaveCount(1);
    const demoLink = caseStudies.getByRole('link', { name: caseStudyDemoLinkText });
    await expect(demoLink).toHaveAttribute('href', 'https://youtu.be/NwEPv_cVKC0');
    await expect(demoLink).toHaveAttribute('target', '_blank');
    await expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
    const followsPricing = await page.evaluate(() => {
      const pricing = document.querySelector('#pricing');
      const caseStudies = document.querySelector('#case-studies');
      if (!pricing || !caseStudies) return false;
      return (pricing.compareDocumentPosition(caseStudies) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(followsPricing).toBe(true);
  });

  test(`labels the ${lang} case study slider buttons on ${path}`, async ({ page }) => {
    await page.goto(path);

    const caseStudies = page.locator('#case-studies');

    await expect(caseStudies.getByRole('button', { name: caseStudyPreviousLabel, exact: true })).toHaveCount(1);
    await expect(caseStudies.getByRole('button', { name: caseStudyNextLabel, exact: true })).toHaveCount(1);
  });

  test(`scrolls the ${lang} case studies one end to the other with the slider buttons on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path);

    const caseStudies = page.locator('#case-studies');
    const previous = caseStudies.getByRole('button', { name: caseStudyPreviousLabel, exact: true });
    const next = caseStudies.getByRole('button', { name: caseStudyNextLabel, exact: true });
    const lastCard = caseStudies.locator('.case-study-art').last();

    await expect(previous).toHaveAttribute('aria-disabled', 'true');
    await expect(previous).toHaveCSS('opacity', '0');
    await expect(next).not.toHaveAttribute('aria-disabled', 'true');
    await expect.poll(() => isInsideScroller(lastCard)).toBe(false);

    await advanceSliderToEnd(next, () => next.click());

    await expect.poll(() => isInsideScroller(lastCard)).toBe(true);
    await expect(next).toHaveAttribute('aria-disabled', 'true');
    await expect(next).toHaveCSS('opacity', '0');
    await expect(previous).not.toHaveAttribute('aria-disabled', 'true');
  });

  test(`dims instead of hides the disabled ${lang} case study arrows on a phone on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(path);

    const caseStudies = page.locator('#case-studies');
    const previous = caseStudies.getByRole('button', { name: caseStudyPreviousLabel, exact: true });
    const next = caseStudies.getByRole('button', { name: caseStudyNextLabel, exact: true });

    await expect(previous).toHaveAttribute('aria-disabled', 'true');
    await expect(previous).toBeVisible();
    await expect(previous).toHaveCSS('opacity', '0.4');
    await expect(previous).toHaveCSS('cursor', 'not-allowed');
    await expect(next).toHaveCSS('opacity', '1');

    await advanceSliderToEnd(next, () => next.click());

    await expect(next).toHaveCSS('opacity', '0.4');
    await expect(previous).toHaveCSS('opacity', '1');
  });

  test(`keeps keyboard focus on the ${lang} next button at the end of the slider on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path);

    const caseStudies = page.locator('#case-studies');
    const next = caseStudies.getByRole('button', { name: caseStudyNextLabel, exact: true });
    const lastCard = caseStudies.locator('.case-study-art').last();

    await next.focus();
    await advanceSliderToEnd(next, () => page.keyboard.press('Enter'));
    await expect.poll(() => isInsideScroller(lastCard)).toBe(true);
    await page.keyboard.press('Enter');

    await expect(next).toHaveAttribute('aria-disabled', 'true');
    await expect(next).toBeFocused();
    expect(await isInsideScroller(lastCard)).toBe(true);
  });

  test(`exposes the ${lang} case studies as a named region holding a list of ${CASE_STUDY_COUNT} cards on ${path}`, async ({
    page,
  }) => {
    await page.goto(path);

    const region = page.locator('#case-studies').getByRole('region', { name: caseStudiesTitle, exact: true });
    const cards = region.getByRole('list').first().locator('> li');

    await expect(region).toHaveCount(1);
    await expect(cards).toHaveCount(CASE_STUDY_COUNT);
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
    const malt = contact.getByRole('link', { name: maltDisplay });
    await expect(malt).toHaveAttribute('href', maltHref);
    await expect(malt).toHaveAttribute('target', '_blank');
    await expect(malt).toHaveAttribute('rel', /noopener/);
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

    expect(colors).toHaveLength(CASE_STUDY_COUNT);
    expect(new Set(colors.map(({ illustration }) => illustration)).size).toBe(CASE_STUDY_COUNT);
    for (const { illustration, card } of colors) {
      expect(illustration).not.toMatch(/^(|none|rgba\(0, 0, 0, 0\))$/);
      expect(illustration).not.toBe(card);
    }
  });
}

for (const { viewport, visibleCards } of [
  { viewport: { width: 1280, height: 800 }, visibleCards: 4 },
  { viewport: { width: 900, height: 1100 }, visibleCards: 2 },
  { viewport: { width: 375, height: 800 }, visibleCards: 1 },
]) {
  test(`shows ${visibleCards} case studies at once with aligned achievements at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('/fr/');

    const cards = page.locator('#case-studies .case-study-art');
    const tops = await cards.evaluateAll((arts) => arts.map((art) => Math.round(art.getBoundingClientRect().top)));
    const footerBottoms = await page
      .locator(`#case-studies ${CARD_FOOTER}`)
      .evaluateAll((footers) => footers.map((footer) => Math.round(footer.getBoundingClientRect().bottom)));
    const fullyVisible = await Promise.all(
      Array.from({ length: CASE_STUDY_COUNT }, (_, index) => isInsideScroller(cards.nth(index)))
    );

    expect(fullyVisible.filter(Boolean)).toHaveLength(visibleCards);
    expect(new Set(tops).size).toBe(1);
    expect(new Set(footerBottoms).size).toBe(1);
  });
}

for (const theme of ['light', 'dark'] as const) {
  test(`keeps the case study achievements readable in ${theme} mode`, async ({ page }) => {
    await page.addInitScript((chosenTheme) => localStorage.setItem('theme', chosenTheme), theme);
    await page.goto('/fr/');

    const ratios = await page.locator(CASE_STUDY_ACHIEVEMENTS).evaluateAll((achievements) => {
      const context = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
      if (!context) throw new Error('No 2D canvas context to resolve colours');
      const toRgba = (color: string) => {
        context.clearRect(0, 0, 1, 1);
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        return [...context.getImageData(0, 0, 1, 1).data];
      };
      const opaqueBackground = (element: Element) => {
        for (let node: Element | null = element; node; node = node.parentElement) {
          const rgba = toRgba(getComputedStyle(node).backgroundColor);
          if (rgba[3] === 255) return rgba;
        }
        throw new Error('No opaque background behind the achievement');
      };
      const luminance = (rgba: number[]) => {
        const [r, g, b] = rgba.slice(0, 3).map((value) => {
          const channel = value / 255;
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      return achievements.map((achievement) => {
        const text = luminance(toRgba(getComputedStyle(achievement).color));
        const background = luminance(opaqueBackground(achievement));
        return (Math.max(text, background) + 0.05) / (Math.min(text, background) + 0.05);
      });
    });

    expect(ratios).toHaveLength(localizedHeroes[0].caseStudyAchievements.length);
    for (const ratio of ratios) {
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_TEXT_CONTRAST);
    }
  });
}

const SERVICE_COUNT = 7;
const CENTER_TOLERANCE_PX = 1;
const SERVICE_CARD = '#services h3 >> xpath=..';

for (const path of ['/fr/', '/en/']) {
  test(`shows a multicolor flat icon on each service card on ${path}`, async ({ page }) => {
    await page.goto(path);

    const cards = page.locator(SERVICE_CARD);

    await expect(cards).toHaveCount(SERVICE_COUNT);
    for (const card of await cards.all()) {
      await expect(card.locator('svg[data-icon^="flat-color-icons:"]')).toHaveCount(1);
    }
  });

  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 900, height: 1100 },
  ]) {
    test(`centers the last service card on a full-size row on ${path} at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(path);

      const cards = page.locator(SERVICE_CARD);
      const first = await cards.first().boundingBox();
      const last = await cards.last().boundingBox();
      const container = await cards.first().locator('xpath=..').boundingBox();

      expect(first && last && container).toBeTruthy();
      if (!first || !last || !container) return;
      expect(Math.abs(last.x + last.width / 2 - (container.x + container.width / 2))).toBeLessThanOrEqual(
        CENTER_TOLERANCE_PX
      );
      expect(Math.abs(last.width - first.width)).toBeLessThanOrEqual(CENTER_TOLERANCE_PX);
    });
  }
}
