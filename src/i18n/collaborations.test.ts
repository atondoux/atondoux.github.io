import { describe, expect, it } from 'vitest';

import { getCollaborationLogos } from './collaborations';

const companies = [
  'Veolia Eau',
  'ONIAM',
  'SNCF Connect & Tech',
  'Natixis',
  'Société Générale',
  'Softway Medical',
  'Orange Business',
  'Dyma',
  'Namirial',
  'Malt',
  'Institut Sainte-Catherine',
];

const expectedAlts = {
  fr: companies.map((company) => `Logo de ${company}`),
  en: companies.map((company) => `${company} logo`),
} as const;

describe('listing the collaboration logos', () => {
  it.each(['fr', 'en'] as const)('describes each %s logo with a localized alt in catalog order', (lang) => {
    const logos = getCollaborationLogos(lang);

    expect(logos.map((logo) => logo.alt)).toEqual(expectedAlts[lang]);
  });

  it.each(['fr', 'en'] as const)('points every %s logo to an svg in the collaborations assets', (lang) => {
    const logos = getCollaborationLogos(lang);

    expect(logos).toHaveLength(companies.length);
    for (const logo of logos) {
      expect(logo.src).toMatch(/^~\/assets\/images\/collaborations\/[a-z-]+\.svg$/);
    }
  });

  it('uses the same logo files in both languages', () => {
    const frenchSources = getCollaborationLogos('fr').map((logo) => logo.src);
    const englishSources = getCollaborationLogos('en').map((logo) => logo.src);

    expect(englishSources).toEqual(frenchSources);
  });
});
