import { describe, expect, it } from 'vitest';

import { getSectionLinks } from './sections';

describe('listing the home section links', () => {
  it('lists the french labels in page order', () => {
    const links = getSectionLinks('fr', '/fr/');

    expect(links.map((link) => link.text)).toEqual(['Accueil', 'À propos', 'Services', 'Tarifs', 'Contact']);
  });

  it('lists the english labels in page order', () => {
    const links = getSectionLinks('en', '/en/');

    expect(links.map((link) => link.text)).toEqual(['Home', 'About', 'Services', 'Pricing', 'Contact']);
  });

  it('builds every href from the injected home url', () => {
    const links = getSectionLinks('fr', '/x/');

    expect(links.map((link) => link.href)).toEqual(['/x/', '/x/#about', '/x/#services', '/x/#pricing', '/x/#contact']);
  });
});
