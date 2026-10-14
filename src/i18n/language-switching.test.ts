import { describe, expect, it } from 'vitest';

import type { LocaleUrlBuilder } from './alternates';
import { buildSwitcherHref, getLocaleCode, getOtherLocale } from './switcher';

const fakeLocaleUrl: LocaleUrlBuilder = (locale, path) => `/${locale}/${path}`;

describe('switching the language of a page', () => {
  it('targets english from french', () => {
    expect(getOtherLocale('fr')).toBe('en');
  });

  it('targets french from english', () => {
    expect(getOtherLocale('en')).toBe('fr');
  });
});

describe('building the language switcher link', () => {
  it('links the french home to the english home', () => {
    const href = buildSwitcherHref('/fr/', 'en', fakeLocaleUrl);

    expect(href).toBe('/en/');
  });

  it('keeps the page path on a localized page', () => {
    const href = buildSwitcherHref('/en/portfolio/malt/', 'fr', fakeLocaleUrl);

    expect(href).toBe('/fr/portfolio/malt/');
  });

  it('links a page without locale prefix to the home of the target locale', () => {
    const href = buildSwitcherHref('/404', 'en', fakeLocaleUrl);

    expect(href).toBe('/en/');
  });
});

describe('language switcher label', () => {
  it('shows EN for the english locale', () => {
    expect(getLocaleCode('en')).toBe('EN');
  });

  it('shows FR for the french locale', () => {
    expect(getLocaleCode('fr')).toBe('FR');
  });
});
