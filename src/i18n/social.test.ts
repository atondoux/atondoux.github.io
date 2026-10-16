import { describe, expect, it } from 'vitest';

import { getSocialLinks } from './social';

describe('listing the social profiles', () => {
  it.each(['fr', 'en'] as const)('lists LinkedIn, Malt and GitHub in order in %s', (lang) => {
    const links = getSocialLinks(lang);

    expect(links.map(({ ariaLabel, icon }) => [ariaLabel, icon])).toEqual([
      ['LinkedIn', 'tabler:brand-linkedin'],
      ['Malt', 'tabler:topology-star-ring-3'],
      ['GitHub', 'tabler:brand-github'],
    ]);
  });

  it.each(['fr', 'en'] as const)('names the platform in the tooltip of every profile in %s', (lang) => {
    const tooltips = getSocialLinks(lang).map((link) => link.tooltip);

    expect(tooltips).toEqual(['LinkedIn', 'Malt', 'GitHub']);
  });

  it('links the french profiles', () => {
    const hrefs = getSocialLinks('fr').map((link) => link.href);

    expect(hrefs).toEqual([
      'https://www.linkedin.com/in/atondoux/',
      'https://www.malt.fr/profile/aurelientondoux',
      'https://github.com/atondoux/',
    ]);
  });

  it('links the english profiles with the en_US LinkedIn locale and the malt.com domain', () => {
    const hrefs = getSocialLinks('en').map((link) => link.href);

    expect(hrefs).toEqual([
      'https://www.linkedin.com/in/atondoux/?locale=en_US',
      'https://www.malt.com/profile/aurelientondoux',
      'https://github.com/atondoux/',
    ]);
  });

  it.each(['fr', 'en'] as const)('opens every profile in a new tab in %s', (lang) => {
    const targets = getSocialLinks(lang).map((link) => link.target);

    expect(targets).toEqual(['_blank', '_blank', '_blank']);
  });
});
