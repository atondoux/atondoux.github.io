import type { CallToAction, Item } from '~/types';

import type { Lang, UiKey } from './ui';
import { LINKEDIN_HREFS, MALT_HREFS } from './social';
import { useTranslations } from './utils';

const EMAIL_ADDRESS = 'atondoux@gmail.com';
const MAIL_ICON = 'tabler:mail';
const EXTERNAL_TARGET = '_blank';

const MAILTO_HREF = `mailto:${EMAIL_ADDRESS}`;

interface ContactCatalogEntry {
  titleKey: UiKey;
  icon: string;
  display: string | Record<Lang, string>;
  href: string | Record<Lang, string>;
  external?: boolean;
}

const contactCatalog = [
  { titleKey: 'home.contact.email.title', icon: MAIL_ICON, display: EMAIL_ADDRESS, href: MAILTO_HREF },
  {
    titleKey: 'home.contact.linkedin.title',
    icon: 'tabler:brand-linkedin',
    display: 'linkedin.com/in/atondoux',
    href: LINKEDIN_HREFS,
    external: true,
  },
  {
    titleKey: 'home.contact.malt.title',
    icon: 'tabler:topology-star-ring-3',
    display: { fr: 'malt.fr/profile/aurelientondoux', en: 'malt.com/profile/aurelientondoux' },
    href: MALT_HREFS,
    external: true,
  },
] as const satisfies readonly ContactCatalogEntry[];

type ContactEntry = (typeof contactCatalog)[number];

const resolveLocalized = (value: string | Record<Lang, string>, lang: Lang): string =>
  typeof value === 'string' ? value : value[lang];

export function getContactItems(lang: Lang): Item[] {
  const t = useTranslations(lang);

  const toItem = (entry: ContactEntry): Item => ({
    title: t(entry.titleKey),
    description: resolveLocalized(entry.display, lang),
    icon: entry.icon,
    href: resolveLocalized(entry.href, lang),
    ...('external' in entry ? { target: EXTERNAL_TARGET } : {}),
  });

  return contactCatalog.map(toItem);
}

export function getContactCallToAction(lang: Lang): CallToAction {
  const t = useTranslations(lang);

  return { text: t('home.contact.cta'), href: MAILTO_HREF };
}
