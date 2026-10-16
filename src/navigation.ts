import { getRelativeLocaleUrl } from 'astro:i18n';

import type { CallToAction } from '~/types';

import { getContactCallToAction } from './i18n/contact';
import type { Lang } from './i18n/ui';
import { getSectionLinks } from './i18n/sections';
import { getSocialLinks, type SocialLink } from './i18n/social';
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
  actions: CallToAction[];
}

export interface FooterData {
  links: NavigationLinkGroup[];
  secondaryLinks: NavigationLink[];
  socialLinks: SocialLink[];
  footNote: string;
}

const getHomeSectionLinks = (lang: Lang): NavigationLink[] => getSectionLinks(lang, getRelativeLocaleUrl(lang));

export const getHeaderData = (lang: Lang): HeaderData => ({
  links: getHomeSectionLinks(lang),
  actions: [{ ...getContactCallToAction(lang), variant: 'secondary' }],
});

export const getFooterData = (lang: Lang): FooterData => {
  const t = useTranslations(lang);

  return {
    links: [{ title: t('footer.sitemap'), links: getHomeSectionLinks(lang) }],
    secondaryLinks: [],
    socialLinks: getSocialLinks(lang),
    footNote: `© ${new Date().getFullYear()} Aurélien Tondoux`,
  };
};
