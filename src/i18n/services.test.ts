import { describe, expect, it } from 'vitest';

import { getServiceItems } from './services';

const expectedTitles = {
  fr: [
    'Leadership Technique',
    'Développement Full-Stack',
    'Bootstrap de Projets',
    'Reprise de Projets Legacy',
    'Audit & Revue de Code',
    'DevOps & Cloud',
    'Architecture',
  ],
  en: [
    'Tech Leadership',
    'Full-Stack Development',
    'Project Bootstrapping',
    'Legacy Project Recovery',
    'Audit & Code Review',
    'DevOps & Cloud',
    'Architecture',
  ],
} as const;

describe('listing the services catalog', () => {
  it('lists the seven french services in catalog order', () => {
    const items = getServiceItems('fr');

    expect(items.map((item) => item.title)).toEqual(expectedTitles.fr);
  });

  it('lists the seven english services in catalog order', () => {
    const items = getServiceItems('en');

    expect(items.map((item) => item.title)).toEqual(expectedTitles.en);
  });

  it.each(['fr', 'en'] as const)('gives every %s service a description and a tabler icon', (lang) => {
    const items = getServiceItems(lang);

    for (const item of items) {
      expect(item.description.trim()).toBeTruthy();
      expect(item.icon).toMatch(/^tabler:[a-z0-9-]+$/);
    }
  });

  it('uses the same icons in the same order in both languages', () => {
    const frenchIcons = getServiceItems('fr').map((item) => item.icon);
    const englishIcons = getServiceItems('en').map((item) => item.icon);

    expect(englishIcons).toEqual(frenchIcons);
  });
});
