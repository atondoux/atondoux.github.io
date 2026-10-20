import { describe, expect, it } from 'vitest';

import { getContactCallToAction, getContactItems } from './contact';

const EMAIL = 'atondoux@gmail.com';

const expectedTitles = {
  fr: ['Email', 'LinkedIn', 'Malt'],
  en: ['Email', 'LinkedIn', 'Malt'],
} as const;

const expectedDisplays = {
  fr: [EMAIL, 'linkedin.com/in/atondoux', 'malt.fr/profile/aurelientondoux'],
  en: [EMAIL, 'linkedin.com/in/atondoux', 'malt.com/profile/aurelientondoux'],
} as const;

describe('listing the contact channels', () => {
  it.each(['fr', 'en'] as const)('lists the %s channel titles in catalog order', (lang) => {
    const items = getContactItems(lang);

    expect(items.map((item) => item.title)).toEqual(expectedTitles[lang]);
  });

  it.each(['fr', 'en'] as const)('shows the %s display values as plain text', (lang) => {
    const items = getContactItems(lang);

    expect(items.map((item) => item.description)).toEqual(expectedDisplays[lang]);
  });

  it('links the email to a mailto address', () => {
    const [email] = getContactItems('fr');

    expect(email?.href).toBe(`mailto:${EMAIL}`);
  });

  it('links the french LinkedIn profile without a locale', () => {
    const linkedin = getContactItems('fr')[1];

    expect(linkedin?.href).toBe('https://www.linkedin.com/in/atondoux/');
  });

  it('links the english LinkedIn profile with the en_US locale', () => {
    const linkedin = getContactItems('en')[1];

    expect(linkedin?.href).toBe('https://www.linkedin.com/in/atondoux/?locale=en_US');
  });

  it('links the french Malt profile to malt.fr', () => {
    const malt = getContactItems('fr')[2];

    expect(malt?.href).toBe('https://www.malt.fr/profile/aurelientondoux');
  });

  it('links the english Malt profile to malt.com', () => {
    const malt = getContactItems('en')[2];

    expect(malt?.href).toBe('https://www.malt.com/profile/aurelientondoux');
  });

  it.each(['fr', 'en'] as const)('opens the external profiles in a new tab in %s', (lang) => {
    const items = getContactItems(lang);

    expect(items.map((item) => item.target)).toEqual([undefined, '_blank', '_blank']);
  });

  it('uses the same icons in the same order in both languages', () => {
    const iconsOf = (lang: 'fr' | 'en') => getContactItems(lang).map((item) => item.icon);

    expect(iconsOf('fr')).toEqual(['tabler:mail', 'tabler:brand-linkedin', 'tabler:topology-star-ring-3']);
    expect(iconsOf('en')).toEqual(iconsOf('fr'));
  });

  it.each([
    ['fr', 'Me contacter'],
    ['en', 'Contact me'],
  ] as const)('offers a %s mailto call to action to the email address', (lang, text) => {
    const callToAction = getContactCallToAction(lang);

    expect(callToAction).toEqual({ text, href: getContactItems(lang)[0]?.href });
    expect(callToAction.href).toBe(`mailto:${EMAIL}`);
  });
});
