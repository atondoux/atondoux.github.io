import { getRelativeLocaleUrl } from 'astro:i18n';

import { languages, locales, type Lang } from './i18n/ui';
import { useTranslations } from './i18n/utils';

export interface NavigationLink {
  text: string;
  href: string;
}

export interface NavigationLinkGroup {
  title?: string;
  links: NavigationLink[];
}

export interface HeaderData {
  links: NavigationLink[];
  actions: never[];
}

export interface FooterData {
  links: NavigationLinkGroup[];
  secondaryLinks: NavigationLink[];
  socialLinks: never[];
  footNote: string;
}

const getLocaleHomeLinks = (lang: Lang): NavigationLink[] =>
  locales
    .filter((locale) => locale !== lang)
    .map((locale) => ({ text: languages[locale], href: getRelativeLocaleUrl(locale) }));

const getNavigationLinks = (lang: Lang): NavigationLink[] => {
  const t = useTranslations(lang);

  return [{ text: t('nav.home'), href: getRelativeLocaleUrl(lang) }, ...getLocaleHomeLinks(lang)];
};

export const getHeaderData = (lang: Lang): HeaderData => ({
  links: getNavigationLinks(lang),
  actions: [],
});

export const getFooterData = (lang: Lang): FooterData => ({
  links: [],
  secondaryLinks: getNavigationLinks(lang),
  socialLinks: [],
  footNote: `© ${new Date().getFullYear()} Aurélien Tondoux`,
});
