import { defaultLang, hreflangs, locales, type Lang } from './ui';

export interface AlternateLink {
  hreflang: (typeof hreflangs)[Lang] | 'x-default';
  href: string;
}

export type LocaleUrlBuilder = (locale: Lang, path: string) => string;

export function buildAlternateLinks(path: string, toAbsoluteUrl: LocaleUrlBuilder): AlternateLink[] {
  const localeLinks = locales.map((locale) => ({ hreflang: hreflangs[locale], href: toAbsoluteUrl(locale, path) }));
  return [...localeLinks, { hreflang: 'x-default', href: toAbsoluteUrl(defaultLang, path) }];
}
