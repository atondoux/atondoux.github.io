import { describe, expect, it } from 'vitest';

import { getPricingPlans } from './pricing';

const DAILY_RATE = 600;

const formatRate = (lang: 'fr' | 'en') =>
  new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(DAILY_RATE);

const normalizeSpaces = (text: string) => text.replace(/[\u202F\u00A0]/g, '\u0020');

const expectedTitles = {
  fr: ['Création d’applications', 'Tech Lead Full Stack', 'Consulting'],
  en: ['Application Development', 'Full-Stack Tech Lead', 'Consulting'],
} as const;

const expectedFeatures = {
  fr: [
    [
      'Cadrage et planning',
      'Conception et architecture',
      'Développement Full Stack',
      'Déploiement et monitoring',
      'Maintenance',
    ],
    ['Leadership technique', 'Software Craftsmanship', 'Test-Driven Development'],
    ["Lancement d'un projet", 'Audit architecture et qualité', 'Revue de code'],
  ],
  en: [
    [
      'Scoping and planning',
      'Design and architecture',
      'Full-Stack Development',
      'Deployment and monitoring',
      'Maintenance',
    ],
    ['Technical leadership', 'Software Craftsmanship', 'Test-Driven Development'],
    ['Project launch', 'Architecture and quality audit', 'Code review'],
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
      'Transformer votre idée en application ou SaaS prêt pour la production.',
      'Livrer plus vite tout en amenant vos équipes à l’excellence technique.',
      'Cadrer un projet ou une mission taillés pour vos besoins.',
    ]);
  });

  it('describes each english plan with a verb-first punchline', () => {
    const plans = getPricingPlans('en');

    expect(plans.map((plan) => plan.subtitle)).toEqual([
      'Turn your idea into a production-ready application or SaaS.',
      'Ship faster while leading your teams to technical excellence.',
      'Scope a project or assignment shaped around your needs.',
    ]);
  });

  it('formats the french daily rate as 600 € per day', () => {
    const techLead = getPricingPlans('fr')[1];

    expect(techLead?.price).toBe(formatRate('fr'));
    expect(normalizeSpaces(String(techLead?.price))).toBe('600 €');
    expect(techLead?.period).toBe('par jour');
  });

  it('formats the english daily rate as €600 per day', () => {
    const techLead = getPricingPlans('en')[1];

    expect(techLead?.price).toBe(formatRate('en'));
    expect(normalizeSpaces(String(techLead?.price))).toBe('€600');
    expect(techLead?.period).toBe('per day');
  });

  it.each([
    ['fr', 'Sur devis'],
    ['en', 'On quote'],
  ] as const)('shows the %s application and consulting plans as a quote without a period', (lang, quote) => {
    const plans = getPricingPlans(lang);
    const quotePlans = [plans[0], plans[2]];

    expect(quotePlans.map((plan) => plan?.price)).toEqual([quote, quote]);
    expect(quotePlans.map((plan) => plan?.period)).toEqual([undefined, undefined]);
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

    expect(icons).toHaveLength(11);
    for (const icon of icons) {
      expect(icon).toMatch(/^tabler:[a-z0-9-]+$/);
    }
  });

  it('uses the same icons in the same order in both languages', () => {
    const iconsOf = (lang: 'fr' | 'en') => getPricingPlans(lang).map((plan) => plan.items?.map((item) => item.icon));

    expect(iconsOf('en')).toEqual(iconsOf('fr'));
  });
});
