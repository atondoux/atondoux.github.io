import { describe, expect, it } from 'vitest';

import { getCaseStudies } from './case-studies';

const expectedCaseStudies = {
  fr: [
    {
      title: 'Institut du Cancer Avignon - Provence',
      description:
        'Moderniser les outils numériques des équipes soignantes pour simplifier le suivi des patients au quotidien.',
      tags: ['Santé', 'Software Craftsmanship', 'Kotlin', 'Spring Boot', 'Vue.js'],
    },
    {
      title: 'Malt',
      description:
        'Aider les freelances à recevoir leurs paiements le plus rapidement possible et avoir une meilleure expérience sur la plateforme Malt.',
      tags: ['Marketplace', 'Software Craftsmanship', 'Kotlin', 'Spring Boot', 'Vue.js'],
    },
    {
      title: 'Namirial',
      description:
        'Faciliter la vie quotidienne en rendant plus fluide les parcours de souscription gérés par une plateforme de services de confiance qualifiés.',
      tags: ['KYC', 'Software Craftsmanship', 'Kotlin', 'Java', 'Spring Boot'],
    },
    {
      title: 'Formation Spring Boot',
      description:
        'Découvrez Spring Boot, le framework open source incontournable pour créer des applications web et des microservices de niveau entreprise.',
      tags: ['Formation en ligne', 'Java', 'Spring Boot', 'API REST', 'Clean Code'],
    },
  ],
  en: [
    {
      title: 'Institut du Cancer Avignon - Provence',
      description: 'Modernizing the digital tools of care teams to make day-to-day patient follow-up simpler.',
      tags: ['Healthcare', 'Software Craftsmanship', 'Kotlin', 'Spring Boot', 'Vue.js'],
    },
    {
      title: 'Malt',
      description:
        'Help freelancers receive their payments as quickly as possible and have a better experience on the Malt platform.',
      tags: ['Marketplace', 'Software Craftsmanship', 'Kotlin', 'Spring Boot', 'Vue.js'],
    },
    {
      title: 'Namirial',
      description:
        'Making daily life easier by streamlining subscription workflows managed by a qualified trust services platform.',
      tags: ['KYC', 'Software Craftsmanship', 'Kotlin', 'Java', 'Spring Boot'],
    },
    {
      title: 'Spring Boot Online Course',
      description:
        'Unlock the power of Spring Boot to build robust, enterprise-grade web applications and microservices.',
      tags: ['E-Learning', 'Java', 'Spring Boot', 'REST API', 'Clean Code'],
    },
  ],
} as const;

describe('listing the case studies', () => {
  it.each(['fr', 'en'] as const)('lists the %s case studies from newest to oldest with their copy and tags', (lang) => {
    const caseStudies = getCaseStudies(lang);

    expect(caseStudies.map(({ title, description, tags }) => ({ title, description, tags }))).toEqual(
      expectedCaseStudies[lang]
    );
  });

  it.each(['fr', 'en'] as const)('illustrates each %s case study in its brand colours', (lang) => {
    const caseStudies = getCaseStudies(lang);

    expect(caseStudies.map(({ image }) => image.match(/data-palette="(\w+)"/)?.[1])).toEqual([
      'icap',
      'malt',
      'namirial',
      'dyma',
    ]);
  });

  it('draws the same decorative illustration for every case study, only the colours change', () => {
    const drawings = getCaseStudies('fr').map(({ image }) => image.replace(/data-palette="\w+"/, ''));

    expect(new Set(drawings).size).toBe(1);
    expect(drawings[0]).toMatch(/<svg[^>]*aria-hidden="true"/);
    expect(drawings[0]).not.toMatch(/\sid="/);
  });
});
