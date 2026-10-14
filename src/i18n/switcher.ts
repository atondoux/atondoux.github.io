import type { LocaleUrlBuilder } from './alternates';
import { locales, type Lang } from './ui';
import { getPathWithoutLocale, hasLocalePrefix } from './utils';

export function getOtherLocale(lang: Lang): Lang {
  return locales.find((locale) => locale !== lang) ?? lang;
}

export function getLocaleCode(lang: Lang): string {
  return lang.toUpperCase();
}

export function buildSwitcherHref(pathname: string, target: Lang, toUrl: LocaleUrlBuilder): string {
  return toUrl(target, hasLocalePrefix(pathname) ? getPathWithoutLocale(pathname) : '');
}
