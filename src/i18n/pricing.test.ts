import { describe, expect, it } from 'vitest';

import { getPricingPlans } from './pricing';

const DAILY_RATE = 600;

const formatRate = (lang: 'fr' | 'en') =>
  new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(DAILY_RATE);

const normalizeSpaces = (text: string) => text.replace(/[\u202F\u00A0]/g, '\u0020');

const expectedTitles = {
  fr: ['Développeur Full Stack', 'Tech Lead', 'Consultant'],
  en: ['Full-Stack Developer', 'Tech Lead', 'Consultant'],
} as const;

const expectedFeatures = {
  fr: [
    ['Conception', 'Développement backend', 'Développement frontend', 'Déploiement'],
    ['Software Craftsmanship', 'Test-Driven Development', 'Bonnes pratiques'],
    ["Lancement d'un projet", 'Audit qualité', 'Revue de code'],
  ],
  en: [
    ['Design', 'Backend development', 'Frontend development', 'Deployment'],
    ['Software Craftsmanship', 'Test-Driven Development', 'Best practices'],
    ['Project launch', 'Quality audit', 'Code review'],
  ],
} as const;

describe('listing the pricing plans', () => {
  it.each(['fr', 'en'] as const)('lists the %s plan titles in catalog order', (lang) => {
    const plans = getPricingPlans(lang);

    expect(plans.map((plan) => plan.title)).toEqual(expectedTitles[lang]);
  });

  it('describes each french plan with a verb-first punchline', () => {
    const plans = getPricingPlans('fr');

    expect(plans.map((plan) => plan.subtitle)).toEqual([
      'Livrer plus vite, de la conception jusqu’à la production.',
      'Amener vos équipes à l’excellence technique, au quotidien.',
      'Cadrer un projet ou une mission taillés pour vos besoins.',
    ]);
  });

  it('describes each english plan with a verb-first punchline', () => {
    const plans = getPricingPlans('en');

    expect(plans.map((plan) => plan.subtitle)).toEqual([
      'Ship faster, from design all the way to production.',
      'Lead your teams to technical excellence, day after day.',
      'Scope a project or assignment shaped around your needs.',
    ]);
  });

  it('formats the french daily rate as 600 € per day', () => {
    const [fullStack, techLead] = getPricingPlans('fr');

    expect(techLead?.price).toBe(formatRate('fr'));
    expect(fullStack?.price).toBe(formatRate('fr'));
    expect(normalizeSpaces(String(techLead?.price))).toBe('600 €');
    expect(techLead?.period).toBe('par jour');
  });

  it('formats the english daily rate as €600 per day', () => {
    const [fullStack, techLead] = getPricingPlans('en');

    expect(techLead?.price).toBe(formatRate('en'));
    expect(fullStack?.price).toBe(formatRate('en'));
    expect(normalizeSpaces(String(techLead?.price))).toBe('€600');
    expect(techLead?.period).toBe('per day');
  });

  it.each([
    ['fr', 'Sur devis'],
    ['en', 'On quote'],
  ] as const)('shows the %s consulting plan as a quote without a period', (lang, quote) => {
    const consulting = getPricingPlans(lang)[2];

    expect(consulting?.price).toBe(quote);
    expect(consulting?.period).toBeUndefined();
  });

  it.each([
    ['fr', 'Populaire'],
    ['en', 'Popular'],
  ] as const)('marks only the tech lead plan with the %s ribbon and highlight', (lang, ribbon) => {
    const plans = getPricingPlans(lang);

    expect(plans.map((plan) => plan.hasRibbon === true)).toEqual([false, true, false]);
    expect(plans.map((plan) => plan.highlight === true)).toEqual([false, true, false]);
    expect(plans[1]?.ribbonTitle).toBe(ribbon);
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
