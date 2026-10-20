import type { Lang } from './ui';

const EXTERNAL_TARGET = '_blank';

type ExternalTarget = typeof EXTERNAL_TARGET;

export const LINKEDIN_HREFS = {
  fr: 'https://www.linkedin.com/in/atondoux/',
  en: 'https://www.linkedin.com/in/atondoux/?locale=en_US',
} as const satisfies Record<Lang, string>;

export const MALT_HREFS = {
  fr: 'https://www.malt.fr/profile/aurelientondoux',
  en: 'https://www.malt.com/profile/aurelientondoux',
} as const satisfies Record<Lang, string>;

export interface SocialLink {
  ariaLabel: string;
  icon: string;
  href: string;
  target: ExternalTarget;
  tooltip: string;
}

interface SocialCatalogEntry {
  ariaLabel: string;
  icon: string;
  href: string | Record<Lang, string>;
}

const socialCatalog = [
  { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: LINKEDIN_HREFS },
  { ariaLabel: 'Malt', icon: 'tabler:topology-star-ring-3', href: MALT_HREFS },
  { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/atondoux/' },
] as const satisfies readonly SocialCatalogEntry[];

type SocialEntry = (typeof socialCatalog)[number];

const resolveHref = (href: SocialEntry['href'], lang: Lang): string => (typeof href === 'string' ? href : href[lang]);

export function getSocialLinks(lang: Lang): SocialLink[] {
  return socialCatalog.map(({ ariaLabel, icon, href }) => ({
    ariaLabel,
    icon,
    href: resolveHref(href, lang),
    target: EXTERNAL_TARGET,
    tooltip: ariaLabel,
  }));
}
