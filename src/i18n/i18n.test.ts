import { describe, expect, it } from 'vitest';

import { buildAlternateLinks, type LocaleUrlBuilder } from './alternates';
import { defaultLang, hreflangs, locales, openGraphLocales, ui } from './ui';
import { getLangFromUrl, getPathWithoutLocale, hasLocalePrefix, useTranslations } from './utils';

const fakeLocaleUrl: LocaleUrlBuilder = (locale, path) => `https://example.test/${locale}/${path}`;

describe('detecting the language of a page', () => {
  it('detects english from an /en/ url', () => {
    const url = new URL('https://example.test/en/about/');

    const lang = getLangFromUrl(url);

    expect(lang).toBe('en');
  });

  it('detects french from a /fr/ url', () => {
    const url = new URL('https://example.test/fr/about/');

    const lang = getLangFromUrl(url);

    expect(lang).toBe('fr');
  });

  it('falls back to french when the url has an unknown prefix', () => {
    const url = new URL('https://example.test/de/about/');

    const lang = getLangFromUrl(url);

    expect(lang).toBe('fr');
  });

  it('falls back to french on the site root', () => {
    const url = new URL('https://example.test/');

    const lang = getLangFromUrl(url);

    expect(lang).toBe(defaultLang);
  });
});

describe('removing the locale from a path', () => {
  it.each([
    ['/en/portfolio/malt/', 'portfolio/malt/'],
    ['/fr/portfolio', 'portfolio/'],
    ['/fr/portfolio/', 'portfolio/'],
    ['/en', ''],
    ['/en/', ''],
    ['/fr/', ''],
    ['/about/', 'about/'],
    ['/about', 'about/'],
    ['/english/', 'english/'],
  ])('turns %s into %j with a trailing slash', (pathname, expected) => {
    const path = getPathWithoutLocale(pathname);

    expect(path).toBe(expected);
  });
});

describe('recognising localized pages', () => {
  it('recognises a page under a locale prefix', () => {
    const pathname = '/en/portfolio/';

    const localized = hasLocalePrefix(pathname);

    expect(localized).toBe(true);
  });

  it('does not treat a page outside the locale folders as localized', () => {
    const pathname = '/404/';

    const localized = hasLocalePrefix(pathname);

    expect(localized).toBe(false);
  });
});

describe('translating interface strings', () => {
  it('returns the french string for a french page', () => {
    const t = useTranslations('fr');

    const label = t('nav.home');

    expect(label).toBe('Accueil');
  });

  it('returns the english string for an english page', () => {
    const t = useTranslations('en');

    const label = t('nav.home');

    expect(label).toBe('Home');
  });

  it('provides every french key in english', () => {
    const frenchKeys = Object.keys(ui.fr).sort();

    const englishKeys = Object.keys(ui.en).sort();

    expect(englishKeys).toEqual(frenchKeys);
  });
});

describe('building the hreflang alternates of a page', () => {
  it('links every locale and points x-default to french', () => {
    const path = 'portfolio/malt/';

    const alternates = buildAlternateLinks(path, fakeLocaleUrl);

    expect(alternates).toEqual([
      { hreflang: 'fr', href: 'https://example.test/fr/portfolio/malt/' },
      { hreflang: 'en', href: 'https://example.test/en/portfolio/malt/' },
      { hreflang: 'x-default', href: 'https://example.test/fr/portfolio/malt/' },
    ]);
  });

  it('declares one alternate per supported locale plus x-default', () => {
    const alternates = buildAlternateLinks('', fakeLocaleUrl);

    const hreflangs = alternates.map(({ hreflang }) => hreflang);

    expect(hreflangs).toEqual([...locales, 'x-default']);
  });
});

describe('declaring locale identifiers', () => {
  it('uses language-only hreflang codes for every locale', () => {
    const codes = locales.map((locale) => hreflangs[locale]);

    expect(codes).toEqual(['fr', 'en']);
  });

  it('maps every locale to its open graph locale', () => {
    const ogLocales = locales.map((locale) => openGraphLocales[locale]);

    expect(ogLocales).toEqual(['fr_FR', 'en_US']);
  });

  it('uses french as the default language', () => {
    expect(defaultLang).toBe('fr');
  });
});
