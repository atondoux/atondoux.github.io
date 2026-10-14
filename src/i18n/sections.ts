import type { NavigationLink } from '~/navigation';

import type { Lang, UiKey } from './ui';
import { useTranslations } from './utils';

const homeSections = [
  { labelKey: 'nav.home' },
  { labelKey: 'nav.about', id: 'about' },
  { labelKey: 'nav.services', id: 'services' },
  { labelKey: 'nav.pricing', id: 'pricing' },
  { labelKey: 'nav.contact', id: 'contact' },
] as const satisfies readonly { labelKey: UiKey; id?: string }[];

type HomeSection = (typeof homeSections)[number];

const sectionHref = (homeUrl: string, section: HomeSection): string =>
  'id' in section ? `${homeUrl}#${section.id}` : homeUrl;

export const getSectionLinks = (lang: Lang, homeUrl: string): NavigationLink[] => {
  const t = useTranslations(lang);

  return homeSections.map((section) => ({
    text: t(section.labelKey),
    href: sectionHref(homeUrl, section),
  }));
};
