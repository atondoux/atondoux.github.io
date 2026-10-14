import { describe, expect, it } from 'vitest';

import { getPricingPlans } from './pricing';

const DAILY_RATE = 600;

const formatRate = (lang: 'fr' | 'en') =>
  new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(DAILY_RATE);

const normalizeSpaces = (text: string) => text.replace(/[\u202F\u00A0]/g, '\u0020');

const expectedTitles = {
  fr: ['Tech Lead', 'Développeur Full Stack', 'Applications & Conseils'],
  en: ['Tech Lead', 'Full-Stack Developer', 'Applications & Consulting'],
} as const;

const expectedFeatures = {
  fr: [
    ['Software Craftsmanship', 'Test-Driven Development', 'Bonnes pratiques'],
    ['Conception', 'Développement backend', 'Développement frontend', 'Déploiement'],
    ["Lancement d'un projet", 'Audit qualité', 'Revue de code'],
  ],
  en: [
    ['Software Craftsmanship', 'Test-Driven Development', 'Best practices'],
    ['Design', 'Backend development', 'Frontend development', 'Deployment'],
    ['Project launch', 'Quality audit', 'Code review'],
  ],
} as const;

describe('listing the pricing plans', () => {
  it.each(['fr', 'en'] as const)('lists the %s plan titles in catalog order', (lang) => {
    const plans = getPricingPlans(lang);

    expect(plans.map((plan) => plan.title)).toEqual(expectedTitles[lang]);
  });

  it('describes each french plan with its legacy description', () => {
    const plans = getPricingPlans('fr');

    expect(plans.map((plan) => plan.subtitle)).toEqual([
      'Amener vos équipes de développement à l’excellence technique.',
      'Augmenter vos équipes techniques avec un développeur senior.',
      'Un projet ou une mission spécifique adaptés à vos besoins.',
    ]);
  });

  it('describes each english plan with its legacy description', () => {
    const plans = getPricingPlans('en');

    expect(plans.map((plan) => plan.subtitle)).toEqual([
      'Bring your development teams to technical excellence.',
      'Augment your technical teams with a senior developer.',
      'A specific project or assignment tailored to your needs.',
    ]);
  });

  it('formats the french daily rate as 600 € per day', () => {
    const [techLead, fullStack] = getPricingPlans('fr');

    expect(techLead?.price).toBe(formatRate('fr'));
    expect(fullStack?.price).toBe(formatRate('fr'));
    expect(normalizeSpaces(String(techLead?.price))).toBe('600 €');
    expect(techLead?.period).toBe('/ jour');
  });

  it('formats the english daily rate as €600 per day', () => {
    const [techLead, fullStack] = getPricingPlans('en');

    expect(techLead?.price).toBe(formatRate('en'));
    expect(fullStack?.price).toBe(formatRate('en'));
    expect(normalizeSpaces(String(techLead?.price))).toBe('€600');
    expect(techLead?.period).toBe('/ day');
  });

  it.each([
    ['fr', 'Devis sur demande'],
    ['en', 'Quote on request'],
  ] as const)('shows the %s consulting plan as a quote without a period', (lang, quote) => {
    const consulting = getPricingPlans(lang)[2];

    expect(consulting?.price).toBe(quote);
    expect(consulting?.period).toBeUndefined();
  });

  it.each([
    ['fr', 'Le + populaire'],
    ['en', 'Most Popular'],
  ] as const)('marks only the tech lead plan with the %s ribbon and highlight', (lang, ribbon) => {
    const plans = getPricingPlans(lang);

    expect(plans.map((plan) => plan.hasRibbon === true)).toEqual([true, false, false]);
    expect(plans.map((plan) => plan.highlight === true)).toEqual([true, false, false]);
    expect(plans[0]?.ribbonTitle).toBe(ribbon);
  });

  it.each(['fr', 'en'] as const)('lists the %s feature labels of each plan', (lang) => {
    const plans = getPricingPlans(lang);

    expect(plans.map((plan) => plan.items?.map((item) => item.description))).toEqual(expectedFeatures[lang]);
  });

  it('gives every feature a tabler icon', () => {
    const icons = getPricingPlans('fr').flatMap((plan) => plan.items?.map((item) => item.icon) ?? []);

    expect(icons).toHaveLength(10);
    for (const icon of icons) {
      expect(icon).toMatch(/^tabler:[a-z0-9-]+$/);
    }
  });

  it('uses the same icons in the same order in both languages', () => {
    const iconsOf = (lang: 'fr' | 'en') => getPricingPlans(lang).map((plan) => plan.items?.map((item) => item.icon));

    expect(iconsOf('en')).toEqual(iconsOf('fr'));
  });
});
