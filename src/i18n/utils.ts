import { defaultLang, locales, ui, type Lang, type UiKey } from './ui';

export function isLang(value: string | undefined): value is Lang {
  return locales.some((locale) => locale === value);
}

function splitPathname(pathname: string): [string, string[]] {
  const [, firstSegment = '', ...rest] = pathname.split('/');
  return [firstSegment, rest];
}

export function hasLocalePrefix(pathname: string): boolean {
  const [firstSegment] = splitPathname(pathname);
  return isLang(firstSegment);
}

export function getLangFromUrl(url: URL): Lang {
  const [firstSegment] = splitPathname(url.pathname);
  return isLang(firstSegment) ? firstSegment : defaultLang;
}

export function getPathWithoutLocale(pathname: string): string {
  const [firstSegment, rest] = splitPathname(pathname);
  const segments = isLang(firstSegment) ? rest : [firstSegment, ...rest];
  const nonEmptySegments = segments.filter((segment) => segment !== '');
  return nonEmptySegments.length === 0 ? '' : `${nonEmptySegments.join('/')}/`;
}

export function useTranslations(lang: Lang): (key: UiKey) => string {
  return (key) => ui[lang][key];
}
