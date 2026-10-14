import { describe, expect, it } from 'vitest';

import { getContactCallToAction, getContactItems } from './contact';

const EMAIL = 'atondoux@gmail.com';

const expectedTitles = {
  fr: ['Email', 'LinkedIn'],
  en: ['Email', 'LinkedIn'],
} as const;

describe('listing the contact channels', () => {
  it.each(['fr', 'en'] as const)('lists the %s channel titles in catalog order', (lang) => {
    const items = getContactItems(lang);

    expect(items.map((item) => item.title)).toEqual(expectedTitles[lang]);
  });

  it.each(['fr', 'en'] as const)('shows the %s display values as plain text', (lang) => {
    const items = getContactItems(lang);

    expect(items.map((item) => item.description)).toEqual([EMAIL, 'linkedin.com/in/atondoux']);
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

  it.each(['fr', 'en'] as const)('opens only LinkedIn in a new tab in %s', (lang) => {
    const items = getContactItems(lang);

    expect(items.map((item) => item.target)).toEqual([undefined, '_blank']);
  });

  it('uses the same icons in the same order in both languages', () => {
    const iconsOf = (lang: 'fr' | 'en') => getContactItems(lang).map((item) => item.icon);

    expect(iconsOf('fr')).toEqual(['tabler:mail', 'tabler:brand-linkedin']);
    expect(iconsOf('en')).toEqual(iconsOf('fr'));
  });

  it.each([
    ['fr', 'Me contacter'],
    ['en', 'Contact me'],
  ] as const)('offers a %s mailto call to action to the email address', (lang, text) => {
    const callToAction = getContactCallToAction(lang);

    expect(callToAction).toEqual({ text, href: getContactItems(lang)[0]?.href, icon: 'tabler:mail' });
    expect(callToAction.href).toBe(`mailto:${EMAIL}`);
  });
});
